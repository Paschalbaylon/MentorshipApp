using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApp.Dtos;
using WebApp.Repositories;

namespace WebApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : BaseController<UserController>
{
    private readonly UserRepo _userRepo;
    private readonly MentorProfileRepo _mentorProfileRepo;
    public UserController(ILogger<UserController> logger, UserRepo userRepo, MentorProfileRepo mentorProfileRepo) : base(logger)
    {
        _userRepo = userRepo;
        _mentorProfileRepo = mentorProfileRepo;
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetMyProfile()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            return Unauthorized("Missing user ID in token.");

        var userId = int.Parse(userIdClaim.Value);

        var user = await _userRepo.GetByUserId(userId);
        if (user == null)
            return NotFound("User not found.");

        // Default values for optional fields
        // string? Bio = null;
        // string? Skill = null;
        // string? availability = null;

        // Start building the profile DTO
        var profileDto = new UserDto
        {
            Id = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            Role = user.Role,
            Bio = user.Bio,
            Skill = user.Skill,
            Availability = user.Availability
        };

        // If user is a mentor, add profile info
        // if (user.Role == "Mentor")
        // {
        //     var mentorProfile = await _mentorProfileRepo.GetByUserId(user.Id);
        //     if (mentorProfile != null)
        //     {
        //         profileDto.Bio = mentorProfile.Bio;
        //         profileDto.Availability = mentorProfile.Availability;
        //     }
        // }

        return Ok(profileDto);
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _userRepo.GetByUserId(id);
        if (user == null)
            return NotFound("User not found.");

        var dto = new CurrentUserDto(
            user.Id,
            user.FullName,
            user.Email,
            user.Role,
            user.Bio,
            user.Skill,
            user.Availability
        );

        return Ok(dto);
    }


    [Authorize]
    [HttpPut("me/profile")]
    public async Task<IActionResult> UpdateMyProfile(UpdateUserDto dto)
    {
        // Get user ID from JWT claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            return Unauthorized("User ID claim not found in token.");

        var userId = int.Parse(userIdClaim.Value);

        // Fetch the user from DB
        var user = await _userRepo.GetByUserId(userId);
        if (user == null)
            return NotFound("User not found.");

        // Update user fields
        user.Bio = dto.Bio;
        user.Skill = dto.Skill;


        await _userRepo.Update(user.Id, user);

        return Ok("Profile updated successfully.");
    }


}
