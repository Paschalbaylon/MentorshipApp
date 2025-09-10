using Microsoft.AspNetCore.Mvc;
using WebApp.Repositories;
using WebApp.Models;
using Microsoft.AspNetCore.Authorization;

namespace WebApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SessionsController : BaseController<SessionsController>
{
    private readonly SessionRepo _sessionRepo;

    public SessionsController(ILogger<SessionsController> logger, SessionRepo sessionRepo) : base(logger)
    {
        _sessionRepo = sessionRepo;
    }

    //  GET: api/sessions
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<Session>>> GetAllSessions()
    {
        var sessions = await _sessionRepo.GetAllSession();
        return Ok(sessions);
    }

    // PUT: api/sessions/{sessionId}/assign
    [HttpPut("{Id}/assign")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Session>> AssignMentorToMentee(
        int Id,
        [FromQuery] int mentorId,
        [FromQuery] int menteeId)
    {
        var updatedSession = await _sessionRepo.AssignMentorToMenteeAsync(Id, mentorId, menteeId);

        if (updatedSession == null)
            return NotFound($"Session with ID {Id} not found.");

        return Ok(updatedSession);
    }
}
