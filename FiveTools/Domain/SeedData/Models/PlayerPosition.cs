using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Rosterbator.Models
{
    public class PlayerPosition
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string PlayerId { get; set; }
        public string Position { get; set; }
    }
}