namespace WebApi.Services;

using AutoMapper;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Dto.Episode;

public interface IEpisodeService
{
    IEnumerable<Episode> GetAll(int seriesId);
    Episode GetById(int id);
    void Create(Episode model);
    void Update(int id, UpdateRequest model);
}

public class EpisodeService : IEpisodeService
{
    private DataContext _context;
    private readonly IMapper _mapper;

    public EpisodeService(
        DataContext context,
        IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public IEnumerable<Episode> GetAll(int seriesId)
    {
        return _context.Episodes.Where(episode => episode.SeriesId == seriesId);
    }

    public Episode GetById(int id)
    {
        return GetEpisode(id);
    }

    public void Create(Episode model)
    {
        var episode = _mapper.Map<Episode>(model);

        _context.Episodes.Add(episode);
        _context.SaveChanges();
    }

    public void Update(int id, UpdateRequest model)
    {
        var episode = GetEpisode(id);

        _mapper.Map(model, episode);
        _context.Episodes.Update(episode);
        _context.SaveChanges();
    }

    private Episode GetEpisode(int id)
    {
        var episode = _context.Episodes.Find(id);
        return episode ?? throw new KeyNotFoundException("Episode not found");
    }
}