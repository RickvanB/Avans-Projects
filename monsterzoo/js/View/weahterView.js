export default class WeahterView {

    /**
     * This method will display the data that is catch by the API
     * @param {API Response} response 
     */
    setWeatherInfo(response) {

        let weatherText = document.getElementById('current-weather');
        let weatherTitle = document.getElementById('weather-title');

        if (response == null || response.cod != 200) {
            weatherText.innerText = "Het is niet mogelijk om het actuele weer weer te geven";
            weatherTitle.innerText = "Error - " + response.cod;
            return;
        }

        let temperature = Math.round(((response.main.temp - 273.15)));


        let condition = "****";

        // Find condition
        switch (response.weather[0].main) {
            case "Rain":
                condition = "Regenachtig";
                break;
            case "Clouds":
                condition = "Bewolkt";
                break;
            case "Clear":
                condition = "Helder";
                break;
            case "Thunderstorm":
                condition = "Donder & Bliksem";
                break;
            case "Drizzle":
                condition = "Motregen";
                break;
            case "Snow":
                condition = "Sneeuw";
                break;
            case "Mist":
                condition = "Mistig";
                break;
            case "Dust":
                condition = "Stoffig";
                break;
            default:
                condition = "Stabiel!"
                break;
        }

        weatherText.innerText = "De temperatuur op dit moment is " + temperature + " graden" + " De weersconditie is: " + condition;
        weatherTitle.innerText = "Het weer in " + response.name;
    }
}