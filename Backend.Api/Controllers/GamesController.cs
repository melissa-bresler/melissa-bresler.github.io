using Backend.Api.Data;
using Backend.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/games")]
public class GamesController : ControllerBase
{
    private readonly AppDbContext _db;

    public GamesController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IEnumerable<Game>> GetAll()
    {
        return await _db.Games.ToListAsync();
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<Game>> GetBySlug(string slug)
    {
        var game = await _db.Games.FirstOrDefaultAsync(x => x.Slug == slug);

        if (game == null)
            return NotFound();

        return game;
    }
}