import MonsterStrengthController from "./monsterStrengthController";
import EditMonsterController from "./editMonsterController";
import InteractionController from "./interactionController";
import MonsterStatisticController from "./monsterStatisticController";

export default class DragAndDrop {

    /**
     * 
     */
    constructor(regionController) {
        const strengthController = new MonsterStrengthController();
        const editController = new EditMonsterController();
        const statisticController = new MonsterStatisticController();
        const interactionController = new InteractionController();
        let previousLocation;


        document.addEventListener("dragstart", function(event) {

            if (event.target.id != "blockImage") {
                event.dataTransfer.setData("Text", event.target.id);

                // Save previous location
                if (event.target != null) {
                    previousLocation = event.target.parentNode.id.split("/")[1];
                }

                return;
            }

        });

        document.addEventListener("dragover", function(event) {
            event.preventDefault();
        });

        document.addEventListener("drop", function(event) {
            event.preventDefault();

            let data = event.dataTransfer.getData("Text");
            const monster = document.getElementById(data);

            if (monster != null) {

                if (event.target.id == "blockImage") {
                    alert("Je kunt hier geen monster plaatsen");
                }

                if (event.target.id.split("/")[0] == "0" && event.target.id != "blockImage") {

                    if (event.target.className == "droptarget") {
                        event.target.appendChild(monster);

                        // Save new location in local storage
                        const location = JSON.parse(localStorage.getItem("selectedRegion"));
                        const selectedGrid = JSON.parse(localStorage.getItem(location));

                        // Set Strength
                        switch (location) {
                            case "Jungle":
                                strengthController.refreshPowers(3664525);
                                break;
                            case "IcePole":
                                strengthController.refreshPowers(3424607);
                                break;
                            case "Sjahari":
                                strengthController.refreshPowers(2432678);
                                break;
                        }

                        // Get located cell
                        let xPos = event.target.id.split("/")[1].split("-")[1];
                        let yPos = event.target.id.split("/")[1].split("-")[0];
                        selectedGrid[yPos].Columns[xPos] = data + "";

                        // Set previous location back to the old state
                        if (previousLocation != null) {
                            xPos = previousLocation.split("-")[1];
                            yPos = previousLocation.split("-")[0];
                            // Set back to previous value.
                            selectedGrid[yPos].Columns[xPos] = "0";
                        }

                        localStorage.setItem(location, JSON.stringify(selectedGrid));

                        // Reload Grid
                        regionController.createRegion(location);

                        // Check if monsters in the same grid needs to react.
                        interactionController.checkEnvironement(data);
                    }
                }
            }
        });
    }
}