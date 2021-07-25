import DragAndDrop from "./draganddrop";
import GridView from "../View/gridView";
import MonsterStrengthController from "./monsterStrengthController";
import ButtonView from "../View/buttonView";
import Grid from "../Model/grid";

export default class Region {

    constructor() {
        this.dragdrop = new DragAndDrop(this);
        this.gridView = new GridView();

        const gridView = this.gridView;
        const element = this;
        const strengthController = new MonsterStrengthController();

        const region1 = new ButtonView("Jungle", "Jungle", "button", "Jungle", false);
        const region2 = new ButtonView("IcePole", "IcePole", "button", "IcePole", false);
        const region3 = new ButtonView("Sjahari", "Sjahari", "button", "Sjahari", false);

        // Set button colors TODO: To view!
        region1.input.className = "btn btn-warning selectedRegion";
        region2.input.className = "btn btn-warning";
        region3.input.className = "btn btn-warning";

        const regions = [region1, region2, region3];
        const regionsCodes = [3664525, 3424607, 2432678];
        const buttonRegion = document.getElementById("regionButtons");

        // Built Region
        element.createRegion(region1.input.value)
        strengthController.refreshPowers(regionsCodes[0]);
        // Save selected region to storage
        localStorage.setItem("selectedRegion", JSON.stringify(region1.input.value));

        for (let i = 0; i < regions.length; i++) {
            regions[i].input.addEventListener("click", function() {

                gridView.removeTable();
                element.createRegion(regions[i].input.value)
                strengthController.refreshPowers(regionsCodes[i]);

                // Save selected region to storage
                localStorage.setItem("selectedRegion", JSON.stringify(regions[i].input.value));

                // Set button colors
                for (let j = 0; j < regions.length; j++) {
                    if (regions[i] == regions[j]) {
                        regions[j].input.className = "btn btn-warning selectedRegion";
                    } else {
                        regions[j].input.className = "btn btn-warning";
                    }
                }

            })

            // Append Button
            buttonRegion.appendChild(regions[i].element);
        }
    }

    /**
     * Create a region and display it on the screen
     * @param {string} region 
     */
    createRegion(region) {

        if (region == null) {
            return alert('Geen region gevonden');
        }

        const jungle = new Grid("Jungle", "bear grylls approved temperature", "Rio");
        const icepole = new Grid("IcePole", "sub-zero cold", "Amsterdam");
        const sjahari = new Grid("Sjahari", "burning hot", "Marrakech");

        let haveFound = false;
        for (let i = 0; i < jungle.getAmountOfGrids(); i++) {
            if (haveFound) {
                break;
            }

            switch (region) {
                case "Jungle":
                    this.gridView.createGrid(jungle.getGrid(), region);
                    haveFound = true;

                    // Check if grid is saved before
                    if (localStorage.getItem(region) == null) {
                        // Save grid to local storage if not exists
                        localStorage.setItem(region, JSON.stringify(jungle.getGrid()));
                    }
                    break;
                case "IcePole":
                    this.gridView.createGrid(icepole.getGrid(), region);
                    haveFound = true;

                    // Check if grid is saved before
                    if (localStorage.getItem(region) == null) {
                        // Save grid to local storage if not exists
                        localStorage.setItem(region, JSON.stringify(icepole.getGrid()));
                    }
                    break;
                case "Sjahari":
                    this.gridView.createGrid(sjahari.getGrid(), region);
                    haveFound = true;

                    // Check if grid is saved before
                    if (localStorage.getItem(region) == null) {
                        // Save grid to local storage if not exists
                        localStorage.setItem(region, JSON.stringify(sjahari.getGrid()));
                    }
                    break;
            }


        }
    }
}