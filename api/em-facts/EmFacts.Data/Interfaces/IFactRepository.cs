using EmFacts.Data.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmFacts.Data.Interfaces
{
    /// <summary>
    /// This interface provides an abstraction layer for promo code repository methods.
    /// </summary>
    public interface IFactRepository
    {

        Task<Fact> CreateFactAsync(Fact fact);
        Task<IEnumerable<Fact>> GetAllFactsAsync();
        Task<Fact> DeleteFactByIdAsync(int Id);
        Task<Fact> GetFactByIdAsync(int Id);
    }
}
