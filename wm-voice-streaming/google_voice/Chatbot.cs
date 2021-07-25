using System;
using System.Collections.Generic;
using System.Text;
using System.Net.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace google_voice
{
    class Chatbot
    {
        private static readonly HttpClient client = new HttpClient();

        public async void askAsync(String question)
        {
            var values = new Dictionary<string, string>
            {
            { "sentence", question }
            };

            var content = new StringContent(JsonConvert.SerializeObject(values), Encoding.UTF8, "application/json");
            var response = await client.PostAsync("http://35.241.209.28/chatbot/voice", content);
            var responseString = await response.Content.ReadAsStringAsync();
            dynamic answer = JObject.Parse(responseString);

            Console.WriteLine("Chatbot: " + answer.results.answer);

        }

    }
}
