namespace WebApi.Dto.Episode;

public class CreateRequest
{
    public string Title { get; set; }
    public int Season { get; set; } = 1;
    public int EpisodeNumber { get; set; } = 1;
    public int SeriesId { get; set; }
}