using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.AppDbContext;
using WebApp.Models;

namespace WebApp.Repositories;

public class UserRepo(SiteDbContext dbContext)
{
    private readonly SiteDbContext _siteDbContext = dbContext;
    private readonly DbSet<User> _Users = dbContext.Users;
    public async Task<User> CreateUser(string email, string fullname, string bio, string skill, string availability, string password, string role = "Mentee")
    {
        var user = new User(email, fullname, bio, skill, availability, password, role);
        _siteDbContext.Users.Add(user);
        return user;
    }

    public async Task<User?> GetUserByEmail(string email)
    {
        return await _siteDbContext.Users
            .FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
    }

    public async Task<List<User>> GetAll()
    {
        var users = await _siteDbContext.Users.ToListAsync();
        return users;
    }

    public async Task<User?> Update(int id, User UpdateUser)
    {
        var user = _siteDbContext.Users.FirstOrDefault(u => u.Id == id);
        await _siteDbContext.SaveChangesAsync();

        if (user != null)
        {
            user.Skill = UpdateUser.Skill;
            user.Bio = UpdateUser.Bio;
        }
        return null;
    }

    public async Task<User?> GetByUserId(int userId)
    {
        return await _siteDbContext.Users.FirstOrDefaultAsync(p => p.Id == userId);
    }

    public async Task SaveChangesAsync() =>
    await _siteDbContext.SaveChangesAsync();

}
