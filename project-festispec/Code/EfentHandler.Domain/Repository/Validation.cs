using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using EfentHandler.Domain.Model;

namespace EfentHandler.Domain.Repository
{
    public class Validation
    {
        private bool StringEmptyCheck(string check)
        {
            if (check == null || check == "")
                return true;

            return false;
        }

        private bool IntEmptyOrZeroCheck(int check)
        {
            if (check.Equals(null) || check == 0)
                return true;

            return false;
        }

        private bool HasSpecialCharacters(string check)
        {
            if (StringEmptyCheck(check))
                return false;

            if (new Regex("[!#$%^*(){}|<>]").IsMatch(check))
                return true;

            return false;
        }

        public string ClientId(int check)
        {
            if (IntEmptyOrZeroCheck(check))
                return "Klant is verplicht";

            return null;
        }

        public string Email(string check, int userId, string addition)
        {
            if (StringEmptyCheck(check))
                return "E-mailadres is verplicht" + (addition != null ? " (" + addition + ")" : "");

            if (HasSpecialCharacters(check))
                return "E-mailadres bevat ongeldige speciale tekens" + (addition != null ? " (" + addition + ")" : "");

            if (check.Length > 50)
                return "E-mailadres mag niet langer zijn dan 50 karakters" + (addition != null ? " (" + addition + ")" : "");

            if (userId != 0)
            {
                using (var db = new EfentHandlerEntities())
                {
                    if (db.user.Where(u => u.UserId != userId).Any(o => o.Email == check))
                        return "Het opgegeven e-mailadres bestaat al in de database" + (addition != null ? " (" + addition + ")" : "");
                }
            }

            return null;
        }

        public string Password(string check)
        {
            if (StringEmptyCheck(check))
                return "Wachtwoord is verplicht";

            return null;
        }

        public string CompanyName(string check)
        {
            if (StringEmptyCheck(check))
                return "Bedrijfsnaam is verplicht";

            if (HasSpecialCharacters(check))
                return "Bedrijfsnaam bevat ongeldige speciale tekens";

            if (check.Length > 50)
                return "Bedrijfsnaam mag niet langer zijn dan 50 karakters";

            return null;
        }

        public string FirstName(string check, string addition)
        {
            if (StringEmptyCheck(check))
                return "Voornaam is verplicht" + (addition != null ? " (" + addition + ")" : "");

            if (HasSpecialCharacters(check))
                return "Voornaam bevat ongeldige speciale tekens" + (addition != null ? " (" + addition + ")" : "");

            if (check.Length > 50)
                return "Voornaam mag niet langer zijn dan 50 karakters" + (addition != null ? " (" + addition + ")" : "");

            return null;
        }

        public string LastName(string check, string addition)
        {
            if (StringEmptyCheck(check))
                return "Achternaam is verplicht" + (addition != null ? " (" + addition + ")" : "");

            if (HasSpecialCharacters(check))
                return "Achternaam bevat ongeldige speciale tekens" + (addition != null ? " (" + addition + ")" : "");

            if (check.Length > 50)
                return "Achternaam mag niet langer zijn dan 50 karakters" + (addition != null ? " (" + addition + ")" : "");

            return null;
        }

        public string KvKNumber(int? check)
        {
            if (check.ToString().Length > 12)
                return "KvK-Nummer mag niet langer zijn dan 12 karakters";

            return null;
        }

        public string EstablishmentNumber(int? check)
        {
            if (check.ToString().Length > 12)
                return "Vestigingsnummer mag niet langer zijn dan 12 karakters";

            return null;
        }

        public string Street(string check)
        {
            if (StringEmptyCheck(check))
                return "Straatnaam is verplicht";

            if (HasSpecialCharacters(check))
                return "Straatnaam bevat ongeldige speciale tekens";

            if (check.Length > 50)
                return "Straatnaam mag niet langer zijn dan 50 karakters";

            return null;
        }

