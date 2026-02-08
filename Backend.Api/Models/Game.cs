namespace Backend.Api.Models;

public class Game
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string LongDescription { get; set; } = string.Empty;
    public string[] Platforms { get; set; } = [];
    public string Status { get; set; } = "In Development";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool Starred { get; set; } = false;
    public string Logo { get; set; } = string.Empty;
}