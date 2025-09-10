// using System;

// namespace WebApp.Models;

// public class Session
// {
//     public Session() { }
//     public int Id { get; set; }
//     public int MentorId { get; set; }
//     public int MenteeId { get; set; }
//     public int RequestId { get; set; }
//     public DateTime ScheduledAt { get; set; }
//     public string Status { get; set; } = string.Empty;
//     public string Notes { get; set; } = string.Empty;
//     public List<string> Mentees { get; set; } = new();

//     //Feedback Session
//     public string FeedbackText { get; set; }
//     public int FeedbackRating { get; set; }
//     public DateTime? FeedbackSubmittedAt { get; set; }

//     public Session(int requestId, int mentorId, int menteeId, string status, string notes, DateTime sceduledAt, string feedbackText, int feedbackRating, DateTime? feedbackSubmittedAt)
//     {
//         RequestId = requestId;
//         MentorId = mentorId;
//         MenteeId = menteeId;
//         Status = status;
//         Notes = notes;
//         ScheduledAt = DateTime.Now;
//         FeedbackText = feedbackText;
//         FeedbackRating = feedbackRating;
//         FeedbackSubmittedAt = feedbackSubmittedAt;
//     }

//     public MentorshipRequest Request { get; set; }
//     public ICollection<MentorProfile> MentorProfiles { get; set; }
//     public ICollection<MenteeProfile> MenteeProfiles { get; set; }
//     public User Users { get; set; }
// }

using System;
using System.Collections.Generic;

namespace WebApp.Models;

public class Session
{
    public int Id { get; set; }
    public int MentorId { get; set; }
    public int MenteeId { get; set; }
    public int RequestId { get; set; }

    public int FeedbackRating { get; set; }
    public string FeedbackText { get; set; } = string.Empty;
    public DateTime? FeedbackSubmittedAt { get; set; }
    public string Status { get; set; } = "pending";
    public string Notes { get; set; } = string.Empty;
    public DateTime ScheduledAt { get; set; } = DateTime.UtcNow;

    public MentorshipRequest? Request { get; set; }
    public ICollection<MentorProfile> MentorProfiles { get; set; } = new List<MentorProfile>();
    public ICollection<MenteeProfile> MenteeProfiles { get; set; } = new List<MenteeProfile>();
    public User? Users { get; set; }
}
