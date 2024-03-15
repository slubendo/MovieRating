using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieRating.Models;

namespace MovieRating.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private readonly DatabaseContext _context;

    public MoviesController(DatabaseContext context)
    {
        _context = context;
    }

   [HttpGet]
    public async Task<ActionResult<IEnumerable<Movie>>> GetMovieItems(int? rating)
    {
        if (rating.HasValue) {
            return await _context.Movies.Where(m => m.Rating >= rating).ToListAsync();
        }
        return await _context.Movies.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Movie>> GetMovieItem(int id)
    {
        var MovieItem = await _context.Movies.FindAsync(id);

        if (MovieItem == null)
        {
            return NotFound();
        }

        return MovieItem;
    }

    [HttpPost]
    public async Task<ActionResult<Movie>> PostMovieItem(Movie Movie)
    {
        _context.Movies.Add(Movie);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMovieItem), new { id = Movie.Id }, Movie);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutMovieItem(int id, Movie Movie)
    {
        if (id != Movie.Id)
        {
            return BadRequest();
        }

        _context.Entry(Movie).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMovieItem(int id)
    {
        var MovieItem = await _context.Movies.FindAsync(id);
        if (MovieItem == null)
        {
            return NotFound();
        }

        _context.Movies.Remove(MovieItem);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}