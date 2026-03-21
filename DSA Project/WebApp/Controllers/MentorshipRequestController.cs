using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.AppDbContext;
using WebApp.Dtos;
using WebApp.Models;

namespace WebApp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MentorshipRequestController : ControllerBase
{
    private readonly SiteDbContext _siteDbContext;

    public MentorshipRequestController(SiteDbContext siteDbContext)
    {
        _siteDbContext = siteDbContext;
    }

    // DTO for updating request status
    public class UpdateRequestStatusDto
    {
        public string Status { get; set; }
    }

    // DTO for sent requests
    public class SentRequestDto
    {
        public int Id { get; set; }
        public int MentorId { get; set; }
        public string Message { get; set; }
        public DateTime RequestedAt { get; set; }
        public string Status { get; set; }
        public string MentorName { get; set; }
    }

    // DTO for received requests
    public class ReceivedRequestDto
    {
        public int Id { get; set; }
        public int MenteeId { get; set; }
        public string Message { get; set; }
        public DateTime RequestedAt { get; set; }
        public string Status { get; set; }
        public string MenteeName { get; set; }
    }

    //create a mentor profile
    [HttpPost("Create")]
    [Authorize(Roles = "Mentor")]
    public async Task<IActionResult> CreateMentorProfile([FromBody] CreateMentorProfileDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
            return Unauthorized("User not found");

        var existingProfile = await _siteDbContext.MentorProfiles
            .FirstOrDefaultAsync(m => m.UserId == int.Parse(userId));
        if (existingProfile != null)
            return BadRequest("You already have a mentor profile");

        var profile = new MentorProfile
        {
            UserId = int.Parse(userId),
            Bio = dto.Bio,
            Role = dto.Role,
            Skill = dto.Skill,
            Availability = dto.Availability
        };

        _siteDbContext.MentorProfiles.Add(profile);
        await _siteDbContext.SaveChangesAsync();

        return Ok(new { message = "Mentor profile created successfully", profile });
    }

    [HttpPut("Update")]
    [Authorize(Roles = "Mentor")]
    public async Task<IActionResult> UpdateMentorProfile([FromBody] UpdateMentorProfileDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
            return Unauthorized("User not found");

        var profile = await _siteDbContext.MentorProfiles
            .FirstOrDefaultAsync(m => m.UserId == int.Parse(userId));

        if (profile == null)
            return NotFound("Mentor profile not found");

        profile.UpdateMentor(int.Parse(userId), dto.Bio, dto.Skill, dto.Availability);

        _siteDbContext.MentorProfiles.Update(profile);
        await _siteDbContext.SaveChangesAsync();

        return Ok(new { message = "Mentor profile updated successfully", profile });
    }

    [HttpPost("create-mentee")]
    [Authorize(Roles = "mentee,Mentee")]
    public async Task<IActionResult> CreateProfile([FromBody] CreateMenteeProfileDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
            return Unauthorized("User not found");

        var profile = new MenteeProfile
        {
            UserId = int.Parse(userId),
            Goals = dto.Goals,
            Bio = dto.Bio
        };

        _siteDbContext.MenteeProfiles.Add(profile);
        await _siteDbContext.SaveChangesAsync();

        return Ok(new { message = "Mentee profile created successfully", profile });
    }

    [HttpPut("Update-mentee")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateMenteeProfileDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
            return Unauthorized("User not found");

        var profile = await _siteDbContext.MenteeProfiles
            .FirstOrDefaultAsync(m => m.UserId == int.Parse(userId));

        if (profile == null)
            return NotFound("Mentor profile not found");

        profile.UpdateMenteeProfile(int.Parse(userId), dto.Bio, dto.Goals);

        _siteDbContext.MenteeProfiles.Update(profile);
        await _siteDbContext.SaveChangesAsync();

        return Ok(new { message = "Mentee profile updated successfully", profile });
    }



