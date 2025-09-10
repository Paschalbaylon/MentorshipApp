using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.AppDbContext;
using WebApp.Models;

namespace WebApp.Repositories;

public class MentorProfileRepo(SiteDbContext dbContext)
{
    private readonly SiteDbContext _siteDbContext = dbContext;
    private readonly DbSet<MentorProfile> _MentorProfiles = dbContext.MentorProfiles;

    public async Task<MentorProfile?> GetUserId(int userId)
    {
        return await _siteDbContext.MentorProfiles.FirstOrDefaultAsync(p => p.UserId == userId);
    }
    public async Task<MentorProfile> Create(MentorProfile mentorProfile)
    {
        _siteDbContext.MentorProfiles.Add(mentorProfile);
        await _siteDbContext.SaveChangesAsync();
        return mentorProfile;
    }

    public async Task<MentorProfile?> Update(int id, MentorProfile UpdateMentorProfile)
    {
        var profile = _siteDbContext.MentorProfiles.FirstOrDefault(c => c.Id == id);
        await _siteDbContext.SaveChangesAsync();

        if (profile != null)
        {
            profile.UserId = UpdateMentorProfile.UserId;
            profile.Bio = UpdateMentorProfile.Bio;
            profile.Skill = UpdateMentorProfile.Skill;
            profile.Availability = UpdateMentorProfile.Availability;
        }
        Console.WriteLine("No Updated Mentor Profile", id);

        return null;
    }

    public async Task<MentorProfile?> GetByUserId(int userId) => await _siteDbContext.MentorProfiles.Include(p => p.Users).FirstOrDefaultAsync(p => p.UserId == userId);

    public async Task<List<MentorProfile>> GetAll() => await _siteDbContext.MentorProfiles.Include(p => p.Users).ToListAsync();

    public async Task SaveChangesAsync() =>
        await _siteDbContext.SaveChangesAsync();
}
