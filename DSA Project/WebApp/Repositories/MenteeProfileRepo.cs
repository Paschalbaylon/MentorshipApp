using System;
using Microsoft.EntityFrameworkCore;
using WebApp.AppDbContext;
using WebApp.Models;

namespace WebApp.Repositories;

public class MenteeProfileRepo(SiteDbContext dbContext)
{
    private readonly SiteDbContext _siteDbContext = dbContext;
    private readonly DbSet<MenteeProfile> MenteeProfiles = dbContext.MenteeProfiles;

    public async Task<MenteeProfile?> GetUserId(int userId)
    {
        return await _siteDbContext.MenteeProfiles.FirstOrDefaultAsync(p => p.UserId == userId);
    }

    public async Task<MenteeProfile> Create(int userId, string goals, string bio)
    {
        var profile = new MenteeProfile(userId, goals, bio);
        _siteDbContext.Add(profile);
        await _siteDbContext.SaveChangesAsync();
        return profile;
    }

    public async Task<MenteeProfile?> Update(int id, MenteeProfile UpdateMenteeProfile)
    {
        var profile = _siteDbContext.MenteeProfiles.FirstOrDefault(p => p.Id == id);
        await _siteDbContext.SaveChangesAsync();

        if (profile != null)
        {
            profile.Goals = UpdateMenteeProfile.Goals;
            profile.Bio = UpdateMenteeProfile.Bio;
        }
        Console.WriteLine("No Updated Mentee Profile", id);

        return null;
    }
}
