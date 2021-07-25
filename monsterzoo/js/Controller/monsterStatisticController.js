import Monster from "../Model/monster";
import MonsterStatistic from "../View/monsterStatistics";
import PopUp from "../View/popUp";
import ParseController from "./parseController";

export default class MonsterStatisticController {

    /**
     * This method will generate a statistic window
     * @param {String} id 
     */
    showMonsterValues(id) {

        //Only execute if pop up is not added to the parant yet
        if (document.getElementById(id + "-stat") != null) {
            return;
        }

        const statisticSection = document.getElementById("statistic");
        if (statisticSection != null) {
            if (statisticSection.firstChild != null) {
                statisticSection.removeChild(statisticSection.firstChild);
            }
        }

        // Get all monsters
        let monster = JSON.parse(localStorage.getItem(id));
        const monsterParser = new ParseController();
        let monsterParsed = monsterParser.parse(monster);

        const monsterStatstics = [
            "Type Monster: " + monsterParsed.type,
            "Naam: " + monsterParsed.name,
            "Aantal Armen: " + monsterParsed.armAmount,
            "Type Armen: " + monsterParsed.armType,
            "Aantal Benen: " + monsterParsed.legAmount,
            "Aantal Ogen: " + monsterParsed.eyeAmount,
            "Huid Type: " + monsterParsed.skinType,
            "Kleur: " + monsterParsed.color,
            "Kracht: " + monsterParsed.strength,
            "Kan Vliegen: " + monsterParsed.canFly,
            "Kan Zwemmen: " + monsterParsed.canSwim
        ];
        if (monsterParsed.specialPower != null) {
            monsterStatstics.push("Power: " + monsterParsed.specialPower);
        }

        if (monsterParsed.weatherStrength != null) {
            monsterStatstics.push("Extra Kracht: " + monsterParsed.weatherStrength);
        }

        // Create View Object
        const statisticView = new MonsterStatistic(monsterStatstics, monsterParsed.id + "-stat");

        // Get parant node of monster. 
        const popUp = new PopUp("Statistieken", "Statistieken", "monsterStatistics", statisticView.element);

        // document.body.appendChild(popUp.mainWrapper);
        document.getElementById("statistic").appendChild(popUp.mainWrapper);

        popUp.addEventListner(function() {
            document.getElementById("statistic").removeChild(popUp.mainWrapper);
        });
    }

    /**
     * Remove statistic view from side menu
     */
    removeStatistic() {
        const popUpElement = document.getElementById("monsterStatistics");
        document.getElementById("statistic").removeChild(popUpElement);
    }
}