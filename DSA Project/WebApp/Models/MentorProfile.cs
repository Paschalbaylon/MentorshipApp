using System;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models;

public class MentorProfile
{
    public MentorProfile() { }
    public int Id { get; set; }
    [Required]
    public int UserId { get; set; }
    public User? Users { get; set; }
    [Required]
    public string Bio { get; set; } = string.Empty;
    public string Role { get; set; }
    [Required]
    public string Skill { get; set; } = string.Empty;
    [Required]
    public string Availability { get; set; } = string.Empty;

    public MentorProfile(int userId, string role, string bio, string skill, string availability)
    {
        UserId = userId;
        Role = role;
        Bio = bio;
        Skill = skill;
        Availability = availability;
    }

    public void UpdateMentor(int userId, string bio, string skill, string availability)
    {
        UserId = userId;
        Bio = bio;
        Skill = skill;
        Availability = availability;
    }

}
