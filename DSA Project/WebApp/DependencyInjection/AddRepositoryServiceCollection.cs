using System;
using WebApp.Models;
using WebApp.Repositories;

namespace WebApp.DependencyInjection;

public static class AddRepositoryServiceCollection
{
    public static IServiceCollection AddRepositoryServiceCollections(this IServiceCollection services)
    {
        services.AddScoped<MenteeProfileRepo>();
        services.AddScoped<MentorProfileRepo>();
        services.AddScoped<UnitOfWork>();
        services.AddScoped<UserRepo>();
        services.AddScoped<SessionRepo>();
        services.AddScoped<RefreshTokenRepo>();

        return services;
    }

}
