// using System;

// namespace WebApp.Dtos;

// public class AuthResponseDto
// {
//     public AuthResponseDto() { }
//     public string Token { get; set; } = string.Empty;
//     public string Email { get; set; } = string.Empty;
//     public string Role { get; set; } = string.Empty;

//     public AuthResponseDto(string token, string email, string role)
//     {
//         Token = token;
//         Email = email;
//         Role = role;
//     }
// }

// Dtos/AuthResponseDto.cs
using System;

namespace WebApp.Dtos;

public class AuthResponseDto
{
    public AuthResponseDto() { }

    public string Token { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public DateTime AccessTokenExpiresAt { get; set; }
    public DateTime RefreshTokenExpiresAt { get; set; }

    public AuthResponseDto(
        string token,
        string email,
        string role,
        string refreshToken,
        DateTime accessTokenExpiresAt,
        DateTime refreshTokenExpiresAt)
    {
        Token = token;
        Email = email;
        Role = role;
        RefreshToken = refreshToken;
        AccessTokenExpiresAt = accessTokenExpiresAt;
        RefreshTokenExpiresAt = refreshTokenExpiresAt;
    }
}