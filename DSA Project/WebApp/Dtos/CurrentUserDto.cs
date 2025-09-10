namespace WebApp.Dtos;

public record class CurrentUserDto(int Id, string Fullname, string Email, string Role, string Bio, string Skill, string Availability);