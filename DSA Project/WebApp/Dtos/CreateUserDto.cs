using System;

namespace WebApp.Dtos;

public class CreateUserDto
{
    public CreateUserDto() { }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;

    public CreateUserDto(string fullName, string email, string passwordHash, string role)
    {
        FullName = fullName;
        Email = email;
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(passwordHash);
        Role = role;
    }
}
