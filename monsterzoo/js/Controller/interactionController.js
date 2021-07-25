export default class InteractionController {

    /**
     * Let nearby monsters react on the new placed monster
     * @param {String} placedMonsterId 
     */
    checkEnvironement(placedMonsterId) {
        const location = JSON.parse(localStorage.getItem("selectedRegion"));
        const selectedGrid = JSON.parse(localStorage.getItem(location));

        // Safety Check
        if (selectedGrid == null) {
            return;
        }

        for (let i = 0; i < selectedGrid.length; i++) {
            for (let j = 0; j < selectedGrid.length; j++) {

                if (localStorage.getItem(selectedGrid[i].Columns[j]) != null) {
                    const monsterFromStorage = JSON.parse(localStorage.getItem(selectedGrid[i].Columns[j]));

                    // Check if it is not the placed monster that is selected
                    if (monsterFromStorage.id != placedMonsterId) {
                        // Interact
                        this.monsterReact(monsterFromStorage);
                    }

                }
            }
        }

    }

    /**
     * React by changing image!
     * @param {Monster} monsterFromStorage 
     */
    monsterReact(monsterFromStorage) {
        const image = document.getElementById(monsterFromStorage.id);

        switch (monsterFromStorage.type) {
            case "Water":
                image.src = "/images/monsters/water_react.png";
                break;
            case "Vuur":
                image.src = "/images/monsters/vuur_react.png";
                break;
            case "Aarde":
                image.src = "/images/monsters/aarde_react.png";
                break;
            case "Wind":
                image.src = "/images/monsters/wind_react.png";
                break;
        }
    }
}