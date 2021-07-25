import Monster from "../Model/monster";
import MonsterForm from "../View/monsterForm";
import DropDown from "../View/dropdown";
import ButtonView from "../View/buttonView";
import MonsterTypeImage from "../View/monsterTypeImage";
import InputView from "../View/inputView";
import DeleteMonsterController from "./deleteMonsterController";
import PopUp from "../View/popUp";
import AddBodyParts from "../View/addBodyParts";
import SaveMonsterController from "./saveMonsterController";
import TypeController from "./monsterTypeController";
import ParseController from "./parseController";

export default class EditMonsterController {


    /**
     * Edit an existing monster on the board
     * @param {String} id 
     */
    editMonster(id) {

        // Check if form is not allready added to the screen
        if (document.querySelector('#monsterForm') != null) {
            const form = document.querySelector('#monsterForm');
            form.parentElement.removeChild(form);
        }

        // Get all monsters
        let monster = JSON.parse(localStorage.getItem(id));
        const monsterParser = new ParseController();
        let monsterParsed = monsterParser.parse(monster);

        // Elements
        const model = new Monster();
        const monsterForm = new MonsterForm("Monster aanpassen", "");
        const dropdownType = new DropDown("monsterType", "type", "Type");
        const submitButton = new ButtonView("submitButton", "submitbutton", "button", "Volgende Stap");
        const deleteButton = new ButtonView("deletebutton", "deletebutton", "button", "Verwijder Monster");
        const monsterTypeImg = new MonsterTypeImage();
        const monsterName = new InputView("monsterName", "Naam", "text", "Monster Naam");

        // Set options
        dropdownType.setOptions(model.getMonsterTypes());

        // Save id of earlier created monster
        model.id = id;

        // Set previous selected values
        dropdownType.select.value = monsterParsed.type;
        monsterName.input.value = monsterParsed.name;

        // Add elements to the form
        monsterForm.addElement(dropdownType.element);
        monsterForm.addElement(monsterName.element);
        monsterForm.addElement(submitButton.element);
        monsterForm.addElement(deleteButton.element);
        monsterForm.addSideImage(monsterTypeImg.element);

        // Activate event listner
        monsterTypeImg.addClickListner(dropdownType.element);


        // Styling
        monsterForm.element.className = "createPopUp";
        monsterForm.element.id = "monsterForm"

        document.body.appendChild(monsterForm.element);

        // Add listener for removing the monster
        deleteButton.input.addEventListener("click", function() {
            let deleteController = new DeleteMonsterController();
            // Remove monster from the board
            deleteController.deleteMonster(model.id);

            // Close view and send pop up
            const popUp = new PopUp("Het verwijderen van het monster is gelukt!", "Succes!", "saveMessage");
            document.body.removeChild(monsterForm.element);
            document.body.appendChild(popUp.mainWrapper);

            popUp.addEventListner(function() {
                document.body.removeChild(popUp.mainWrapper);
            });

        });

        submitButton.input.addEventListener("click", new function() {
            submitButton.addEvent("click", function() {

                // Validate Form
                if (monsterName.input.value == null || monsterName.input.value == "") {
                    monsterName.addHelpText("Voer een naam in van tenminste één teken");

                } else {
                    // Get fields
                    const type = document.querySelector('#monsterType');
                    const name = document.querySelector('#monsterName');

                    // Save values
                    model.type = type.options[type.selectedIndex].value;
                    model.name = name.value;

                    // Call next Step
                    monsterForm.removeAllElements();
                    monsterForm.removeSideImage(monsterTypeImg.element);
                    monsterForm.addBodyParts("Ledenmaten Wijzigen");

                    // Create elements
                    const bodyParts = new AddBodyParts();
                    const createMonster = new ButtonView("saveMonster", "saveMonster", "button", "Monster Opslaan");

                    // Add to array
                    const inputFields = [
                        bodyParts.arms, bodyParts.armtype, bodyParts.legs, bodyParts.eyes,
                        bodyParts.color, bodyParts.skinType, bodyParts.canFly, bodyParts.canSwim, bodyParts.strength
                    ];

                    let functions = ["Arms", "ArmType", "Legs", "Eyes", "Colors", "Skins", "CanFly", "CanSwim", "Strength"];

                    // Get functions
                    let getFunctions = {
                        ArmType: function() { return model.getArmTypes() },
                        Skins: function() { return model.getSkinType() },
                        Colors: function() { return model.getColors() },
                        Arms: function() { return model.getAmountOfArms() },
                        Eyes: function() { return model.getAmountOfEyes() },
                        Legs: function() { return model.getAmountOfLegs() },
                        CanFly: function() { return model.getCanFly() },
                        CanSwim: function() { return model.getCanSwim() },
                        Strength: function() { return model.getStrengths() }
                    };

                    // Load elements in form
                    for (let i = 0; i < inputFields.length; i++) {

                        // Get amount of the selected type
                        let types = getFunctions[functions[i]]();
                        inputFields[i].setOptions(types);

                        // Add element
                        if (i < 5)
                            monsterForm.addElement(inputFields[i].element);
                        else
                            monsterForm.addSecondColumElements(inputFields[i].element);
                    }

                    // Set Values
                    if (bodyParts.arms.findElement(monsterParsed.armAmount)) {
                        bodyParts.arms.select.value = monsterParsed.armAmount;
                    }

                    if (bodyParts.legs.findElement(monsterParsed.legAmount)) {
                        bodyParts.legs.select.value = monsterParsed.legAmount;
                    }

                    if (bodyParts.eyes.findElement(monsterParsed.eyeAmount)) {
                        bodyParts.eyes.select.value = monsterParsed.eyeAmount;
                    }

                    if (bodyParts.color.findElement(monsterParsed.color)) {
                        bodyParts.color.select.value = monsterParsed.color;
                    }

                    if (bodyParts.skinType.findElement(monsterParsed.skinType)) {
                        bodyParts.skinType.select.value = monsterParsed.skinType;
                    }

                    if (bodyParts.canFly.findElement(monsterParsed.canFly)) {
                        bodyParts.canFly.select.value = monsterParsed.canFly;
                    }

                    if (bodyParts.canSwim.findElement(monsterParsed.canSwim)) {
                        bodyParts.canSwim.select.value = monsterParsed.canSwim;
                    }

                    // Add save button to the form
                    monsterForm.addSecondColumElements(createMonster.element);

                    // Add some actionListners
                    bodyParts.arms.addClickListener(function() {
                        model.armAmount = bodyParts.arms.select.options[bodyParts.arms.select.selectedIndex].value;

                        bodyParts.legs.setOptions(model.getAmountOfLegs());
                    });

                    bodyParts.skinType.addClickListener(function() {
                        model.skinType = bodyParts.skinType.select.options[bodyParts.skinType.select.selectedIndex].value;
                        bodyParts.canFly.setOptions(model.getCanFly());
                        bodyParts.canSwim.setOptions(model.getCanSwim());
                    });

                    // This controller will take responsibility's for changing images
                    const typeController = new TypeController(bodyParts);

                    // This controller will take care of saving the monster
                    const saveMonsterController = new SaveMonsterController();

                    // Add submit listener
                    createMonster.input.addEventListener("click", new function() {
                        createMonster.addEvent("click", function() {

                            // Check if type has changed. If true then change the image
                            if (monsterParsed.type != model.type) {
                                const monsterImage = document.getElementById(monsterParsed.id);

                                // Safety check
                                if (monsterImage != null) {
                                    switch (model.type) {
                                        case "Water":
                                            monsterImage.src = "/images/monsters/water.png";
                                            break;
                                        case "Vuur":
                                            monsterImage.src = "/images/monsters/vuur.png";
                                            break;
                                        case "Aarde":
                                            monsterImage.src = "/images/monsters/aarde.png";
                                            break;
                                        case "Wind":
                                            monsterImage.src = "/images/monsters/wind.png";
                                            break;
                                    }
                                }
                            }

                            saveMonsterController.saveMonster(bodyParts, model);

                            // Close view and send pop up
                            const popUp = new PopUp("Het opslaan van het monster is gelukt!", "Succes!", "saveMessage");

                            document.body.removeChild(monsterForm.element);
                            document.body.appendChild(popUp.mainWrapper);

                            // Remove option 
                            popUp.addEventListner(function() {
                                document.body.removeChild(popUp.mainWrapper);
                            });
                        });
                    });
                }
            });
        });
    }
}