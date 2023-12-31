﻿namespace WebApi.Entities;

public class WatchedEpisode
{
    public Guid UserId { get; set; }
    public User User { get; set; }

    public int EpisodeId { get; set; }
    public Episode Episode { get; set; }
}
