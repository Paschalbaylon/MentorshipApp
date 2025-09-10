using System;
using WebApp.AppDbContext;

namespace WebApp.Repositories;

public class UnitOfWork(SiteDbContext dbContext)
{
    private readonly SiteDbContext _siteDbContext = dbContext;

    public async Task SaveChangesAsync()
    {
        await _siteDbContext.SaveChangesAsync();
    }
}
