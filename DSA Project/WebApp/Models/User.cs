using System;

namespace WebApp.Models;

public class User
{
    public User() { }

    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public int UserId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string Skill { get; set; } = string.Empty;
    public string Availability { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;

    public User(string email, string fullname, string bio, string skill, string availability, string password, string role = "Mentee")
    {
        Email = email;
        FullName = fullname;
        Bio = bio;
        Skill = skill;
        Availability = availability;
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
        Role = role;
    }

    public void UpdateUser(string bio, string skill)
    {
        Bio = bio;
        Skill = skill;
    }

    public MentorProfile? MentorProfile { get; set; }
    public MenteeProfile? MenteeProfile { get; set; }
    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}
