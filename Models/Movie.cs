namespace MovieRating.Models;

public class Movie
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public int Year { get; set; }
    public required int Rating { get; set; }
    public DateTime CreatedAt { get; set; }
}