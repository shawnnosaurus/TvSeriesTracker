namespace WebApi.Services;

using AutoMapper;
using BCrypt.Net;
using WebApi.Authorization;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Dto.Users;
using System.Security.Authentication;

public interface IUserService
{
    AuthenticateResponse Authenticate(AuthenticateRequest model);
    IEnumerable<User> GetAll();
    User GetById(Guid id);
    User GetByRequestHeaders(IHeaderDictionary headers);
    void Register(RegisterRequest model);
    void Update(Guid id, UpdateRequest model);
    void Delete(Guid id);
}

public class UserService : IUserService
{
    private DataContext _context;
    private IJwtUtils _jwtUtils;
    private readonly IMapper _mapper;

    public UserService(
        DataContext context,
        IJwtUtils jwtUtils,
        IMapper mapper)
    {
        _context = context;
        _jwtUtils = jwtUtils;
        _mapper = mapper;
    }

    public AuthenticateResponse Authenticate(AuthenticateRequest model)
    {
        var user = _context.Users.SingleOrDefault(x => x.Username == model.Username);

        if (user == null || !BCrypt.Verify(model.Password, user.PasswordHash))
            throw new InvalidCredentialException("Username or password is incorrect");

        var response = _mapper.Map<AuthenticateResponse>(user);
        response.Token = _jwtUtils.GenerateToken(user);
        return response;
    }

    public IEnumerable<User> GetAll() => 
        _context.Users;

    public User GetById(Guid id) => 
        GetUser(id);

    public User GetByRequestHeaders(IHeaderDictionary headers)
    {
        var userId = _jwtUtils.GetUserIdFromeRequestHeaders(headers);
        if (userId == null) return null;

        return GetUser((Guid)userId);
    }

    public void Register(RegisterRequest model)
    {
        if (_context.Users.Any(x => x.Username == model.Username))
            throw new InvalidCredentialException("Username '" + model.Username + "' is already taken");

        var user = _mapper.Map<User>(model);

        user.PasswordHash = BCrypt.HashPassword(model.Password);

        _context.Users.Add(user);
        _context.SaveChanges();
    }

    public void Update(Guid id, UpdateRequest model)
    {
        var user = GetUser(id);

        if (!string.IsNullOrEmpty(model.Password))
            user.PasswordHash = BCrypt.HashPassword(model.Password);

        _mapper.Map(model, user);
        _context.Users.Update(user);
        _context.SaveChanges();
    }

    public void Delete(Guid id)
    {
        var user = GetUser(id);
        _context.Users.Remove(user);
        _context.SaveChanges();
    }

    private User GetUser(Guid id)
    {
        var user = _context.Users.Find(id);
        return user ?? throw new KeyNotFoundException("User not found");
    }
}