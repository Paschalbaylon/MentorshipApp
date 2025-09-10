using System;

namespace WebApp.Dtos;

public class CreateMenteeProfileDto
{
    public CreateMenteeProfileDto() { }
    // public int Id { get; set; }
    // public int UserId { get; set; }
    public string Goals { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public CreateMenteeProfileDto(string goals, string bio)
    {
        // UserId = userId;
        Goals = goals;
        Bio = bio;
    }
}
