export default class Monster {

    constructor() {
        this.id = null;
        this.type = "Water"
        this.armAmount = 0;
        this.armType;
        this.legAmount = 0;
        this.eyeAmount = 0;
        this.skinType;
        this.canFly = false;
        this.canSwim = false;
        this.color;
        this.name;
        this.specialPower;
        this.strength;
        this.weatherStrength;
    }

    /**
     * This method will set the special power of a monster
     */
    setStrength() {

        // Null check
        if (strength == null) {
            strength = 0;
        }


        switch (this.type) {


            case "Water":
                if (this.strength >= 5 && this.strength <= 7) {
                    this.specialPower = "Waterspugen";
                } else {
                    this.specialPower = null;
                }
                break;

            case "Vuur":
                if (this.strength >= 8 && this.strength <= 10) {
                    this.specialPower = "Vuur Regen";
                } else {
                    this.specialPower = null;
                }
                break;

            case "Aarde":
                if (this.strength == 7) {
                    this.specialPower = "Aarde Verplaatsen";
                } else {
                    this.specialPower = null;
                }
                break;

            case "Wind":
                if (this.strength > 5 && this.strength < 7) {
                    this.specialPower = "Tornado's Afvuren";
                } else {
                    this.specialPower = null;
                }
                break;
        }
    }

    /**
     * Return possible strengths depeding on type
     */
    getStrengths() {
        let strengths;

        switch (this.type) {
            case "Water":
                strengths = ["1", "2", "3", "4", "5", "6", "7", "8"];
                break;

            case "Vuur":
                strengths = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
                break;

            case "Aarde":
                strengths = ["1", "2", "3", "4", "5", "6", "7"];
                break;

            case "Wind":
                strengths = ["1", "2", "3", "4", "5", "6", "7", "8"];
                break;
        }

        return strengths;
    }

    /**
     * Return all monster types
     */
    getMonsterTypes() {
        return ["Water", "Vuur", "Aarde", "Wind"];
    }

    /**
     * This function will return an array with correct arm types depending on monster type
     * 
     */
    getArmTypes() {

        let arm_array;

        switch (this.type) {
            case "Water":
                arm_array = ["Tentakels", "Vinnen"];
                break;

            case "Vuur":
                arm_array = ["Tentakels", "Klauwen", "Klauw-vleugels"];
                break;

            case "Aarde":
                arm_array = ["Klauwen"];
                break;

            case "Wind":
                arm_array = ["Vleugels", "Klauw-vleugels"];
                break;
        }

        return arm_array;
    }

    /**
     * This method will return the can fly data depending on the monster kind
     */
    getCanFly() {

        let canFly;

        switch (this.type) {
            case "Water":
                canFly = ["Nee"];
                break;

            case "Vuur":
                if (this.skinType == "Veren") {
                    canFly = ["Ja"];
                } else {
                    canFly = ["Nee"];
                }

                break;

            case "Aarde":
                canFly = ["Nee"];
                break;

            case "Wind":
                canFly = ["Ja"];
                break;
        }

        return canFly;
    }

    /**
     * This method will return the can swim data depending on the monster kind
     */
    getCanSwim() {

        let canSwim;

        switch (this.type) {
            case "Water":
                canSwim = ["Ja"];
                break;

            case "Vuur":
                canSwim = ["Nee"];
                break;

            case "Aarde":
                canSwim = ["Nee"];
                break;

            case "Wind":
                if (this.skinType == "Schubben") {
                    canSwim = ["Ja"];
                } else {
                    canSwim = ["Nee"];
                }
                break;
        }

        return canSwim;
    }


    /**
     * This function will return an array with correct skin types depending on monster type
     * 
     */
    getSkinType() {

        let skin_array;

        switch (this.type) {
            case "Water":
                skin_array = ["Schubben", "Slijm"];
                break;

            case "Vuur":
                skin_array = ["Schubben", "Veren"];
                break;

            case "Aarde":
                skin_array = ["Haar", "Schubben", "Slijm"];
                break;

            case "Wind":
                skin_array = ["Veren", "Haar", "Schubben"];
                break;
        }

        return skin_array;
    }

    /**
     * Return the possible colors of the monster depending on the choosen monster kind
     *
     */
    getColors() {

        let color_array;

        switch (this.type) {
            case "Water":
                color_array = ["Blauw", "Rood", "Groen"];
                break;

            case "Vuur":
                color_array = ["Rood", "Oranje", "Bruin"];
                break;

            case "Aarde":
                color_array = ["Paars", "Oranje", "Wit"];
                break;

            case "Wind":
                color_array = ["Wit", "Blauw", "Paars"];
                break;
        }

        return color_array;
    }

    /**
     * Return the correct amount of arms
     *
     */
    getAmountOfArms() {

        let armAmount_array;

        switch (this.type) {
            case "Water":
                armAmount_array = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
                break;

            case "Vuur":
                armAmount_array = ["0", "1", "2", "3", "4", "5", "6"];
                break;

            case "Aarde":
                armAmount_array = ["2"];
                break;

            case "Wind":
                armAmount_array = ["2"];
                break;
        }

        return armAmount_array;
    }

    /**
     * Return the correct amount of eyes
     * 
     */
    getAmountOfEyes() {

        let eyesAmount_array;

        switch (this.type) {
            case "Water":
                eyesAmount_array = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
                break;

            case "Vuur":
                eyesAmount_array = ["0", "1", "2", "3", "4"];
                break;

            case "Aarde":
                eyesAmount_array = ["2"];
                break;

            case "Wind":
                eyesAmount_array = ["2"];
                break;
        }

        return eyesAmount_array;
    }

    /**
     * Return the correct amount of legs
     *
     */
    getAmountOfLegs() {

        let eyesAmount_array;

        switch (this.type) {
            case "Water":
                if (this.armAmount <= 4) {
                    eyesAmount_array = ["0", "1", "2", "3", "4"];
                } else {
                    eyesAmount_array = ["Geen Benen"];
                }

                break;

            case "Vuur":
                if (this.armAmount <= 2) {
                    eyesAmount_array = ["2"];
                } else {
                    eyesAmount_array = ["Geen Benen"];
                }
                break;

            case "Aarde":
                eyesAmount_array = ["2", "4", "6"];
                break;

            case "Wind":
                eyesAmount_array = ["0", "2"];
                break;
        }

        return eyesAmount_array;
    }
}