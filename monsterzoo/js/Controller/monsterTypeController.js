import SkinType from "../Model/skinType";
import AbleToFly from "../Model/fly";
import AbleToSwim from "../Model/swim";

export default class TypeController {

    constructor(bodyParts) {
        const skinType = new SkinType();
        const ableToFly = new AbleToFly();
        const ableToSwim = new AbleToSwim();

        // Add Event listners
        bodyParts.skinType.addClickListener(function() {
            bodyParts.skinType.imgWindow.src = skinType.skinTypeSrc(bodyParts.skinType.select.options[bodyParts.skinType.select.selectedIndex].value);
        });

        bodyParts.canFly.addClickListener(function() {
            bodyParts.canFly.imgWindow.src = ableToFly.canFlySrc(bodyParts.canFly.select.options[bodyParts.canFly.select.selectedIndex].value);
        });

        bodyParts.canSwim.addClickListener(function() {
            bodyParts.canSwim.imgWindow.src = ableToSwim.canSwimSrc(bodyParts.canSwim.select.options[bodyParts.canSwim.select.selectedIndex].value);
        });

        // Initial State
        bodyParts.skinType.imgWindow.src = skinType.skinTypeSrc(bodyParts.skinType.select.options[bodyParts.skinType.select.selectedIndex].value);
        bodyParts.canFly.imgWindow.src = ableToFly.canFlySrc(bodyParts.canFly.select.options[bodyParts.canFly.select.selectedIndex].value);
        bodyParts.canSwim.imgWindow.src = ableToSwim.canSwimSrc(bodyParts.canSwim.select.options[bodyParts.canSwim.select.selectedIndex].value);

    }
}