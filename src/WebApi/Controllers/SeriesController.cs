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

    public SeriesController(ISeriesService seriesService)
    {
        _seriesService = seriesService;
    }

    [HttpGet("{userId:int}")]
    public IActionResult GetAll(int userId)
    {
        var series = _seriesService.GetAll(userId);
        return Ok(series);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var series = _seriesService.GetById(id);
        return Ok(series);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, UpdateRequest model)
    {
        _seriesService.Update(id, model);
        return Ok(new { message = "Series updated successfully" });
    }
}