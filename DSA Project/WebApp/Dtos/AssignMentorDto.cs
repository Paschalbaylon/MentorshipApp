using System;

namespace WebApp.Dtos;

public class AssignMentorDto
{
    public int MentorId { get; set; }
    public int MenteeId { get; set; }
    public DateTime ScheduledAt { get; set; }
}
