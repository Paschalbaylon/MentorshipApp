// using System;
// using System.Security.Claims;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using WebApp.Dtos;
// using WebApp.Models;
// using WebApp.Repositories;
// using WebApp.Services;

// namespace WebApp.Controllers;

// [ApiController]
// [Route("api/[controller]")]
// public class AuthController : BaseController<AuthController>
// {
//     private readonly AuthService _authService;
//     private readonly UserRepo _userRepo;

//     public AuthController(ILogger<AuthController> logger, AuthService authService, UserRepo userRepo) : base(logger)
//     {
//         _authService = authService;
//         _userRepo = userRepo;
//     }

//     [HttpPost("Login")]
//     [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AuthResponseDto))]
//     [ProducesResponseType(StatusCodes.Status401Unauthorized)]

//     public async Task<IActionResult> Login(LoginDto loginDto)
//     {
//         try
//         {
//             var token = await _authService.Login(loginDto.Email, loginDto.Password);
//             var user = await _userRepo.GetUserByEmail(loginDto.Email);

//             var response = new AuthResponseDto
//             {
//                 Token = token,
//                 Email = user.Email,
//                 Role = user.Role,
//             };
//             return Ok(response);
//         }
//         catch (UnauthorizedAccessException ex)
//         {

//             return Unauthorized(new { message = ex.Message });
//         }
//     }

//     // [Authorize(Roles = "Admin")]
//     [HttpPost("Create-User")]
//     public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
//     {
//         if (await _userRepo.GetUserByEmail(registerDto.Email) != null)
//             return BadRequest("Already Existing User");

//         await _authService.Register(registerDto); // ✅ let service handle it

//         return Ok("User has been created successfully");
//     }


//     [HttpPost("logout")]
//     public async Task<IActionResult> Logout()
//     {
//         var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
//         var role = User.FindFirst(ClaimTypes.Role)?.Value;

//         // Optional: async logging or auditing
//         await Task.CompletedTask;

//         return Ok(new
//         {
//             message = "Logout successful. Please clear your token on the client side.",
//             user = userEmail,
//             role = role
//         });
//     }

//     [Authorize]
//     [HttpGet("me")]
//     public async Task<IActionResult> GetCurrentUser()
//     {
//         var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
//         if (userIdClaim == null)
//             return Unauthorized("User ID claim not found in token.");

//         var userId = int.Parse(userIdClaim.Value);
//         var user = await _userRepo.GetByUserId(userId);

//         if (user == null)
//             return NotFound("User not found.");

//         var dto = new CurrentUserDto
//         (
//             user.Id,
//             user.FullName,
//             user.Email,
//             user.Role,
//             user.Bio,
//             user.Skill,
//             user.Availability
//         );

//         return Ok(dto);
//     }
// }

// Controllers/AuthController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApp.Services;
using WebApp.Dtos;

namespace WebApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
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
}