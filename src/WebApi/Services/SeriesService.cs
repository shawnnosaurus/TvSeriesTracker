namespace WebApi.Services;

using AutoMapper;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Dto.Series;

public interface ISeriesService
{
    IEnumerable<Series> GetAll(int userId);
    Series GetById(int id);
    void Create(Series model);
    void Update(int id, UpdateRequest model);
}

public class SeriesService : ISeriesService
{
    private DataContext _context;
    private readonly IMapper _mapper;

    public SeriesService(
        DataContext context,
        IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public IEnumerable<Series> GetAll(int userId)
    {
        return _context.Series.Where(series => series.User.Id == userId);
    }

    public Series GetById(int id)
    {
        return GetSeries(id);
    }

    public void Create(Series model)
    {
        var series = _mapper.Map<Series>(model);

        _context.Series.Add(series);
        _context.SaveChanges();
    }

    public void Update(int id, UpdateRequest model)
    {
        var series = GetSeries(id);

        _mapper.Map(model, series);
        _context.Series.Update(series);
        _context.SaveChanges();
    }

    private Series GetSeries(int id)
    {
        var series = _context.Series.Find(id);
        return series ?? throw new KeyNotFoundException("Series not found");
    }
}