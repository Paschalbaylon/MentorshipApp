using System;

namespace WebApp.Dtos;

public class FeedBackDto
{
    public FeedBackDto() { }
    public string FeedbackText { get; set; }
    public int FeedbackRating { get; set; }

    public DateTime? FeedbackSubmittedAt { get; set; }
    public FeedBackDto(string feedbackText, int feedbackRating, DateTime? feedbackSubmittedAt)
    {
        FeedbackText = feedbackText;
        FeedbackRating = feedbackRating;
        FeedbackSubmittedAt = feedbackSubmittedAt;
    }
}
