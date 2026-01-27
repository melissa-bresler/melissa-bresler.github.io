namespace Backend.Api.Models;

public class Game
{
    public Guid id { get; set; }

    public string slug { get; set; } = string.Empty;

    public string title { get; set; } = string.Empty;

    public string description { get; set; } = string.Empty;

}