export default class RegionModel {

    constructor(name, weatherId, grid) {
        this.name = name;
        this.weatherId = weatherId;
        this.grid = grid;
    }

    getGridTemplate() {
        return this.grid.getGrid();
    }
}