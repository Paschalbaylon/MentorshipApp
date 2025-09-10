using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebApp.Dtos;
using WebApp.Models;

namespace WebApp.Services;

public class JwtTokenService
{


    private readonly string _secretKey;
    private readonly string _issuer;
    private readonly string _audience;
    private readonly int _expirationMinutes;

    public JwtTokenService(IOptions<JwtSettings> jwtSettings)
    {
        _secretKey = jwtSettings.Value.SecretKey;
        _issuer = jwtSettings.Value.Issuer;
        _audience = jwtSettings.Value.Audience;
        _expirationMinutes = jwtSettings.Value.ExpirationMinutes;
    }

    public string GenerateToken(string userId, string email, string role)
    {
        role = char.ToUpper(role[0]) + role.Substring(1).ToLower();
        var claims = new[]
        {
            new Claim (ClaimTypes.NameIdentifier, userId.ToString()),
            new Claim (ClaimTypes.Email, email),
            new Claim (ClaimTypes.Role, role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            expires: DateTime.Now.AddMinutes(_expirationMinutes),
            signingCredentials: creds
        );

        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);
    }

}
