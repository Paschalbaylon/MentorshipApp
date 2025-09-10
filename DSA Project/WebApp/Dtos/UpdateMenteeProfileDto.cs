using System;

namespace WebApp.Dtos;

public class UpdateMenteeProfileDto
{
    public string UserId { get; set; } = string.Empty;
    public string Goals { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
}
