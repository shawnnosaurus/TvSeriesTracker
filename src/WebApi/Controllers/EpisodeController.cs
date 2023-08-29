namespace WebApi.Controllers;

using Microsoft.AspNetCore.Mvc;
using WebApi.Authorization;
using WebApi.Dto.Episode;
using WebApi.Services;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class EpisodeController : ControllerBase
{
    private IEpisodeService _episodeService;
    private IUserService _userService;

    public EpisodeController(IEpisodeService episodeService, IUserService userService)
    {
        _episodeService = episodeService;
        _userService = userService;
    }

    [HttpGet("series/{seriesId}")]
    public IActionResult GetAll(int seriesId)
    {
        var episodes = _episodeService.GetAll(seriesId);
        return Ok(episodes);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var episodes = _episodeService.GetById(id);
        return Ok(episodes);
    }

    [HttpPut("{id}")]
    public IActionResult Update(UpdateRequest model)
    {
        if (_episodeService.Exists(model)) return UnprocessableEntity(new { message = "Series title already in use" });

        _episodeService.Update(model);
        return Ok(new { message = "Episode added successfully" });
    }

    [HttpPost("create")]
    public IActionResult GetWatched(CreateRequest model)
    {
        if (_episodeService.Exists(model)) return UnprocessableEntity(new { message = "Series title already in use" });

        _episodeService.Create(model);
        return Ok(new { message = "Episode added successfully" });
    }

    [HttpGet("watched/series/{seriesId}")]
    public IActionResult GetWatched(int seriesId)
    {
        var user = _userService.GetByRequestHeaders(Request.Headers);
        if (user != null)
        {
            var episodes = _episodeService.GetWatched(user, seriesId);
            return Ok(episodes);
        }

        return Unauthorized();
    }

    [HttpPut("watched")]
    public IActionResult GetWatched(UpdateWatchedRequest model)
    {
        var user = _userService.GetByRequestHeaders(Request.Headers);
        if (user != null)
        {
            _episodeService.UpdateWatched(user, model);
            return Ok(new { message = "Episode added successfully" });
        }

        return Unauthorized();
    }
}