namespace WebApi.Dto.Episode;

public class UpdateRequest
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int Season { get; set; } = 1;
    public int EpisodeNumber { get; set; } = 1;
}