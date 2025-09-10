using System;

namespace WebApp.Dtos;

public class UserDto
{
    public UserDto() { }

    public int Id { get; set; }
    public string Email { get; set; } = null!;
    public string Role { get; set; } = null!;
    public string FullName { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;

    // mentor info
    public string? Bio { get; set; }
    public string? Availability { get; set; }
    public string? Skill { get; set; }

    public UserDto(int id, string email, string role, string fullName, string passwordHash, string? bio, string? availability, string? skill)
    {
        Id = id;
        Email = email;
        FullName = fullName;
        Bio = bio;
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(passwordHash);
        Availability = availability;
        Skill = skill;
        Role = role;
    }
}
