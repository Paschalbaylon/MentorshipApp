using System;

namespace WebApp.Dtos;

public class SentRequestDto
{
    public int RequestId { get; set; }
    public int MentorId { get; set; }
    public string Message { get; set; } = string.Empty;
    public DateTime RequestedAt { get; set; } = DateTime.Now;

    public SentRequestDto(int requestId, int mentorId, string message, DateTime requestedAt)
    {
        RequestId = requestId;
        MentorId = mentorId;
        Message = message;
        RequestedAt = DateTime.UtcNow;
    }
}
