using System;

namespace WebApp.Dtos;

public class CreateMentorshipRequestDto
{
    public int MentorId { get; set; }
    public string Message { get; set; }
}
