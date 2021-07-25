export default class PopUp {
    constructor(message, title, id, object = null) {
        this.mainWrapper = document.createElement("div");
        const contentWrapper = document.createElement("div");
        const modalContent = document.createElement("div");
        const modalHeader = document.createElement("div");
        const modalTitle = document.createElement("h4");
        const modalBody = document.createElement("div");
        this.close = document.createElement("button");
        const closeLogo = document.createElement("span");
        const messages = document.createElement("p");

        // set styling
        if (object != null) {
            this.mainWrapper.className = "model  popUpPos-Side basicStyling";
        } else {
            this.mainWrapper.className = "model popUpPos basicStyling";
        }
        contentWrapper.className = "modal-dialog popUpBack";
        modalContent.className = "modal-content popUpBack popUpBorder";
        modalHeader.className = "modal-header popUpBack";
        modalTitle.className = "modal-title";
        this.close.className = "close closeColor";
        modalBody.className = "modal-body popUpBack";
        closeLogo.className = "closeColor";

        // Set ID etc
        this.mainWrapper.tabIndex = "-1";
        closeLogo.innerHTML = "&times;";
        messages.innerHTML = message;
        modalTitle.innerHTML = title;
        this.mainWrapper.id = id;


        // Construct Element
        this.close.appendChild(closeLogo);
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(this.close);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        contentWrapper.appendChild(modalContent);

        if (object == null) {
            modalBody.appendChild(messages);
        } else {
            modalBody.appendChild(object);
        }

        this.mainWrapper.appendChild(contentWrapper);
    }

    addEventListner(action) {
        this.close.addEventListener("click", action);
    }
}