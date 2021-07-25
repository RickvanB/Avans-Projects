import DropDown from "./dropdown";

export default class AddBodyParts {

    constructor() {
        // Create elements
        this.arms = new DropDown("armAmount", "arm", "Aantal Armen");
        this.armtype = new DropDown("armType", "armType", "Type Armen");
        this.legs = new DropDown("legAmount", "leg", "Aantal Benen");
        this.eyes = new DropDown("eyeAmount", "eye", "Aantal Ogen");
        this.skinType = new DropDown("skinType", "skin", "Vachttype", true);
        this.canFly = new DropDown("canFly", "fly", "Kan Vliegen", true);
        this.canSwim = new DropDown("canSwim", "swim", "Kan Zwemmen", true);
        this.color = new DropDown("color", "color", "Kleur");
        this.strength = new DropDown("strength", "strength", "Kracht");
    }
}