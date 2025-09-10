using System;

namespace WebApp.Dtos;

public class SessionDto
{
    public int Id { get; set; }
    public string MentorId { get; set; } = "";
    public string MenteeId { get; set; } = "";
    public string Status { get; set; } = "";
    public DateTime ScheduledAt { get; set; } = DateTime.UtcNow;
}
