using EmFacts.Data.Model;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;
using System.Threading;
using System.Threading.Tasks;

namespace EmFacts.Data.Context
{
    /// <summary>
    /// Apparel database context provider.
    /// </summary>
    public class FactCtx : DbContext, IFactCtx
    {
        public FactCtx(DbContextOptions<FactCtx> options) : base(options)
        { }

        public DbSet<Fact> Facts { get; set; }


        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
