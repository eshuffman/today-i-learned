﻿using System;
using System.Text;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EmFacts.DTOs
{
    /// <summary>
    /// Describes a data transfer object for a fact.
    /// </summary>
    public class FactsDTO
    {
        public int Id { get; set; }

        public string Question { get; set; }

        public string ImageSrc { get; set; }

        public string Tidbit { get; set; }

        public string[] Tags { get; set; }

        public int Tier { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime ReviewDate { get; set; }
    }
}

//future feature: ability to store each time reviewed and how review went