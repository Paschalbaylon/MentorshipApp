using System.Security.Claims;

namespace WebApp.Middleware;

public class RoleRestrictionMiddleware
{
    private readonly RequestDelegate _next;

    public RoleRestrictionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var path = context.Request.Path.Value?.ToLower();

        if (context.User.Identity?.IsAuthenticated == true)
        {
            var role = context.User.FindFirst(ClaimTypes.Role)?.Value;

            // Example: mentees cannot access mentor feedback endpoints
            if (path!.Contains("/feedback") && role == "Mentee")
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                await context.Response.WriteAsync("Mentees are not allowed to submit mentor feedback.");
                return;
            }

            // Example: only mentors can access /availability endpoints
            if (path!.Contains("/availability") && role != "Mentor")
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                await context.Response.WriteAsync("Only mentors can update availability.");
                return;
            }
        }

        await _next(context);
    }
}
