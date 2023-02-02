using System;
using System.Text;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EmFacts.Data.Model
{
    /// <summary>
    /// Describes a promo code for transaction.
    /// </summary>
    public class Fact : BaseEntity
    {
        public string Question { get; set; }

        public string ImageSrc { get; set; }

        public string Tidbit { get; set; }

        public string[] Tags { get; set; }

        public int Tier { get; set; }

        [DataType(DataType.Date)]
        public DateTime CreationDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime ReviewDate { get; set; }
    }
}
