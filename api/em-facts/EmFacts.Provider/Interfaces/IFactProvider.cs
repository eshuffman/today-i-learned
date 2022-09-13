using System.Collections.Generic;
using System.Threading.Tasks;
using EmFacts.Data.Model;

namespace EmFacts.Provider.Interfaces
{
    /// <summary>
    /// This interface provides an abstraction layer for promo code related service methods.
    /// </summary>
    public interface IFactProvider
    {
        Task<Fact> CreateFactAsync(Fact model);
        Task<IEnumerable<Fact>> GetAllFactsAsync();
        Task<Fact> DeleteFactByIdAsync(int Id);

    }
}
