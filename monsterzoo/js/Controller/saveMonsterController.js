export default class SaveMonsterController {

    /**
     * Save a new or existing monster to the Localstorage with an unique id
     * @param {Object} bodyParts 
     * @param {Monster} model 
     */
    saveMonster(bodyParts, model) {
        // Set Model Values
        model.armAmount = bodyParts.arms.select.options[bodyParts.arms.select.selectedIndex].value;
        model.armType = bodyParts.armtype.select.options[bodyParts.armtype.select.selectedIndex].value;
        model.legAmount = bodyParts.legs.select.options[bodyParts.legs.select.selectedIndex].value;
        model.eyeAmount = bodyParts.eyes.select.options[bodyParts.eyes.select.selectedIndex].value;
        model.skinType = bodyParts.skinType.select.options[bodyParts.skinType.select.selectedIndex].value;
        model.canFly = bodyParts.canFly.select.options[bodyParts.canFly.select.selectedIndex].value;
        model.canSwim = bodyParts.canSwim.select.options[bodyParts.canSwim.select.selectedIndex].value;
        model.color = bodyParts.color.select.options[bodyParts.color.select.selectedIndex].value;
        model.strength = bodyParts.strength.select.options[bodyParts.strength.select.selectedIndex].value;
        model.setStrength();

        // Save model: 
        // Check if exisist otherwhise create
        let models = [model];

        if (model.id == null) {
            model.id = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
        }

        localStorage.setItem(model.id, JSON.stringify(model));

    }
}