namespace WebApi.Entities;

public class WatchedEpisode
{
    public int UserId { get; set; }
    public User User { get; set; }

    public int EpisodeId { get; set; }
    public Episode Episode { get; set; }
}
