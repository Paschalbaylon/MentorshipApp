using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApp.AppDbContext;
using Microsoft.EntityFrameworkCore;
using WebApp.Dtos;
using WebApp.Models;

namespace WebApp.Controllers;

[ApiController]
// [Route("admin")]
[Route("api/admin")]
[Authorize(Roles = "Admin")]
public class AdminController : BaseController<AdminController>
{
    private readonly SiteDbContext _siteDbContext;
    public AdminController(ILogger<AdminController> logger, SiteDbContext siteDbContext) : base(logger)
    {
        _siteDbContext = siteDbContext;

    }

    [HttpGet("User")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllUser()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
            return Unauthorized();

        int MenteeId = int.Parse(userIdClaim);

        var user = await _siteDbContext.Users
        .Select(u => new UserDto
        {
            Id = u.Id,
            Email = u.Email,
            Role = u.Role,
            FullName = u.FullName,
            Bio = u.MentorProfile.Bio,
            Availability = u.MentorProfile.Availability
        })
        .ToListAsync();

        return Ok(user);
    }

    [HttpPut("User/{id}/role")]
    [Authorize(Roles = "Admin")] // Optional: only Admins can change roles
    public async Task<IActionResult> UpdateUserRole(int id, UpdateRoleDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Role))
            return BadRequest("Role cannot be empty.");

        var user = await _siteDbContext.Users.FindAsync(id);
        if (user == null)
            return NotFound("User not found");

        // validate allowed roles
        var allowedRoles = new[] { "Admin", "Mentor", "Mentee" };
        if (!allowedRoles.Contains(dto.Role, StringComparer.OrdinalIgnoreCase))
            return BadRequest("Invalid role. Allowed roles: Admin, Mentor, Mentee");

        user.Role = dto.Role;
        await _siteDbContext.SaveChangesAsync();

        return Ok(new
        {
            Message = "User role updated successfully",
            UserId = user.Id,
            NewRole = user.Role
        });
    }

}
