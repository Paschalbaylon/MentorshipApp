using System;

namespace WebApp.Dtos;

public class UpdateRequestStatus
{
    public string Status { get; set; } = string.Empty;

    public UpdateRequestStatus(string status)
    {
        Status = status;
    }
}
