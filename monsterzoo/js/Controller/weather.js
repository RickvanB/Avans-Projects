import WeahterView from "../View/weahterView";
import weatherChange from "../View/weatherChange";

export default class Weather {

    constructor() {
        this.customWeatherView = new weatherChange();
        this.getCityIdForTestPurposes();
    }



    /**
     * Change the current weather situation for the assessment
     */
    getCityIdForTestPurposes() {
        let self = this;
        this.customWeatherView.otherWeather.input.addEventListener("click", function() {
            let newLocation = prompt("Kies een nieuwe weer locatie");
            if (newLocation != null) {
                let apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + newLocation + '&appid=b8fe30101914ff8e93ea11324a5abe86'

                let promise = fetch(apiUrl)
                    .then(response => response.json())
                    .then(function(response) {
                        localStorage.setItem("cityID", response.city.id);
                        self.getWeather(localStorage.getItem("cityID"));
                    }).catch(function(error) {
                        alert("Er is iets misgegaan, probeer het opnieuw");
                    });

                return promise;
            }
        });
    }


    /**
     * Return the current weather of a selected region
     * @param {id} cityId 
     */
    getWeather(cityId) {

        if (cityId == null) {
            return;
        }

        let apiUrl = 'http://api.openweathermap.org/data/2.5/weather?id=' + cityId + '&appid=b8fe30101914ff8e93ea11324a5abe86';

        let promise = fetch(apiUrl)
            .then(response => response.json())
            .then(function(response) {

                // Change displayed data
                const weatherView = new WeahterView();
                weatherView.setWeatherInfo(response);

                return response;
            });
        return promise;
    }
}