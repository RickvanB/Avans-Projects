export default class InputView {
    constructor(id, name, type, label) {
        // Set up element
        this.element = document.createElement("div");
        this.input = document.createElement("input");
        this.label = document.createElement("label");
        this.inputcontainer = document.createElement("div");

        // Setting Types
        this.input.name = name;
        this.input.id = id;
        this.input.type = type;

        // Add components
        this.element.appendChild(this.label);
        this.inputcontainer.appendChild(this.input);
        this.element.appendChild(this.inputcontainer);

        // Set text
        this.label.innerHTML = label;

        // Add classes
        this.element.className = "form-group";
        this.label.className = "col-md-6 control-label";
        this.input.className = "form-control input-md";
        this.inputcontainer.className = "col-md-7";
    }

    addEvent(type, action) {
        this.input.addEventListener(type, action);
    }

    addHelpText(message) {

        // Only create new one if there is no other inserted earlier
        if (document.getElementById("nameHelp") == null) {
            this.help = document.createElement("span");
            this.help.id = "nameHelp";
            this.help.className = "help-block";
            this.inputcontainer.appendChild(this.help);
        }

        this.help.innerHTML = message;


    }
}