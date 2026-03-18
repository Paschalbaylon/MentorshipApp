// using System;
// using BCrypt.Net;
// using WebApp.Dtos;
// using WebApp.Models;
// using WebApp.Repositories;

// namespace WebApp.Services;

// public class AuthService
// {
//     private readonly UserRepo _userRepo;
//     private readonly JwtTokenService _jwtTokenService;

//     public AuthService(UserRepo userRepo, JwtTokenService jwtTokenService)
//     {
//         _userRepo = userRepo;
//         _jwtTokenService = jwtTokenService;
//     }

//     public async Task<string> Login(string email, string password)
//     {
//         if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
//         {
//             throw new ArgumentException("Email and Password must be provided");
//         }
//         var user = await _userRepo.GetUserByEmail(email.Trim());

//         if (user is null)
//             throw new UnauthorizedAccessException("User is not found");

//         var isCorrectPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);

//         if (!isCorrectPassword)
//         {
//             throw new UnauthorizedAccessException("Incorrect Password");
//         }

//         return _jwtTokenService.GenerateToken(user.Id.ToString(), user.Email, user.Role);
//     }

//     public async Task<User> Register(RegisterDto register)
//     {

//         var user = await _userRepo.CreateUser(
//         register.Email,
//         register.FullName,
//         register.Bio,
//         register.Skill,
//         register.Availability,
//         register.Password,
//         register.Role
//         );
//         Console.WriteLine($"{register.Password}");
//         await _userRepo.SaveChangesAsync();
//         Console.WriteLine($"{register.Password}");
//         return user;
//     }

// }

using System;
using BCrypt.Net;
using WebApp.Dtos;
using WebApp.Models;
using WebApp.Repositories;

namespace WebApp.Services;

public class AuthService
{
    private readonly UserRepo _userRepo;
    private readonly RefreshTokenRepo _refreshTokenRepo;
    private readonly JwtTokenService _jwtTokenService;

    public AuthService(UserRepo userRepo, RefreshTokenRepo refreshTokenRepo, JwtTokenService jwtTokenService)
    {
        _userRepo = userRepo;
        _refreshTokenRepo = refreshTokenRepo;
        _jwtTokenService = jwtTokenService;
    }

    public async Task<AuthResponseDto> Login(string email, string password)
    {
        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
            throw new ArgumentException("Email and Password must be provided");

        var user = await _userRepo.GetUserByEmail(email.Trim())
            ?? throw new UnauthorizedAccessException("User is not found");

        if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            throw new UnauthorizedAccessException("Incorrect Password");

        return await GenerateAuthResponse(user);
    }

    public async Task<AuthResponseDto> Register(RegisterDto register)
    {
        var user = await _userRepo.CreateUser(
            register.Email,
            register.FullName,
            register.Bio,
            register.Skill,
            register.Availability,
            register.Password,
            register.Role
        );
        await _userRepo.SaveChangesAsync();

        return await GenerateAuthResponse(user);
    }

    public async Task<AuthResponseDto> RefreshToken(string token)
    {
        var existing = await _refreshTokenRepo.GetByTokenAsync(token)
            ?? throw new UnauthorizedAccessException("Invalid refresh token");

        if (existing.IsRevoked)
        {
            // Token reuse attack — revoke entire family for this user
            await _refreshTokenRepo.RevokeAllForUserAsync(existing.UserId);
            await _refreshTokenRepo.SaveChangesAsync();
            throw new UnauthorizedAccessException("Token reuse detected. Please log in again");
        }

        if (existing.ExpiresAt < DateTime.UtcNow)
            throw new UnauthorizedAccessException("Refresh token has expired");

        // Rotate: revoke old, issue new
        existing.IsRevoked = true;
        var user = existing.User;

        var (newRawToken, expiresAt) = _jwtTokenService.GenerateRefreshToken();
        existing.ReplacedByToken = newRawToken;

        await _refreshTokenRepo.CreateAsync(user.Id, newRawToken, expiresAt);
        await _refreshTokenRepo.SaveChangesAsync();

        return new AuthResponseDto(
            _jwtTokenService.GenerateToken(user.Id.ToString(), user.Email, user.Role),
            user.Email,
            user.Role,
            newRawToken,
            _jwtTokenService.GetAccessTokenExpiry(),
            expiresAt
        );
    }

    public async Task Logout(string token)
    {
        var existing = await _refreshTokenRepo.GetByTokenAsync(token);
        if (existing is null || existing.IsRevoked) return;

        existing.IsRevoked = true;
        await _refreshTokenRepo.SaveChangesAsync();
    }

    // ── private helper ───────────────────────────────────────────────────────

    private async Task<AuthResponseDto> GenerateAuthResponse(User user)
    {
        var accessToken = _jwtTokenService.GenerateToken(
            user.Id.ToString(), user.Email, user.Role);

        var (rawRefreshToken, refreshExpiresAt) = _jwtTokenService.GenerateRefreshToken();

        await _refreshTokenRepo.CreateAsync(user.Id, rawRefreshToken, refreshExpiresAt);
        await _refreshTokenRepo.SaveChangesAsync();

        return new AuthResponseDto(
            accessToken,
            user.Email,
            user.Role,
            rawRefreshToken,
            _jwtTokenService.GetAccessTokenExpiry(),
            refreshExpiresAt
        );
    }
}