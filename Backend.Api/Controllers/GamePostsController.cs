using Backend.Api.Data;
using Backend.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/blogPosts")]
public class BlogPostsController : ControllerBase
{
    private readonly AppDbContext _db;

    public BlogPostsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet("{id}")]
    public async Task<IEnumerable<BlogPost>> GetAllByGameId(Guid id)
    {
        return await _db.BlogPosts.Where(x => x.GameId == id).ToListAsync();
    }
}