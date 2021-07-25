using System;

namespace google_voice
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                var stream = new Stream();
                stream.execute();
            } catch(Exception e)
            {

            }
        }
    }
}
