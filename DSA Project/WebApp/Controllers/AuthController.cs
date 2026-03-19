using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApp.Services;
using WebApp.Dtos;
using WebApp.AppDbContext;
using WebApp.Models;

namespace WebApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly SiteDbContext _dbContext;

    public AuthController(AuthService authService, SiteDbContext dbContext)
    {
        _authService = authService;
        _dbContext = dbContext;
    }

    [HttpPost("Create-User")]  // ✅ match what frontend calls
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        var result = await _authService.Register(dto);
        return CreatedAtAction(nameof(Register), result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var result = await _authService.Login(dto.Email, dto.Password);
        return Ok(result);
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequestDto dto)
    {
        var result = await _authService.RefreshToken(dto.RefreshToken);
        return Ok(result);
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromBody] RefreshTokenRequestDto dto)
    {
        await _authService.Logout(dto.RefreshToken);
        return NoContent();
    }

    // ⚠️ TEMPORARY - DELETE AFTER CREATING ADMIN
    [HttpPost("seed-admin")]
    public async Task<IActionResult> SeedAdmin()
    {

        var existing = _dbContext.Users.FirstOrDefault(u => u.Email == "admin@mentorship.com");
        if (existing != null)
            return BadRequest("Admin already exists");

        var user = new User(
            "admin@mentorship.com",
            "Mentorship Admin",
            "I am the Mentorship Admin",
            "A Web Developer",
            "Everyday",
            "Admin1234",
            "Admin"
        );
        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();
        return Ok("Admin created successfully");
    }
}
