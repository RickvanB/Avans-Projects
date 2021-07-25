import MonsterEventController from "../Controller/monsterEventController";

export default class GridView {
    constructor() {
        this.eventController = new MonsterEventController;
    }

    /**
     * This method will create a grid depending on the given grid and region name
     * @param {array} grid 
     */
    createGrid(grid, regionName) {

        // Remove region if allready placed
        if (document.getElementById("table-grid") != null) {
            document.body.removeChild(document.getElementById("table-grid"));
        }

        let body = document.body,
            tbl = document.createElement('table');
        tbl.id = 'table-grid';

        for (let i = 0; i < grid.length; i++) {
            let tr = tbl.insertRow();
            for (let j = 0; j < grid.length; j++) {

                let td = tr.insertCell();
                td.className = "droptarget";
                td.id = grid[i].Columns[j] + "/" + i + "-" + j;

                if (localStorage.getItem(grid[i].Columns[j]) != null) {
                    const monsterFromStorage = JSON.parse(localStorage.getItem(grid[i].Columns[j]));

                    // Add monster image of existing monster
                    let image = document.createElement('img');
                    image.id = monsterFromStorage.id;

                    switch (monsterFromStorage.type) {
                        case "Water":
                            image.src = "/images/monsters/water.png";
                            break;
                        case "Vuur":
                            image.src = "/images/monsters/vuur.png";
                            break;
                        case "Aarde":
                            image.src = "/images/monsters/aarde.png";
                            break;
                        case "Wind":
                            image.src = "/images/monsters/wind.png";
                            break;
                    }
                    // Add monster to grid
                    td.appendChild(image);

                    // Add event's
                    this.eventController.setEventListeners(image.id, image);

                } else {

                    if (grid[i].Columns[j] == "1") {
                        // Add monster image of existing monster
                        let image = document.createElement('img');
                        image.id = "blockImage" // Do not change

                        switch (regionName) {
                            case "Jungle":
                                image.src = "/images/tree.png";
                                break;
                            case "IcePole":
                                image.src = "/images/rock.png";
                                break;
                            case "Sjahari":
                                image.src = "/images/stoneRock.png";
                                break;
                            default:
                                image.src = "/images/tree.png";
                                break;
                        }

                        // Add monster to grid
                        td.appendChild(image);
                    }

                }

            }
        }

        body.appendChild(tbl);

    }

    /**
     * 
     */
    removeTable() {
        let removeTable = document.getElementById('table-grid');
        if (typeof(removeTable) != 'undefined' && removeTable != null) {
            document.body.removeChild(removeTable);
        }
    }

    /**
     * 
     * @param {object} monster 
     */
    appendMonster(monster) {
        let monsterDiv = document.getElementById('monsters');

        // Remove monster if area is not empty
        while (monsterDiv.hasChildNodes()) {
            localStorage.removeItem(monsterDiv.firstChild.id);
            monsterDiv.removeChild(monsterDiv.firstChild);
        }

        let image = document.createElement('img');
        image.id = monster.id;

        switch (monster.type) {
            case "Water":
                image.src = "/images/monsters/water.png";
                break;
            case "Vuur":
                image.src = "/images/monsters/vuur.png";
                break;
            case "Aarde":
                image.src = "/images/monsters/aarde.png";
                break;
            case "Wind":
                image.src = "/images/monsters/wind.png";
                break;
        }

        monsterDiv.appendChild(image);
    }
}