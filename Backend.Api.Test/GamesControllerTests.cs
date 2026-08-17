using Backend.Api.Controllers;
using Backend.Api.Data;
using Backend.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Test;

public class GamesControllerTests
{
    private AppDbContext _db = null!;
    private GamesController _controller = null!;

    [SetUp]
    public void Setup()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
           .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
           .Options;

        _db = new AppDbContext(options);
        _controller = new GamesController(_db);
    }

    [TearDown]
    public void TearDown()
    {
        _db.Dispose();
    }

    [Test]
    public async Task TestGetAll_Success()
    {
        // Setup
        var game = new Game
        {
            Id = Guid.NewGuid(),
            Title = "test-title",
            Description = "test-description",
            Slug = "test-slug",
            LongDescription = "test-long-description",
            Platforms = ["foo", "bar"],
            Status = "In Development",
            CreatedAt = new DateTime(),
            Starred = false,
            Logo = "test-logo"
        };

        _db.Games.Add(game);
        await _db.SaveChangesAsync();

        // Execute
        var response = await _controller.GetAll();

        // Assert
        Assert.That(response, Is.Not.Null);
        Assert.That(response.Count(), Is.EqualTo(1));
    }
}