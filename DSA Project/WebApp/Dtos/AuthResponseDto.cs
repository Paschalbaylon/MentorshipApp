using System;

namespace WebApp.Dtos;

public class AuthResponseDto
{
    public AuthResponseDto() { }
    public string Token { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;

    public AuthResponseDto(string token, string email, string role)
    {
        Token = token;
        Email = email;
        Role = role;
    }
}
