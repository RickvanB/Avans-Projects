import Region from "../js/Controller/region";
import EditMonsterController from "../js/Controller/editMonsterController";
import CreateMonsterController from "../js/Controller/createMonsterController";

class IndexController {

    constructor() {
        const edit = new EditMonsterController();
        const create = new CreateMonsterController();
        const region = new Region();
    }
}

const indexC = new IndexController();