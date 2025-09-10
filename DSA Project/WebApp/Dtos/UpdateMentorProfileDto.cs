using System;

namespace WebApp.Dtos;

public class UpdateMentorProfileDto
{
    public string Bio { get; set; } = string.Empty;
    public string Skill { get; set; } = string.Empty;
    public string Availability { get; set; } = string.Empty;
}
