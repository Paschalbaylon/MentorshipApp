// WebApp/Dtos/MentorshipRequestDto.cs
namespace WebApp.Dtos;

public record class MentorshipRequestDto
{
    public MentorshipRequestDto() { } // Add this parameterless constructor

    public MentorshipRequestDto(int mentorId, int menteeId, string message)
    {
        MentorId = mentorId;
        MenteeId = menteeId;
        Message = message;
    }

    public int MentorId { get; set; }
    public int MenteeId { get; set; }
    public string Message { get; set; }
}