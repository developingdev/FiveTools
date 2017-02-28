using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Rosterbator.Models
{
    public class BatterSeason
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int PlayerId { get; set; }
        public float WAR { get; set; }
        public float Def { get; set; }
        public float Off { get; set; }
        public int wRCPlus { get; set; }
        public float wOBA { get; set; }
        public float SLG { get; set; }
        public float OBP { get; set; }
        public float AVG { get; set; }
        public float BABIP { get; set; }
        public float ISO { get; set; }
        public string KRate { get; set; }
        public string BBRate { get; set; }
        public int SB { get; set; }
        public int RBI { get; set; }
        public int R { get; set; }
        public int HR { get; set; }
        public int PA { get; set; }
        public int G { get; set; }
        public string Team { get; set; }
        public string Name { get; set; }
    }
}