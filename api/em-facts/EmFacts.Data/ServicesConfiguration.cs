using EmFacts.Data.Context;
using EmFacts.Data.Interfaces;
using EmFacts.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace EmFacts.Data
{
    /// <summary>
    /// This class provides configuration options for services and uses
    /// appsettings.[current_environment].json file to configure context.
    /// </summary>
    public static class ServicesConfiguration
    {
        public static IServiceCollection AddDataServices(this IServiceCollection services, IConfiguration config)
        {

            services.AddDbContext<FactCtx>(options =>
            {
                if (config.GetValue<bool>("IsDevelopment"))
                {
                    options.UseNpgsql(config.GetConnectionString("EmFacts"));
                };
            });

            services.AddScoped<IFactCtx>(provider => provider.GetService<FactCtx>());

            services.AddScoped<IFactRepository, FactRepository>();

            return services;

        }

    }

}
