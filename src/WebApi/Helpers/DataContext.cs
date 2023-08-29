namespace WebApi.Helpers;

using Microsoft.EntityFrameworkCore;
using WebApi.Entities;

public class DataContext : DbContext
{
    protected readonly IConfiguration Configuration;

    public DataContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Series> Series { get; set; }
    public DbSet<Episode> Episodes { get; set; }
    public DbSet<WatchedEpisode> UsersWatchedEpisodes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlServer(Configuration.GetConnectionString("WebApiDatabase"));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<WatchedEpisode>()
            .HasKey(ue => new { ue.UserId, ue.EpisodeId });

        modelBuilder.Entity<WatchedEpisode>()
            .HasOne(ue => ue.User)
            .WithMany(u => u.EpisodesWatched)
            .HasForeignKey(ue => ue.UserId);

        modelBuilder.Entity<WatchedEpisode>()
            .HasOne(ue => ue.Episode)
            .WithMany(e => e.UsersWatched)
            .HasForeignKey(ue => ue.EpisodeId);
    }

}