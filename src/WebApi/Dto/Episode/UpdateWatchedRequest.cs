namespace WebApi.Dto.Episode;

public class UpdateWatchedRequest
{
    public int Id { get; set; }
    public bool Watched { get; set; }
}