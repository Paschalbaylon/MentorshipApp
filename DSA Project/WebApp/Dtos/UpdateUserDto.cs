using System;

namespace WebApp.Dtos;

public class UpdateUserDto
{
    public string Skill { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;


    public UpdateUserDto(string skill, string bio)
    {
        Skill = skill;
        Bio = bio;
    }
}
