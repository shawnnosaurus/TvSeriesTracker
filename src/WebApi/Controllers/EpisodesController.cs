namespace WebApi.Controllers;

using Microsoft.AspNetCore.Mvc;
using WebApi.Authorization;
using WebApi.Services;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class EpisodesController : ControllerBase
{
    private IEpisodeService _episodeService;

    public EpisodesController(IEpisodeService episodeService)
    {
        _episodeService = episodeService;
    }

    [HttpGet("{seriesId}")]
    public IActionResult GetAll(int seriesId)
    {
        var episodes = _episodeService.GetAll(seriesId);
        return Ok(episodes);
    }
}