namespace WebApi.Dto.Episode;

public class UpdateRequest
{
    public string Title { get; set; }

    private Entities.Series Series { get; set; }
    private bool _started;
    public bool Started
    {
        get => _started;
        set
        {
            if (_started == value) return;

            _started = value;
            if (Series != null && _started)
            {
                Series.Started = true;
            }
        }
    }
}