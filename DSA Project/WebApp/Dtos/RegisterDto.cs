namespace WebApp.Dtos;

public record class RegisterDto(string Email, string FullName, string Bio, string Skill, string Availability, string Password, string Role);