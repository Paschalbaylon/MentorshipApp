using System;

namespace WebApp.Models;

public class MenteeProfile
{
    public MenteeProfile() { }
    public int Id { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public string Goals { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;

    public MenteeProfile(int userId, string goals, string bio)
    {
        UserId = userId;
        Goals = goals;
        Bio = bio;
    }

    public void UpdateMenteeProfile(int userId, string goals, string bio)
    {
        UserId = userId;
        Goals = goals;
        Bio = bio;
    }
}
