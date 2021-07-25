export default class ButtonView {

    constructor(id, name, type, value, noCol = true) {
        // Set up element
        this.element = document.createElement("div");
        this.input = document.createElement("input");
        this.inputcontainer = document.createElement("div");

        // Add components
        this.inputcontainer.appendChild(this.input);
        this.element.appendChild(this.inputcontainer);

        this.input.value = value;

        // Add classes
        this.element.className = "form-group";
        this.input.className = "form-control input-md";

        if (noCol) {
            this.inputcontainer.className = "col-md-7";
        } else {
            this.inputcontainer.className = "col-md-12";
        }


        // Setting Types
        this.input.name = name;
        this.input.id = id;
        this.input.type = type;
    }

    addEvent(type, action) {
        this.input.addEventListener(type, action);
    }
}