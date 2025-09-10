using System;

namespace WebApp.Dtos;

public class CreateSessionDto
{

    // public int MenteeId { get; set; }
    // public int MentorId { get; set; }
    public int RequestId { get; set; }
    public string Status { get; set; }
    public string Notes { get; set; }
    public DateTime ScheduledAt { get; set; }

    // public CreateSessionDto(int requestId, int menteeId, int mentorId, string status, string notes, DateTime scheduledTime)
    // {
    //     RequestId = requestId;
    //     MenteeId = menteeId;
    //     MentorId = mentorId;
    //     Status = status;
    //     Notes = notes;
    //     ScheduledAt = DateTime.Now;
    // }
}
