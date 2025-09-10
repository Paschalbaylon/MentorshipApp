using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.AppDbContext;
using WebApp.Dtos;
using WebApp.Models;

namespace WebApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MentorshipSessionsController : BaseController<MentorshipSessionsController>
{
    private SiteDbContext _siteDbContext;

    public MentorshipSessionsController(ILogger<MentorshipSessionsController> logger, SiteDbContext siteDbContext) : base(logger)
    {
        _siteDbContext = siteDbContext;
    }

    [HttpPost]
    [Authorize(Roles = "Mentor")]
    public async Task<IActionResult> ScheduleSessions([FromBody] CreateSessionDto sessionDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null)
            return Unauthorized();

        int userId = int.Parse(userIdClaim);

        var request = await _siteDbContext.MentorshipRequests
            .Include(r => r.Mentor)
            .Include(r => r.Mentee)
            .FirstOrDefaultAsync(r => r.Id == sessionDto.RequestId);

        if (request == null)
            return NotFound("Mentorship request not found");

        // find mentor profile
        var mentorProfile = await _siteDbContext.MentorProfiles
            .FirstOrDefaultAsync(m => m.UserId == userId);

        if (mentorProfile == null || request.MentorId != mentorProfile.Id)
            return Unauthorized("Only the mentor can schedule the session");

        var existingSession = await _siteDbContext.Sessions
            .FirstOrDefaultAsync(s => s.RequestId == sessionDto.RequestId);

        if (existingSession != null)
            return Conflict("A session already exists for this request");

        var session = new Session
        {
            RequestId = request.Id,
            MentorId = request.MentorId,   // MentorProfile.Id
            MenteeId = request.MenteeId,   // MenteeProfile.Id
            Status = sessionDto.Status,
            Notes = sessionDto.Notes,
            ScheduledAt = DateTime.SpecifyKind(sessionDto.ScheduledAt, DateTimeKind.Utc)
        };

        _siteDbContext.Sessions.Add(session);
        await _siteDbContext.SaveChangesAsync();

        return Ok(new { message = "Session scheduled successfully" });
    }


    [HttpGet("mentor")]
    [Authorize(Roles = "mentor,Mentor")]
    public async Task<IActionResult> GetMentorSessions()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null)
            return Unauthorized();

        int userId = int.Parse(userIdClaim);

        // Find the mentor profile by user ID
        var mentor = await _siteDbContext.MentorProfiles
            .FirstOrDefaultAsync(m => m.UserId == userId);

        if (mentor == null)
            return NotFound("Mentor profile not found");

        // Get sessions for the mentor
        var sessions = await _siteDbContext.Sessions
      .Where(s => s.MentorId == mentor.Id)
      .Include(s => s.Request)
          .ThenInclude(r => r.Mentee)
      .Select(s => new
      {
          s.Id,
          s.Notes,
          s.Status,
          s.ScheduledAt,
          MenteeName = s.Request.Mentee.FullName,
          FeedbackText = s.FeedbackText,
          FeedbackRating = s.FeedbackRating
      })
      .ToListAsync();


        return Ok(sessions);
    }

    [HttpGet("mentee")]
    [Authorize(Roles = "mentee,Mentee")]
    public async Task<IActionResult> GetMenteeSessions()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null)
            return Unauthorized();

        int userId = int.Parse(userIdClaim);

        var mentee = await _siteDbContext.MenteeProfiles.FirstOrDefaultAsync(m => m.UserId == userId);

        if (mentee == null)
        {
            return NotFound("No mentee Profile");
        }

        // Get all sessions for this mentee
        var sessions = await _siteDbContext.Sessions
      .Where(s => s.MenteeId == mentee.Id)
      .Include(s => s.Request)
          .ThenInclude(r => r.Mentor)
      .Select(s => new
      {
          s.Id,
          s.Notes,
          s.Status,
          s.ScheduledAt,
          MentorName = s.Request.Mentor.FullName,
          FeedbackText = s.FeedbackText,
          FeedbackRating = s.FeedbackRating
      })
      .ToListAsync();


        return Ok(sessions);
    }

    [HttpPut("{id}/feedback")]
    [Authorize(Policy = "FeedbackRestriction")]
    public async Task<IActionResult> SubmitFeedBack(int id, FeedBackDto feedBackDto)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null) return Unauthorized();

        int userId = int.Parse(userIdClaim);

        // Load the session with foreign keys
        var session = await _siteDbContext.Sessions
            .FirstOrDefaultAsync(s => s.Id == id);

        if (session == null)
            return NotFound("Session not found");

        // Load mentor and mentee profiles for this session
        var mentorProfile = await _siteDbContext.MentorProfiles
            .FirstOrDefaultAsync(m => m.Id == session.MentorId);
        var menteeProfile = await _siteDbContext.MenteeProfiles
            .FirstOrDefaultAsync(m => m.Id == session.MenteeId);

        if (mentorProfile == null || menteeProfile == null)
            return StatusCode(500, "Mentor or mentee profile missing");

        // Check if current user is either the mentor or mentee
        if (mentorProfile.UserId != userId && menteeProfile.UserId != userId)
            return StatusCode(403, "You are not authorized to submit feedback for this session");

        // Assign feedback
        session.FeedbackText = feedBackDto.FeedbackText;
        session.FeedbackRating = feedBackDto.FeedbackRating;
        session.FeedbackSubmittedAt = feedBackDto.FeedbackSubmittedAt;

        await _siteDbContext.SaveChangesAsync();

        return Ok("Feedback submitted successfully");
    }

}

