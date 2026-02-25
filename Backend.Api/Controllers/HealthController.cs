using Backend.Api.Data;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("health")]
public class HealthController : ControllerBase
{
    [HttpGet]
    [HttpHead]
    public IActionResult Health()
    {
        return Ok(new { status = "ok" });
    }
}