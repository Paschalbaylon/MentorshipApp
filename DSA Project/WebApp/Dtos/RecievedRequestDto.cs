using System;

namespace WebApp.Dtos;

public class RecievedRequestDto
{
    public int RequestId { get; set; }
    public int MenteeId { get; set; }
    public string Message { get; set; } = string.Empty;
    public DateTime RequestedAt { get; set; } = DateTime.Now;


    public RecievedRequestDto(int requestId, int menteeId, string message, DateTime requestedAt)
    {
        RequestId = requestId;
        MenteeId = menteeId;
        Message = message;
        RequestedAt = requestedAt;

    }
}
