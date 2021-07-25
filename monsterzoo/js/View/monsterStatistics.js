export default class MonsterStatistic {

    constructor(monsterStatisticArray, uniqueId) {
        this.element = document.createElement("section");

        // Set classes and id's
        this.element.className = "container statisticControl";
        this.element.id = uniqueId;

        // For each element in the statistic Array
        for (let i = 0; i < monsterStatisticArray.length; i++) {
            // Set elements
            const wrapper = document.createElement("div");
            const inputGroup = document.createElement("div");
            const fieldTitle = document.createElement("span");
            const content = document.createElement("span");

            // Set classes
            wrapper.className = "input-group mb-1 row marginFromborder"
            inputGroup.className = "input-group-prepend"
            fieldTitle.className = "input-group-text"
            content.className = "form-control";

            // Set text
            let textValue = monsterStatisticArray[i].split(":");

            content.innerText = textValue[1];
            fieldTitle.innerText = textValue[0];

            // Append Elements
            inputGroup.appendChild(fieldTitle);
            wrapper.appendChild(inputGroup);
            wrapper.appendChild(content);

            this.element.appendChild(wrapper);

        }
    }
}