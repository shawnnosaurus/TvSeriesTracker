namespace WebApi.Services;

using AutoMapper;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Dto.Series;
using System.Text.RegularExpressions;

public interface ISeriesService
{
    IEnumerable<Series> GetAll(int userId);
    Series GetById(int id);
    bool Exists(CreateRequest model);
    bool Exists(UpdateRequest model);
    void Create(CreateRequest model);
    void Update(UpdateRequest model);
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

    public IEnumerable<Series> GetAll(int userId) =>
        _context.Series.ToList();

    public Series GetById(int id) =>
        GetSeries(id);

    public bool Exists(CreateRequest model) =>
        _context.Series.AsEnumerable()
            .Any(s => Regex.IsMatch(s.Title, model.Title, RegexOptions.IgnoreCase));

    public bool Exists(UpdateRequest model) =>
        _context.Series.AsEnumerable()
            .Any(s => Regex.IsMatch(s.Title, model.Title, RegexOptions.IgnoreCase));

    public void Create(CreateRequest model)
    {
        var series = _mapper.Map<Series>(model);

        _context.Series.Add(series);

        _context.SaveChanges();
    }

    public void Update(UpdateRequest model)
    {
        var series = GetSeries(model.Id);

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