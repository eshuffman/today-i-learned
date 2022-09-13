namespace EmFacts.DTOs
{
    /// <summary>
    /// Describes a data transfer object for a promo code.
    /// </summary>
    public class FactsDTO
    {
        public int Id { get; set; }

        public string Question { get; set; }

        public string Tidbit { get; set; }

        public string Tags { get; set; }

        public string Tier { get; set; }
    }
}
