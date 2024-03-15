using Microsoft.EntityFrameworkCore;

namespace MovieRating.Models;

public class DatabaseContext : DbContext
{
  public DatabaseContext(DbContextOptions<DatabaseContext> options)
      : base(options) { }

  public DbSet<Movie> Movies => Set<Movie>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<Movie>()
        .Property(e => e.CreatedAt)
        .HasDefaultValueSql("now()");
  }
}