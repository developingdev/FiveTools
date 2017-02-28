//using Rosterbator.Models;
//using System;
//using System.Collections.Generic;
//using System.Data.Entity;
//using System.Data.Entity.ModelConfiguration.Conventions;
//using System.Linq;
//using System.Web;

//namespace Rosterbator.DAL
//{
//    public class RosterbatorDbContext : DbContext
//    {

//        public RosterbatorDbContext() : base("RosterbatorDbContext")
//        {
//        }

//        public DbSet<BatterSeason> BatterSeason { get; set; }
//        public DbSet<PitcherSeason> Steamer600Pitchers2017 { get; set; }

//        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
//        //{
//        //    modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
//        //}
//    }
//}