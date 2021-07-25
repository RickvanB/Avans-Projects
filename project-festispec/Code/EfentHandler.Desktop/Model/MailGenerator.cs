using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using MailKit.Net.Smtp;
using MimeKit;
using System.Windows;

namespace EfentHandler.Desktop.Model
{
    public class MailGenerator
    {
        #region Fields
        private const string COMPANY = "Festispec";
        private const string COMPANY_EMAIL = "noreply@festispec.nl";
        private const string SUBJECT_DEFAULT = "VERTROUWELIJK - Inspectie Rapportage van: ";
        #endregion

        /// <summary>
        /// This method will send a email to a customer.
        /// </summary>
        /// <param name="customerName"> One name of the customer</param>
        /// <param name="customerEmailAdress"> List of email adresses to sent to. Will be validated</param>
        /// <param name="dateOfInspection"> Date of the inspections</param>
        /// <param name="filePathDOTPDF"> Fully filepath /files/enz with .pdf!!</param>
        public bool SendMail(string customerName, List<string> customerEmailAdress, string dateOfInspection, string filePathDOTPDF)
        {
            // Early abort
            if (customerName == null || customerEmailAdress == null)
            {
                MessageBox.Show("Het e-mailen van de rapportage is mislukt omdat niet alle gegevens bekend zijn", "Mislukt");
                return false;
            }

            var message = new MimeMessage();

            // Set sender of the email
            message.From.Add(new MailboxAddress(COMPANY, COMPANY_EMAIL));

            // Set recievers
            foreach (var customer_email in customerEmailAdress)
            {
                // Validate emailadress
                if (customer_email.Contains("@"))
                {
                    // Customer name + Email adress
                    message.To.Add(new MailboxAddress(customerName, customer_email));
                }
                else
                {
                    MessageBox.Show("De rapportage versturen naar" + customer_email + " is mislukt. Het e-mail adres is ongeldig", "Foutief e-mail adres");
                    return false;
                }

            }
            // Set subject of the email + Date of inspection           
            message.Subject = SUBJECT_DEFAULT + dateOfInspection;

            // Set text in body
            var bodyText = new TextPart("plain")
            {
                Text = "Beste " + customerName + "," +
                "\r\r" +
                "Aller eerst bedankt voor het vertrouwen in Festispec." + "\r" +
                "In de bijlage vindt u de rapportage van de inspectie die is uitgevoerd op: " + dateOfInspection + ". \r" +
                "Als er vragen bestaan over de inhoud van de toegestuurde rapportage, kunt u contact opnemen met uw contactpersoon." +
                "\r\rMet vriendelijke groet," +
                "\r\rFestispec" + " - Wij zetten de puntjes op de F"
                + "\r\r\r"
            };

            var footerText = new TextPart("plain")
            {
                Text = "Dit e-mailbericht is uitsluitend bestemd voor de geadresseerde en is vertrouwelijk van aard. Mocht er sprake zijn van onjuistheden en/of onvolledigheden dan kunnen daaraan geen rechten worden ontleend. Als dit bericht niet voor u is bestemd dan dient u de inhoud ervan niet te lezen, kopieren, op te slaan, openbaar te maken, gebruiken of te distribueren. U wordt vriendelijk verzocht de afzender op de hoogte te stellen van de foutieve adressering"
            };

            // Construction object
            MimePart attachment;

            try
            {
                // Add documents to the E-mail
                attachment = new MimePart("file", "pdf")
                {
                    ContentObject = new ContentObject(File.OpenRead(filePathDOTPDF + ".pdf"), ContentEncoding.Default),
                    ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
                    ContentTransferEncoding = ContentEncoding.Base64,
                    FileName = Path.GetFileName(filePathDOTPDF + ".pdf")
                };
            }
            catch
            {
                MessageBox.Show("Het versturen van de e-mail is mislukt. De bijlage kon niet worden toegevoegd. Bestaat het bestand?", "Versturen mislukt");
                return false;
            }

            // Add components to the mail
            var multipart = new Multipart("mixed");
            multipart.Add(bodyText);
            multipart.Add(attachment);
            multipart.Add(footerText);
            message.Body = multipart;

            using (var client = new SmtpClient())
            {
                // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
                client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                client.Connect("smtp.gmail.com", 465, true);

                // Note: only needed if the SMTP server requires authentication
                client.Authenticate("noreply.festispec@gmail.com", "Festispec11**");

                client.Send(message);
                client.Disconnect(true);
            }

            return true;
        }
    }
}