namespace Backend.Api.Models;

public class BlogPost
{
    public Guid Id { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public string BlogText { get; set; } = string.Empty;
    public string ImageAlt { get; set; } = string.Empty;
    public string[] KeyChanges { get; set; } = Array.Empty<string>();
    public Guid GameId { get; set; }
    public string Image { get; set; } = string.Empty;
}