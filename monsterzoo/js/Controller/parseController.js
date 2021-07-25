import Monster from "../Model/monster";

export default class ParseController {

    /**
     * Parse monster form JSON to model
     * @param {JSON} monster 
     */
    parse(monster) {
        let monsterParsed = new Monster();

        // Parse JSON data
        if (monster != null) {
            monsterParsed.id = monster.id;
            monsterParsed.type = monster.type;
            monsterParsed.armAmount = monster.armAmount;
            monsterParsed.armType = monster.armType;
            monsterParsed.legAmount = monster.legAmount;
            monsterParsed.eyeAmount = monster.eyeAmount;
            monsterParsed.skinType = monster.skinType;
            monsterParsed.canFly = monster.canFly;
            monsterParsed.canSwim = monster.canSwim;
            monsterParsed.color = monster.color;
            monsterParsed.name = monster.name;
            monsterParsed.strength = monster.strength;
            monsterParsed.weatherStrength = monster.weatherStrength;
            monsterParsed.specialPower = monster.specialPower;
        }

        return monsterParsed;
    }
}