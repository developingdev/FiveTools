//using CsvHelper;
//using Rosterbator.Models;
//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Reflection;
//using System.Text;
//using System.Web;
//using System.Data.Entity.Migrations;

//namespace Rosterbator.DAL
//{
//    public class RosterbatorDbInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<RosterbatorDbContext>
//    {
//        protected override void Seed(RosterbatorDbContext context)
//        {

//            SeedBatters(context);
//            SeedPitchers(context);
//        }

//        private void SeedBatters(RosterbatorDbContext context)
//        {
//            Assembly assembly = Assembly.GetExecutingAssembly();
//            string resourceName = "Rosterbator.Domain.SeedData.BattingLeaders2016.csv";
//            using (Stream stream = assembly.GetManifestResourceStream(resourceName))
//            {
//                using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
//                {
//                    CsvReader csvReader = new CsvReader(reader);
//                    csvReader.Configuration.WillThrowOnMissingField = false;
//                    var batters = csvReader.GetRecords<BatterSeason>().ToArray();
//                    context.BatterSeason.AddOrUpdate(c => c.PlayerId, batters);
//                }
//            }            
//        }

//        private void SeedPitchers(RosterbatorDbContext context)
//        {
//            Assembly assembly = Assembly.GetExecutingAssembly();
//            string resourceName = "Rosterbator.Domain.SeedData.Steamer600Pitchers2017.csv";
//            try
//            {
//                using (Stream stream = assembly.GetManifestResourceStream(resourceName))
//                {
//                    using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
//                    {
//                        CsvReader csvReader = new CsvReader(reader);
//                        //csvReader.Configuration.WillThrowOnMissingField = false;
//                        var pitchers = csvReader.GetRecords<PitcherSeason>().ToArray();
//                        context.Steamer600Pitchers2017.AddOrUpdate(c => c.PlayerId, pitchers);
//                    }
//                }
//            }
//            catch(Exception e)
//            {
//                throw e;
//            }
//        }
//    }
//}