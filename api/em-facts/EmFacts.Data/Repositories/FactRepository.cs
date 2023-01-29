using EmFacts.Data.Context;
using EmFacts.Data.Interfaces;
using EmFacts.Data.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmFacts.Data.Repositories
{
    /// <summary>
    /// This class handles methods for making requests to the promo code repository.
    /// </summary>
    public class FactRepository : IFactRepository
    {
        private readonly IFactCtx _ctx;

        public FactRepository(IFactCtx ctx)
        {
            _ctx = ctx;
        }


        public async Task<Fact> CreateFactAsync(Fact fact)
        {
            await _ctx.Facts.AddAsync(fact);
            await _ctx.SaveChangesAsync();

            return fact;
        }

        public async Task<IEnumerable<Fact>> GetAllFactsAsync()
        {
            return await _ctx.Facts
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Fact> GetFactByIdAsync(int Id)
        {
            return await _ctx.Facts
                .AsNoTracking()
                .Where(f => f.Id == Id)
                .SingleOrDefaultAsync();
        }

        public async Task<Fact> DeleteFactByIdAsync(int Id)
        {
            var fact = await _ctx.Facts
                .AsNoTracking()
                .Where(f => f.Id == Id)
                .SingleOrDefaultAsync();
            _ctx.Facts.Remove(fact);
            await _ctx.SaveChangesAsync();
            return fact;
        }

        public async Task<Fact> UpdateFactAsync(Fact fact)
        {
            _ctx.Facts.Update(fact);
            await _ctx.SaveChangesAsync();

            return fact;
        }
    }
}
