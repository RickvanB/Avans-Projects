export default class MonsterForm {

    constructor(formName, id) {
        this.element = document.createElement("div");
        this.row = document.createElement("div");
        this.form = document.createElement("form");
        this.legend = document.createElement("legend");
        this.fieldset = document.createElement("fieldset");
        this.secondRow = document.createElement("fieldset");
        this.displayWindow = document.createElement("div");

        // Classes
        this.element.className = "form-horizontal";
        this.secondRow.className = "form-background";

        this.legend.innerHTML = formName;
        this.element.id = id;

        // Append Childs
        this.fieldset.appendChild(this.legend);
        this.form.appendChild(this.fieldset);
        this.row.appendChild(this.form);
        this.element.appendChild(this.row);
        this.row.appendChild(this.secondRow);
    }

    /**
     * This element will add elements to the form
     * @param {FormInput} elementToAdd 
     */
    addElement(elementToAdd) {
        this.fieldset.appendChild(elementToAdd);
    }

    /**
     * Add elements in the second row of the form
     * @param {FormInput} elementToAdd 
     */
    addSecondColumElements(elementToAdd) {
        this.secondRow.className = "col-sm form-background topMargin";
        this.secondRow.appendChild(elementToAdd);
    }

    /**
     * This method will remove all form elements
     */
    removeAllElements() {

        while (this.fieldset.firstChild) {
            this.fieldset.removeChild(this.fieldset.firstChild);
        }
    }

    /**
     * Add side image to the form 
     * @param {div} element 
     */
    addSideImage(element) {

        this.element.className = "container";
        this.row.className = "row";
        this.form.className = "form-horizontal col-sm";
        element.className = "col-sm form-background";

        this.row.appendChild(element);
    }

    /**
     * Remove the side image
     * @param {Element} element 
     */
    removeSideImage(element) {
        this.row.removeChild(element);
    }

    /**
     * Adjust form title
     * @param {string} formTitle 
     */
    addBodyParts(formTitle) {
        // Set Form title
        this.fieldset.appendChild(this.legend);
        this.legend.innerHTML = formTitle;
    }

}