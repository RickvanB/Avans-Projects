export default class SkinType {
    /**
     * Return the correct scr string
     * @param {String} skinType 
     */
    skinTypeSrc(skinType) {

        let src = "";

        switch (skinType) {
            case "Schubben":
                src = "/images/skins/schubben.jpg";
                break;
            case "Haar":
                src = "/images/skins/haren.jpg";
                break;
            case "Slijm":
                src = "/images/skins/slijm.png";
                break;
            case "Veren":
                src = "/images/skins/veren.jpg";
                break;
        }

        return src;
    }
}