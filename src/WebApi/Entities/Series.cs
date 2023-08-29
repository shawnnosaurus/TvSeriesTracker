namespace WebApi.Entities;

public class Series
{
    public int Id { get; set; }
    public string Title { get; set; }
    public ICollection<Episode> Episodes { get; set; } = new List<Episode>();
}