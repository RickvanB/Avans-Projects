export default class DropDown {

    constructor(id, name, labelText, imgLink = false) {
        this.element = document.createElement("div");
        this.select = document.createElement("select");
        this.imgWindow = document.createElement("img");
        this.label = document.createElement("label");
        this.wrapper = document.createElement("div");

        this.label.innerHTML = labelText;

        // Set classes
        this.element.className = "form-group";
        this.label.className = "col-md-6 control-label";
        this.select.className = "form-control input-md";
        this.wrapper.className = "col-md-6";

        // Append Children
        this.wrapper.appendChild(this.select);
        this.element.appendChild(this.label);
        this.element.appendChild(this.wrapper);

        // Set side image
        if (imgLink) {
            this.wrapper.className = "row";
            this.imgWindow.className = "col- sideImg";
            this.select.className = "form-control input-md col selectorWithImg";
            this.wrapper.appendChild(this.imgWindow);
        }

        this.select.id = id;
        this.select.name = name;
    }

    /**
     * This method will add options to an option box
     * @param {Array} types 
     */
    setOptions(options) {

        while (this.select.firstChild) {
            this.select.removeChild(this.select.firstChild)
        }

        // Add all types to option box
        for (var i = 0; i < options.length; i++) {

            // Create option
            const option = document.createElement("option");

            // Set details
            option.value = options[i];
            option.innerHTML = options[i];

            this.select.appendChild(option);
        }

        if (options.length < 2) {
            this.select.disabled = true;
            this.select.style.background = "#cccccc";
        }
    }

    /**
     * Append options to dropdown
     * @param {Array} monsters 
     */
    setMonsterOptions(monsters) {
        while (this.select.firstChild) {
            this.select.removeChild(this.select.firstChild)
        }

        // Add all types to option box
        for (var i = 0; i < monsters.length; i++) {

            // Create option
            const option = document.createElement("option");

            // Set details
            option.value = monsters[i].id;
            option.innerHTML = monsters[i].name;

            this.select.appendChild(option);
        }

        if (monsters.length < 2) {
            this.select.disabled = true;
            this.select.style.background = "#cccccc";
        }
    }

    /**
     * Add event listner to the element
     * @param {Method} action 
     */
    addClickListener(action) {
        this.select.addEventListener("click", action);
    }

    /**
     * Find element in DropDown element
     * @param {String} toFind 
     */
    findElement(toFind) {

        for (let i = 0; i < this.select.options.length; i++) {
            if (this.select.options[i].value == toFind) {
                return true;
            }
        }

        return false;
    }
}