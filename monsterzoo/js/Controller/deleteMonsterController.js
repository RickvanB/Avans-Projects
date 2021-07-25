export default class DeleteMonsterController {

    /**
     * This method will remove a monster from locale storage
     * @param {String} id 
     */
    deleteMonster(id) {

        // Check if item exsits
        if (localStorage.getItem(id) != null) {
            localStorage.removeItem(id);

            let monster = document.getElementById(id);

            // Adjust grid
            // Save new location in local storage
            const location = JSON.parse(localStorage.getItem("selectedRegion"));
            const selectedGrid = JSON.parse(localStorage.getItem(location));

            // Set previous location back to the old state
            const xPos = monster.parentNode.id.split("/")[1].split("-")[1];
            const yPos = monster.parentNode.id.split("/")[1].split("-")[0];
            // Set back to previous value.
            selectedGrid[yPos].Columns[xPos] = "0";

            // Save location of selected grid
            localStorage.setItem(location, JSON.stringify(selectedGrid));

            // Remove monster from screen
            monster.parentNode.removeChild(monster);

        }
    }
}