    // ✅ Create a new mentorship request (Mentee only)
    [HttpPost("SendRequest")]
    [Authorize(Roles = "mentee,Mentee")]
    public async Task<IActionResult> SendRequest([FromBody] CreateMentorshipRequestDto requestDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
            return Unauthorized("User not found");

        int menteeUserId = int.Parse(userId);

        // Check if mentor exists
        var mentor = await _siteDbContext.MentorProfiles.FindAsync(requestDto.MentorId);
        if (mentor == null)
            return NotFound("Mentor not found");


        // ✅ Optional: Check if mentee profile exists
        var menteeProfile = await _siteDbContext.MenteeProfiles
            .FirstOrDefaultAsync(m => m.UserId == menteeUserId);
        if (menteeProfile == null)
            return BadRequest(new List<object>());

        // Create the request
        var request = new MentorshipRequest
        {
            MenteeId = menteeProfile.Id,
            MentorId = mentor.Id,
            Message = requestDto.Message,
            Status = "Pending",
            RequestedAt = DateTime.UtcNow
        };

        _siteDbContext.MentorshipRequests.Add(request);
        await _siteDbContext.SaveChangesAsync();

        return Ok(new
        {
            message = "Request sent successfully",
            requestId = request.Id
        });
    }

    // ✅ Get all requests sent by this mentee
    [Authorize(Roles = "mentee,Mentee")]
    [HttpGet("Sent")]
    public async Task<IActionResult> GetAllSentRequests()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();

        int userId = int.Parse(userIdClaim);

        // ✅ Find the mentee profile for this user
        var menteeProfile = await _siteDbContext.MenteeProfiles
            .FirstOrDefaultAsync(m => m.UserId == userId);

        if (menteeProfile == null) return NotFound("Mentee profile not found");

        // ✅ Use profile ID in the query
        var requests = await _siteDbContext.MentorshipRequests
            .Where(r => r.MenteeId == menteeProfile.Id)
            .Select(r => new
            {
                Id = r.Id,
                Message = r.Message,
                RequestedAt = r.RequestedAt,
                Status = r.Status
            })
            .ToListAsync();

        return Ok(requests);
    }


    // ✅ Get all requests received by this mentor
    [Authorize(Roles = "Mentor")]
    [HttpGet("Received")]
    public async Task<IActionResult> GetAllReceivedRequests()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();

        int userId = int.Parse(userIdClaim);

        // ✅ Find mentor profile by userId
        var mentorProfile = await _siteDbContext.MentorProfiles
            .FirstOrDefaultAsync(m => m.UserId == userId);

        if (mentorProfile == null)
            return NotFound(new List<object>());

        // ✅ Use mentorProfile.Id for filtering requests
        var requests = await _siteDbContext.MentorshipRequests
            .Where(r => r.MentorId == mentorProfile.Id)
            .Include(r => r.MenteeProfiles) // ✅ For mentee details
                                            // .ThenInclude(m => m.Users)
            .Select(r => new
            {
                Id = r.Id,
                Message = r.Message,
                RequestedAt = r.RequestedAt,
                Status = r.Status,
                // MenteeName = r.MenteeProfiles.Users.FullName // ✅ Add mentee name
            })
            .ToListAsync();

        return Ok(requests);
    }

    // ✅ Update request status (Mentor only)
    [Authorize(Roles = "mentor,Mentor")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRequestStatus(int id, [FromBody] UpdateRequestStatusDto updateDto)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();

        int userId = int.Parse(userIdClaim);

        // Get mentor profile linked to this user
        var mentor = await _siteDbContext.MentorProfiles.FirstOrDefaultAsync(m => m.UserId == userId);
        if (mentor == null)
            return NotFound("Mentor Profile not found");

        // Find the request and make sure it belongs to this mentor
        var request = await _siteDbContext.MentorshipRequests
            .FirstOrDefaultAsync(r => r.Id == id && r.MentorId == mentor.Id);

        if (request == null)
            return NotFound("Mentorship request not found or unauthorized");

        // Validate allowed statuses
        var validStatuses = new[] { "Pending", "Accepted", "Rejected" };
        if (!validStatuses.Contains(updateDto.Status, StringComparer.OrdinalIgnoreCase))
            return BadRequest("Invalid status. Allowed values: Pending, Accepted, Rejected");

        request.Status = updateDto.Status;
        await _siteDbContext.SaveChangesAsync();

        return Ok(new { message = "Request status updated successfully" });
    }

    // ✅ Get available mentors (for debugging)
    [Authorize(Roles = "Mentee,mentee")]
    [HttpGet("AvailableMentors")]
    public async Task<IActionResult> GetAvailableMentors()
    {
        var mentors = await _siteDbContext.MentorProfiles
            .Include(m => m.Users)
            .Where(m => m.Users.Role == "Mentor")
            .Select(m => new
            {
                Id = m.Id,
                Name = m.Users.FullName,
                Email = m.Users.Email,
                UserId = m.UserId,
                Role = m.Users.Role
            })
            .ToListAsync();

        return Ok(mentors);
    }
}