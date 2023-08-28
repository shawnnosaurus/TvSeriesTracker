namespace WebApi.Entities;

public class Series
{
    public int Id { get; set; }
    public string Title { get; set; }
    public bool Started { get; set; }
    public ICollection<Episode> Episodes { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}