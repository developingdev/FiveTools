using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Rosterbator.Models
{
    public class PitcherSeason
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string PlayerId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public int W { get; set; }
        public int L { get; set; }
        public float ERA { get; set; }
        public int GS { get; set; }
        public int G { get; set; }
        public int SV { get; set; }
        public float IP { get; set; }
        public int H { get; set; }
        public int ER { get; set; }
        public int HR { get; set; }
        public int SO { get; set; }
        public int BB { get; set; }
        public float WHIP { get; set; }
        public float KRate { get; set; }
        public float BBRate { get; set; }
        public float FIP { get; set; }
        public float WAR { get; set; }
        public float RA9WAR { get; set; }

    }
}