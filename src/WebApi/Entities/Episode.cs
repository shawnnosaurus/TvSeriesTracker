namespace WebApi.Entities;

public class Episode
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int Season { get; set; } = 1;
    public int EpisodeNumber { get; set; } = 1;
    public int SeriesId { get; set; }
    public Series Series { get; set; }

    public ICollection<WatchedEpisode> UsersWatched { get; set; } = new List<WatchedEpisode>();
}