using System;
using Microsoft.EntityFrameworkCore;
using WebApp.AppDbContext;
using WebApp.Dtos;
using WebApp.Models;

namespace WebApp.Repositories;

public class SessionRepo(SiteDbContext dbContext)
{
    private readonly SiteDbContext _siteDbContext = dbContext;
    private readonly DbSet<Session> _Sessions = dbContext.Sessions;

    public async Task<List<Session>> GetAllSession()
    {
        var session = await _siteDbContext.Sessions.ToListAsync();
        return session;
    }

    // ✅ Assign mentor + mentee manually
    public async Task<Session?> AssignMentorToMenteeAsync(int Id, int mentorId, int menteeId)
    {
        var session = await _siteDbContext.Sessions.FindAsync(Id);
        if (session == null) return null;

        session.MentorId = mentorId;
        session.MenteeId = menteeId;

        _siteDbContext.Sessions.Update(session);
        await _siteDbContext.SaveChangesAsync();

        return session;
    }
}
