using System;
using BCrypt.Net;
using WebApp.Dtos;
using WebApp.Models;
using WebApp.Repositories;

namespace WebApp.Services;

public class AuthService
{
    private readonly UserRepo _userRepo;
    private readonly JwtTokenService _jwtTokenService;

    public AuthService(UserRepo userRepo, JwtTokenService jwtTokenService)
    {
        _userRepo = userRepo;
        _jwtTokenService = jwtTokenService;
    }

    public async Task<string> Login(string email, string password)
    {
        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
        {
            throw new ArgumentException("Email and Password must be provided");
        }
        var user = await _userRepo.GetUserByEmail(email.Trim());

        if (user is null)
            throw new UnauthorizedAccessException("User is not found");

        var isCorrectPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);

        if (!isCorrectPassword)
        {
            throw new UnauthorizedAccessException("Incorrect Password");
        }

        return _jwtTokenService.GenerateToken(user.Id.ToString(), user.Email, user.Role);
    }

    public async Task<User> Register(RegisterDto register)
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
        Console.WriteLine($"{register.Password}");
        await _userRepo.SaveChangesAsync();
        Console.WriteLine($"{register.Password}");
        return user;
    }

}

