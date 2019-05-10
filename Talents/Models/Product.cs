using System;
using System.Collections.Generic;

namespace Talents.Models
{
    public partial class Product
    {
        public Product()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }

        public ICollection<Sales> Sales { get; set; }
    }
}