        public string ZipCode(string check)
        {
            if (StringEmptyCheck(check))
                return "Postcode is verplicht";

            if (!new Regex("^[1-9][0-9]{3}(?!sa|sd|ss)(?:[A-Z]{2})$").IsMatch(check))
                return "Postcode moet voldoen aan 4 cijfers en 2 hoofdletters (bijv. 9999AA). Tevens mag het eerste cijfer geen 0 zijn en komen de lettercombinaties SA, SD en SS niet voor. Spaties zijn niet toegestaan!";

            return null;
        }

        public string City(string check)
        {
            if (StringEmptyCheck(check))
                return "Plaatsnaam is verplicht";

            if (HasSpecialCharacters(check))
                return "Plaatsnaam bevat ongeldige speciale tekens";

            if (check.Length > 50)
                return "Plaatsnaam mag niet langer zijn dan 50 karakters";

            return null;
        }

        public string HouseNumber(int check)
        {
            if (IntEmptyOrZeroCheck(check))
                return "Huisnummer is verplicht";

            return null;
        }

        public string HouseNumberAddition(string check)
        {
            if (check?.Length > 1)
                return "Toevoeging mag niet groter dan 1 karakter zijn";

            if (HasSpecialCharacters(check))
                return "Toevoeging bevat ongeldige speciale tekens";

            return null;
        }

        public string Phone(int check, string addition)
        {
            if (IntEmptyOrZeroCheck(check))
                return "Telefoonnummer is verplicht" + (addition != null ? " (" + addition + ")" : "");

            if (check.ToString().Length > 15)
                return "Telefoonnummer mag niet langer zijn dan 15 karakters" + (addition != null ? " (" + addition + ")" : "");

            return null;
        }

        public string Website(string check)
        {
            if (StringEmptyCheck(check))
                return "Website is verplicht";

            return null;
        }

        public string ServiceDate(DateTime? check)
        {
            if (check == null)
                return "Dienstdatum is verplicht";

            return null;
        }

        public string Certification(bool certified, DateTime? endDate)
        {
            if (certified == false && endDate != null)
                return "Certificaat verloopdatum moet leeg zijn, omdat de persoon geen certificaat heeft.";

            if (certified == true && endDate == null)
                return "Certificaat verloopdatum moet gevuld zijn, want de persoon heeft een certificaat.";

            return null;
        }

        public string IBAN(string check)
        {
            if (StringEmptyCheck(check))
                return "IBAN is verplicht";

            if (HasSpecialCharacters(check))
                return "IBAN bevat ongeldige speciale tekens";

            if (check.Length > 18)
                return "IBAN mag niet langer zijn dan 18 karakters";

            return null;
        }

        public string EmployeeUserTypeId(int check)
        {
            if (check.Equals(null))
                return "Gebruikersrol is verplicht";

            if (check.Equals(0))
                return "Gebruikersrol is verplicht";

            if (check < 1 && check > 4)
                return "Gebruikersrol is geen medewerker";

            return null;
        }

        public string InspectorUserTypeId(int check)
        {
            if (check != 4)
                return "Gebruikersrol is geen inspecteur";

            return null;
        }

        public string Role(string check, string addition)
        {
            if (StringEmptyCheck(check))
                return "Rol is verplicht" + (addition != null ? " (" + addition + ")" : "");

            if (HasSpecialCharacters(check))
                return "Rol bevat ongeldige speciale tekens" + (addition != null ? " (" + addition + ")" : "");

            if (check.Length > 50)
                return "Rol mag niet langer zijn dan 50 karakters" + (addition != null ? " (" + addition + ")" : "");

            return null;
        }

        public string Description(string check, string addition)
        {
            if (StringEmptyCheck(check))
                return "Omschrijving is verplicht" + (addition != null ? " (" + addition + ")" : "");

            return null;
        }

        public string AssignmentDate(DateTime startDate, DateTime endDate)
        {
            if (startDate == null || endDate == null)
                return "Start- en einddatum zijn verplicht";

            if (endDate < startDate)
                return "Einddatum moet ná de startdatum liggen";

            return null;
        }
    }
}
