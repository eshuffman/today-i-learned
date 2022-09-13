using EmFacts.Provider.Interfaces;
using EmFacts.Provider.Providers;
using Microsoft.Extensions.DependencyInjection;

namespace EmFacts.Provider
{
    /// <summary>
    /// This class provides configuration options for provider services.
    /// </summary>
    public static class ServicesConfiguration
    {
        public static IServiceCollection AddProviders(this IServiceCollection services)
        {
            services.AddScoped<IFactProvider, FactProvider>();

            return services;
        }
    
    }
}
