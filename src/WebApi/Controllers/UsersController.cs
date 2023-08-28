namespace WebApi.Controllers;

using Microsoft.AspNetCore.Mvc;
using System.Security.Authentication;
using WebApi.Authorization;
using WebApi.Dto.Users;
using WebApi.Services;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [AllowAnonymous]
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

    [AllowAnonymous]
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

    [HttpGet]
    public IActionResult GetAll()
    {
        var users = _userService.GetAll();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var user = _userService.GetById(id);
        return Ok(user);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, UpdateRequest model)
    {
        _userService.Update(id, model);
        return Ok(new { message = "User updated successfully" });
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _userService.Delete(id);
        return Ok(new { message = "User deleted successfully" });
    }
}