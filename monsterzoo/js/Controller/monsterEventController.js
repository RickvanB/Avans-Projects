import EditMonsterController from "./editMonsterController";
import MonsterStatisticController from "./monsterStatisticController";

export default class MonsterEventController {

    /**
     * This method will add action listners to the monsters
     * @param {String} id 
     * @param {Object} element 
     */
    setEventListeners(id, element) {
        const editController = new EditMonsterController();
        const statisticController = new MonsterStatisticController();

        element.addEventListener("click", function() {

            // Reset background
            const grid = document.getElementById("table-grid");
            for (var i = 0, row; row = grid.rows[i]; i++) {
                for (var j = 0, col; col = row.cells[j]; j++) {
                    col.style.backgroundImage = "none";
                    col.style.backgroundColor = "#009933";
                }
            }

            // React on click
            const monsterInGrid = document.getElementById(id);
            // Safety check
            if (monsterInGrid != null) {
                monsterInGrid.parentNode.style.backgroundImage = "url('/images/vonkjes.gif')";
            }

            // Display edit area 
            document.getElementById("editZone").style.visibility = "visible";

            // Display edit button
            document.getElementById("editMonsterButton").addEventListener("click", function() {
                document.getElementById("editZone").style.visibility = "hidden";
                monsterInGrid.parentNode.style.backgroundImage = "none";
                editController.editMonster(id);
            })

        });

        element.addEventListener("mouseover", function() {
            statisticController.showMonsterValues(id);
        });

        element.addEventListener("mouseleave", function() {
            statisticController.removeStatistic();
        });

    }
}