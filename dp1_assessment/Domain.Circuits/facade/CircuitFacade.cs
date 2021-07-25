using System;

namespace Domain.Circuits.facade
{
    public class CircuitFacade
    {
        public Boolean IsEndOfLineOrWhiteSpace(char item)
        {
            return char.IsWhiteSpace(item) || item.Equals(';');
        }

        public Boolean EqualsCharacter(char compare, char value)
        {
            return value.Equals(':');
        }

        public Boolean ContainsCharacter(string compare, string value)
        {
            return value.Contains(compare);
        }

        public String RemoveWhiteSpace(string value)
        {
            return value.Replace(" ", string.Empty);
        }

        public String[] Split(char separator, string value)
        {
            return value.Split(separator);
        }

    }
}
