import Monster from "../Model/monster";
import GridView from "../View/gridView";
import MonsterForm from "../View/monsterForm";
import ButtonView from "../View/buttonView";
import MonsterTypeImage from "../View/monsterTypeImage";
import InputView from "../View/inputView";
import TypeController from "./monsterTypeController";
import SaveMonsterController from "./saveMonsterController";
import DropDown from "../View/dropdown";
import AddBodyParts from "../View/addBodyParts";
import PopUp from "../View/popUp";

export default class CreateMonsterController {

    constructor() {

        // Set Actionlistner for "Create Monster" button.
        document.querySelector('#monsterCreate').addEventListener("click", function() {

            // Check if form is not allready added to the body.
            // If true remove it
            if (document.querySelector('#monsterForm') != null) {
                const form = document.querySelector('#monsterForm');
                form.parentElement.removeChild(form);
            }

            // Elements
            const model = new Monster();
            const gridView = new GridView();
            const monsterForm = new MonsterForm("Creeer nieuw monster", "");
            const dropdownType = new DropDown("monsterType", "type", "Type");
            const submitButton = new ButtonView("submitButton", "submitbutton", "button", "Volgende Stap");
            const close = new ButtonView("closebutton", "closebutton", "button", "X");
            const monsterTypeImg = new MonsterTypeImage();
            const monsterName = new InputView("monsterName", "Naam", "text", "Monster Naam");

            // Set options
            dropdownType.setOptions(model.getMonsterTypes());

            // Add elements to the form
            monsterForm.addElement(dropdownType.element);
            monsterForm.addElement(monsterName.element);
            monsterForm.addElement(submitButton.element);
            monsterForm.addSideImage(monsterTypeImg.element);

            // Activate event listner
            monsterTypeImg.addClickListner(dropdownType.element);

            // Styling
            monsterForm.element.className = "createPopUp";
            monsterForm.element.id = "monsterForm";
            close.input.className = "btn btn-danger closeButton";

            document.body.appendChild(monsterForm.element);

            // Set actionlistener for entering the second form in the creation process
            submitButton.input.addEventListener("click", function() {

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
                    monsterForm.addBodyParts("Ledenmaten toevoegen");

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

                    // Add save button to the form
                    monsterForm.addSecondColumElements(createMonster.element);

                    // Add some actionListners
                    bodyParts.arms.addClickListener(function() {
                        model.armAmount = bodyParts.arms.select.options[bodyParts.arms.select.selectedIndex].value;

                        bodyParts.legs.setOptions(model.getAmountOfLegs());
                    });

                    // Add actionlistners to skintype
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
                            saveMonsterController.saveMonster(bodyParts, model);

                            // Close view and send pop up
                            const popUp = new PopUp("Het opslaan van het monster is gelukt!", "Succes!", "saveMessage");

                            // Append new monster into html
                            let monster = JSON.parse(localStorage.getItem(model.id));
                            gridView.appendMonster(monster);

                            document.body.removeChild(monsterForm.element);
                            document.body.appendChild(popUp.mainWrapper);

                            // Eventlistner for closing the shown pop-up
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