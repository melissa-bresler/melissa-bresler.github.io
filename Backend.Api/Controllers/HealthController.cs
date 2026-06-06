using Backend.Api.Data;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("health")]
public class HealthController : ControllerBase
{
    private readonly AppDbContext _db;

    public HealthController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    [HttpHead]
    public IActionResult Health()
    {
        return Ok(new { status = "ok" });
    }

    [HttpGet("db")]
    [HttpHead("db")]
    public async Task<IActionResult> DbHealth()
    {
        try
        {
            await _db.Database.CanConnectAsync();
            return Ok(new { status = "ok", database = "connected" });
        }
        catch
        {
            return StatusCode(503, new { status = "fail", database = "unreachable" });
        }
    }
}