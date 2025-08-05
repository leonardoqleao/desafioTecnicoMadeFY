using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Task = Infra.Model.Task;
namespace Infra.Data
{
    public class DataBaseContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public DataBaseContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public DataBaseContext()
        {
            _configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", false, true).Build();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                string? cnn = _configuration.GetConnectionString("NpgSqlConnectionString");
                optionsBuilder.UseNpgsql(cnn ?? "");
            }
        }

        public DbSet<Task> Tasks { get; set; }
    }
}
