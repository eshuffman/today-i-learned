namespace EmFacts.DTOs
{
    /// <summary>
    /// Describes a data transfer object for a fact.
    /// </summary>
    public class FactsDTO
    {
        public int Id { get; set; }

        public string Question { get; set; }

        public string Tidbit { get; set; }

        public string[] Tags { get; set; }

        public int Tier { get; set; }
    }
}
