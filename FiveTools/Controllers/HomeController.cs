using CsvHelper;
using Rosterbator.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace FiveTools.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            //var batters = GetAllBatters();

            return View();
        }

        public JsonResult AllBatters()
        {
            //var db = new RosterbatorDbContext();
            var list = GetAllBatters();

            return new JsonResult { Data = list, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        private List<BatterSeason> GetAllBatters()
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            //Make sure file build actions is set to "Embedded Resource"
            string resourceName = "FiveTools.Domain.SeedData.BattingLeaders2016.csv";

            using (Stream stream = assembly.GetManifestResourceStream(resourceName))
            {
                using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
                {
                    CsvReader csvReader = new CsvReader(reader);
                    csvReader.Configuration.WillThrowOnMissingField = false;
                    var batters = csvReader.GetRecords<BatterSeason>().ToList();

                    return batters;
                }
            }
        }

    }
}