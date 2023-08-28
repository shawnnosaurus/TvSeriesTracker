namespace WebApi.Controllers;

using Microsoft.AspNetCore.Mvc;
using System.Security.Authentication;
using WebApi.Authorization;
using WebApi.Dto.Users;
using WebApi.Services;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("authenticate")]
    public IActionResult Authenticate(AuthenticateRequest model)
    {
        try
        {
            var response = _userService.Authenticate(model);
            return Ok(response);
        }
        catch (Exception ex)
        {
            return typeof(InvalidCredentialException).IsAssignableFrom(ex.GetType()) ? Unauthorized() : BadRequest(ex.Message);
        }
    }

    [HttpPost("register")]
    public IActionResult Register(RegisterRequest model)
    {
        try
        {
            _userService.Register(model);
            return Ok(new { message = "Registration successful" });
        }
        catch (Exception ex)
        {
            return typeof(InvalidCredentialException).IsAssignableFrom(ex.GetType()) ? Unauthorized() : BadRequest(ex.Message);
        }
    }

    [Authorize]
    [HttpGet]
    public IActionResult GetAll()
    {
        var users = _userService.GetAll();
        return Ok(users);
    }
}