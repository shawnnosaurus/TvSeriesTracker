namespace WebApi.Services;

using AutoMapper;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Dto.Episode;
using System.Text.RegularExpressions;

public interface IEpisodeService
{
    IEnumerable<Episode> GetAll();
    IEnumerable<Episode> GetAll(int seriesId);
    Episode GetById(int id);
    bool Exists(CreateRequest model);
    bool Exists(UpdateRequest model);
    void Create(CreateRequest model);
    void Update(UpdateRequest model);
    IEnumerable<Episode> GetWatched(User user);
    IEnumerable<Episode> GetWatched(User user, int seriesId);
    void UpdateWatched(User user, UpdateWatchedRequest model);
}

public class EpisodeService : IEpisodeService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public EpisodeService(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public IEnumerable<Episode> GetAll() =>
        _context.Episodes.ToList();

    public IEnumerable<Episode> GetAll(int seriesId) =>
        GetSeriesEpisodes(seriesId);

    public Episode GetById(int id) =>
        GetEpisode(id);

    public bool Exists(CreateRequest model) =>
        _context.Series.AsEnumerable()
            .Any(s => Regex.IsMatch(s.Title, model.Title, RegexOptions.IgnoreCase));

    public bool Exists(UpdateRequest model) =>
        _context.Series.AsEnumerable()
            .Any(s => Regex.IsMatch(s.Title, model.Title, RegexOptions.IgnoreCase));

    public void Create(CreateRequest model)
    {
        var episode = _mapper.Map<Episode>(model);

        _context.Episodes.Add(episode);

        _context.SaveChanges();
    }

    public void Update(UpdateRequest model)
    {
        var episode = GetEpisode(model.Id);
        _mapper.Map(model, episode);

        _context.Episodes.Update(episode);
        _context.SaveChanges();
    }

    public IEnumerable<Episode> GetWatched(User user, int seriesId)
    {
        var episodesWatched = GetWatched(user);
        var seriesEpisodes = GetAll(seriesId).Select(ep => ep.Id);
        var episodesWatchedBySeries = episodesWatched.Where(episode => seriesEpisodes.Any(id => episode.Id == id));
        return episodesWatchedBySeries;
    }

    public IEnumerable<Episode> GetWatched(User user)
    {
        return _context.UsersWatchedEpisodes
            .Where(we => we.UserId == user.Id)
            .Select(ew => ew.Episode)
            .ToList();
    }

    public void UpdateWatched(User user, UpdateWatchedRequest model)
    {
        var usersWatchedEpisode = new WatchedEpisode
        {
            EpisodeId = model.Id,
            UserId = user.Id,
        };

        if (model.Watched)
            _context.UsersWatchedEpisodes.Add(usersWatchedEpisode);
        else
            _context.UsersWatchedEpisodes.Remove(usersWatchedEpisode);

        _context.SaveChanges();
    }

    private IEnumerable<Episode> GetSeriesEpisodes(int id)
    {
        var episodes = _context.Episodes.Where(e => e.SeriesId == id);
        return episodes ?? throw new KeyNotFoundException("Episodes not found for Series");
    }

    private Episode GetEpisode(int id)
    {
        var episode = _context.Episodes.Find(id);
        return episode ?? throw new KeyNotFoundException("Episode not found");
    }
}