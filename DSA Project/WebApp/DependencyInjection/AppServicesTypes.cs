using System;
using WebApp.Services;
using WebApp.Util;

namespace WebApp.DependencyInjection;

public static class AddServicesTypes
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddHttpContextAccessor();
        services.AddScoped<AuthService>();
        services.AddSingleton<JwtTokenService>();
        services.AddScoped<JwtSession>();


        return services;
    }
}
