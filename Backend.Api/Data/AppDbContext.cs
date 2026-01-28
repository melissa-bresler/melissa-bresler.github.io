using Backend.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Game> Games => Set<Game>();
        public DbSet<BlogPost> BlogPosts => Set<BlogPost>();
    }
}