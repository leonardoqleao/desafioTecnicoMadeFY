using Infra.Data;
using Infra.Repository;
using Infra.Repository.Interface;
using Infra.Service;
using Infra.Service.Interface;
using Microsoft.Extensions.DependencyInjection;


namespace Infra.Utils
{
    public static class DependenceResolve
    {
        public static void AddDependencyInjectionConfiguration(this IServiceCollection services)
        {
            services.AddDbContext<DataBaseContext>();
            services.AddTransient();
            services.AddScoped();
        }
        private static void AddTransient(this IServiceCollection services)
        {
            services.AddTransient<ITaskRepository, TaskRepository>();

        }
        private static void AddScoped(this IServiceCollection services)
        {
            services.AddScoped<ITaskService, TaskService>();
        }
    }
}
