import ButtonView from "./buttonView";

export default class weatherChange {

    constructor() {
        this.otherWeather = new ButtonView("new-weather", "Kies een nieuwe weer locatie", "button", "Kies een nieuwe weer locatie", false);
        this.otherWeather.input.className = "btn btn-warning createButton";

        this.deleteCustomWeather = new ButtonView("delete-weather", "X", "button", "X", false);
        this.deleteCustomWeather.input.className = "btn btn-warning createButton";
        this.deleteCustomWeather.input.addEventListener("click", function() {
            localStorage.removeItem("cityID");
            alert("Custom locatie is verwijderd");
            location.reload();
        });

        if (document.querySelector("#new-weather") == null && document.querySelector("delete-weather") == null) {
            document.querySelector("#new-weather-div").appendChild(this.otherWeather.element);
            document.querySelector("#new-weather-div").appendChild(this.deleteCustomWeather.element);
        }

    }

}