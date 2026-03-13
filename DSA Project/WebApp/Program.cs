using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using WebApp.AppDbContext;
using WebApp.DependencyInjection;
using WebApp.Dtos;
using WebApp.Services;
using WebApp.Util;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://0.0.0.0:8080");
// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();
builder.Services.AddApplicationServices();
builder.Services.AddRepositoryServiceCollections();
builder.Services.AddControllers();

// ✅ BIND JwtSettings — THIS IS THE IMPORTANT LINE
builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("JwtSettings")
);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var key = Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecretKey"] ?? throw new InvalidDataException());
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
            ValidAudience = builder.Configuration["JwtSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "https://mentorship-frontend-zkvn.onrender.com") // React dev server // React dev server
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


builder.Services.AddHttpContextAccessor();


builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("MentorOnly", policy =>
        policy.RequireRole("Mentor"));

    options.AddPolicy("MenteeOnly", policy =>
        policy.RequireRole("Mentee"));

    options.AddPolicy("FeedbackRestriction", policy =>
        policy.RequireAssertion(context =>
        {
            var role = context.User.FindFirst(ClaimTypes.Role)?.Value;
            // deny if mentee is trying to access feedback
            return role != "Mentee";
        }));
});


builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "My API",
        Version = "v1"
    });
    // Define the Bearer token authentication scheme
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter the JWT token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });

    // Add security requirement to use Bearer token
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
    // Set up global response content types (JSON and XML)
    // options.AddResponseType( "application/json");

    // Optionally, add XML support globally (this makes your API support application/xml as well)
    // options.AddResponseType("application/xml");

    // Add content-type and accept headers in Swagger UI
    options.OperationFilter<AddAcceptContentTypeHeader>();
});

builder.Services.AddDbContext<SiteDbContext>(options =>
  options.UseSqlite("Data Source=WebApp.db"));

var app = builder.Build();

// Use middleware BEFORE controllers
app.UseMiddleware<WebApp.Middleware.RoleRestrictionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Auto-run migrations on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<SiteDbContext>();
    db.Database.Migrate();
}

app.Run();