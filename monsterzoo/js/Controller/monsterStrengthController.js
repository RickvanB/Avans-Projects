import Weather from "./weather";

export default class MonsterStrengthController {

    constructor() {
        this.wheather = new Weather();
    }

    /**
     * This method will refresh extra power of monsters. Example:
     * If it rains a water monster has 10% more power
     * @param {String} regionCode 
     */
    refreshPowers(regionCode) {
        const grid = document.getElementById("table-grid");

        if (grid == null) {
            return "Error - No Grid has been found";
        }

        if (localStorage.getItem("cityID") != null) {
            regionCode = localStorage.getItem("cityID");
        }

        // Get weather forcast from API
        let weatherForcast = this.wheather.getWeather(regionCode);

        // Get wheater forcast
        weatherForcast.then(weatherForcast => {

            // Abort mission
            if (weatherForcast == null || weatherForcast.cod != 200) {
                return;
            }

            for (var i = 0; i < grid.rows.length; i++) {
                for (var j = 0; j < grid.rows[i].cells.length; j++) {

                    if (grid.rows[i].cells[j].firstChild) {
                        const monsterElement = grid.rows[i].cells[j].firstChild;

                        const storedMonster = JSON.parse(localStorage.getItem(monsterElement.id));

                        // Check if there is found a monster in this cell
                        if (storedMonster != null) {
                            // If there is water monster and it's raining then add extra power
                            if (storedMonster.type == "Water" && weatherForcast.weather[0].main == "Rain") {
                                storedMonster.weatherStrength = "+10%";
                            } else if (storedMonster.type == "Vuur" && Math.round(((weatherForcast.main.temp - 273.15))) > 20) {
                                storedMonster.weatherStrength = "+20%";
                            } else if (storedMonster.type == "Wind" && weatherForcast.wind.speed > 0.40) {
                                storedMonster.weatherStrength = "+15%";
                            } else if (storedMonster.type == "Aarde" && weatherForcast.weather[0].main != "Rain") {
                                storedMonster.weatherStrength = "+5%";
                            } else {
                                storedMonster.weatherStrength = null;
                            }

                            // Save monster
                            localStorage.setItem(storedMonster.id, JSON.stringify(storedMonster));

                        }
                    }
                }
            }
        });
    }
}