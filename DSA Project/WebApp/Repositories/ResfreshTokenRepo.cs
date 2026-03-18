// Repositories/RefreshTokenRepo.cs
using Microsoft.EntityFrameworkCore;
using WebApp.AppDbContext;
using WebApp.Models;

namespace WebApp.Repositories;

public class RefreshTokenRepo
{
    private readonly SiteDbContext _context;

    public RefreshTokenRepo(SiteDbContext context)
    {
        _context = context;
    }

    public async Task<RefreshToken> CreateAsync(int userId, string token, DateTime expiresAt)
    {
        var refreshToken = new RefreshToken
        {
            Token = token,
            UserId = userId,
            ExpiresAt = expiresAt
        };
        await _context.RefreshTokens.AddAsync(refreshToken);
        return refreshToken;
    }

    public async Task<RefreshToken?> GetByTokenAsync(string token)
    {
        return await _context.RefreshTokens
            .Include(rt => rt.User)
            .FirstOrDefaultAsync(rt => rt.Token == token);
    }

    public async Task RevokeAllForUserAsync(int userId)
    {
        var tokens = await _context.RefreshTokens
            .Where(rt => rt.UserId == userId && !rt.IsRevoked)
            .ToListAsync();

        foreach (var t in tokens)
            t.IsRevoked = true;
    }

    public async Task SaveChangesAsync() => await _context.SaveChangesAsync();
}