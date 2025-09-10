using System;
using System.Collections.Generic;

namespace WebApp.Models;

public class MentorshipRequest
{
    public int Id { get; set; }

    // Foreign Keys
    public int MentorId { get; set; }
    public int MenteeId { get; set; }

    // Optional message/status fields
    public string Message { get; set; } = string.Empty;
    public string Status { get; set; } = "pending";
    public DateTime RequestedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public User? Mentor { get; set; }
    public User? Mentee { get; set; }

    public ICollection<MentorProfile> MentorProfiles { get; set; } = new List<MentorProfile>();
    public ICollection<MenteeProfile> MenteeProfiles { get; set; } = new List<MenteeProfile>();
    public ICollection<Session> Sessions { get; set; } = new List<Session>();
}
