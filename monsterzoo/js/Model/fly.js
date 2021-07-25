export default class AbleToFly {

    /**
     * Return the correct scr string
     * @param {String} canFly 
     */
    canFlySrc(canFly) {
        let src = "";

        switch (canFly) {
            case "Ja":
                src = "/images/fly/canfly.png";
                break;
            case "Nee":
                src = "/images/fly/cantfly.png";
                break;
        }

        return src;
    }
}