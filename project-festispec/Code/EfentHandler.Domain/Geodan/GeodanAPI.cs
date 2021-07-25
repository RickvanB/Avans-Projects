using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace EfentHandler.Domain.Geodan
{
    public class GeodanAPI
    {
        private const String API_KEY = "6c4c63db-de9a-11e8-8aac-005056805b87";
        private const String BASE_URL = "https://services.geodan.nl";

        private Double _latitude;
        private Double _longitude;

        private String _metric;
        private String _distance;
        private String _duration;

        public GeodanAPI() { }

        /// <summary>
        /// Returns latitude and longitude from the given location
        /// </summary>
        /// <param name="address"></param>
        /// <param name="housenumber"></param>
        /// <param name="city"></param>
        /// <returns>Double array</returns>
        public Double[] GetGeoCoordinatesFromAddress(int housenumber, String postcode)
        {
            // Configurate url
            //String url = BASE_URL + "/geosearch/free?q=" + HttpUtility.UrlEncode(address) + "+AND+housenumber:" + housenumber + "+AND+fcity:" + HttpUtility.UrlEncode(city) + "+AND+type:address&servicekey=" + API_KEY;
            String url = BASE_URL + "/geosearch/free?q=housenumber:" + housenumber + "+AND+fpostcode:" + HttpUtility.UrlEncode(postcode) + "+AND+type:address&servicekey=" + API_KEY;

            using (var webClient = new System.Net.WebClient())
            {
                // Get JSON from url and convert it to an object
                var json = webClient.DownloadString(url);
                var geo = JsonConvert.DeserializeObject<dynamic>(json);

                // Check if we didn't found an address
                if (geo["response"]["numFound"] == 0)
                {
                    return new Double[] { };
                }

                // Split string to get the latitude and longitude
                String coordinates = geo["response"]["docs"][0]["geom"];
                String coordinates1 = coordinates.Replace("POINT(", "");
                String coordinates2 = coordinates1.Replace(")", "");
                string[] geoCoordinates = coordinates2.Split(null);

                // Convert from string to double
                Double.TryParse(geoCoordinates[1], NumberStyles.Any, CultureInfo.InvariantCulture, out _latitude);
                Double.TryParse(geoCoordinates[0], NumberStyles.Any, CultureInfo.InvariantCulture, out _longitude);
            }

            return new Double[] { _latitude, _longitude };
        }

        /// <summary>
        /// Returns the travel time and distance between two locations
        /// </summary>
        /// <param name="from"></param>
        /// <param name="to"></param>
        /// <param name="format">min-m / min-km</param>
        /// <returns>String array</returns>
        public String[] CalculateTravelTimeAndDistance(Double[] from, Double[] to, String format)
        {
            var fromLatitude = from[1].ToString().Replace(",",".");
            var fromLongitude = from[0].ToString().Replace(",", ".");
            var toLatitude = to[1].ToString().Replace(",", ".");
            var toLongitude = to[0].ToString().Replace(",", ".");

            String url = BASE_URL + "/routing/route?fromcoordx=" + fromLongitude + "&fromcoordy=" + fromLatitude + "&tocoordx=" + toLongitude + "&tocoordy=" + toLatitude + "&returntype=coords&outputformat=json&format=" + format + "&servicekey=" + API_KEY;

            using (var webClient = new System.Net.WebClient())
            {
                // Get JSON from url and convert it to an object
                var json = webClient.DownloadString(url);
                var geo = JObject.Parse(json);

                if(format.Equals("min-km"))
                {
                    _metric = "kilometer";
                }
                else if(format.Equals("min-m"))
                {
                    _metric = "meter";
                }

                _distance = Convert.ToInt64(geo["features"][0]["properties"]["distance"]) + " " + _metric;
                _duration = Convert.ToInt64(geo["features"][0]["properties"]["duration"]) + " minuten";

            }

            return new String[] { _distance, _duration };
        }
    }
}
