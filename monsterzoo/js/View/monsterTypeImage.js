export default class MonsterTypeImage {

    constructor() {

        this.element = document.createElement("div");
        this.img = document.createElement("img");

        // Set base value
        this.img.src = "/images/water.jpg";
        this.img.id = "kindImage";

        // Append child
        this.element.appendChild(this.img);

    }

    // Add event listner to element
    addEventListner(event, action) {
        this.img.addEventListener(event, action);
    }

    /**
     * Add click listner to the element
     */
    addClickListner(dropdown) {
        // Add event listner
        dropdown.addEventListener("click", function() {
            const dropdown = document.querySelector('#monsterType');
            const selectedvalue = dropdown.options[dropdown.selectedIndex].value;
            const imageObject = document.querySelector('#kindImage');

            switch (selectedvalue) {
                case "Water":
                    imageObject.src = "/images/water.jpg";
                    break;

                case "Vuur":
                    imageObject.src = "/images/vuur.jpg";
                    break;

                case "Aarde":
                    imageObject.src = "/images/aarde.jpg";
                    break;

                case "Wind":
                    imageObject.src = "/images/wind.jpg";
                    break;
            }
        })
    }

}