namespace WebApi.Entities;

public class Episode
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int Season { get; set; }
    public int EpisodeNumber { get; set; }
    public bool Started { get; set; }
    public int SeriesId { get; set; }
    public Series Series { get; set; }
    public ICollection<User> Users { get; set; }
}