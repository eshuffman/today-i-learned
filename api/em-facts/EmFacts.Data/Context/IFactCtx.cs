using EmFacts.Data.Model;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace EmFacts.Data.Context
{
    /// <summary>
    /// This interface provides an abstraction layer for the apparel database context.
    /// </summary>
    public interface IFactCtx
    {
        public DbSet<Fact> Facts { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken());
    }
}
