namespace WebApi.Controllers;

using Microsoft.AspNetCore.Mvc;
using WebApi.Authorization;
using WebApi.Dto.Series;
using WebApi.Services;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class SeriesController : ControllerBase
{
    private ISeriesService _seriesService;
    private IUserService _userService;

    public SeriesController(ISeriesService seriesService, IUserService userService)
    {
        _seriesService = seriesService;
        _userService = userService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var user = _userService.GetByRequestHeaders(Request.Headers);
        if (user != null)
        {
            var series = _seriesService.GetAll(user.Id);

            return Ok(series);
        }

        return Unauthorized();
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var series = _seriesService.GetById(id);
        return Ok(series);
    }

    [HttpPut("update")]
    public IActionResult Update(UpdateRequest model)
    {
        if (_seriesService.Exists(model)) return UnprocessableEntity(new { message = "Series title already in use" });

        _seriesService.Update(model);
        return Ok(new { message = "Series updated successfully" });
    }

    [HttpPost("create")]
    public IActionResult Create(CreateRequest model)
    {
        if (_seriesService.Exists(model)) return UnprocessableEntity(new { message = "Series title already in use" });

        _seriesService.Create(model);
        return Ok(new { message = "Series added successfully" });
    }
}