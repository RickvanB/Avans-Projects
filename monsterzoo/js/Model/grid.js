export default class Grid {

    constructor(name, climate, city) {
        this.name = name;
        this.climate = climate;
        this.reference_city = city;
        this.amountOfGrids = 2;
        this.setGrid(this.name);
    }

    getGrid() {
        if (localStorage.getItem(this.name) != null) {
            return JSON.parse(localStorage.getItem(this.name));
        }
        return this.grid;
    }

    getAmountOfGrids() {
        return this.amountOfGrids;
    }

    getClimate() {
        return this.climate;
    }

    getReferenceCity() {
        return this.reference_city;
    }

    setGrid() {
        switch (this.name) {
            case "Jungle":
                this.grid = [
                    { "name": "Row1", "Columns": ["1", "0", "0", "0", "1", "1", "0", "0", "0", "1"] },
                    { "name": "Row2", "Columns": ["1", "0", "0", "1", "0", "0", "1", "0", "0", "1"] },
                    { "name": "Row3", "Columns": ["1", "0", "1", "0", "0", "0", "0", "1", "0", "1"] },
                    { "name": "Row4", "Columns": ["1", "1", "0", "0", "0", "0", "0", "0", "1", "1"] },
                    { "name": "Row5", "Columns": ["1", "0", "0", "0", "0", "0", "0", "0", "0", "1"] },
                    { "name": "Row6", "Columns": ["1", "1", "0", "0", "0", "0", "0", "0", "0", "1"] },
                    { "name": "Row7", "Columns": ["1", "0", "1", "0", "0", "0", "0", "0", "0", "1"] },
                    { "name": "Row8", "Columns": ["1", "0", "0", "1", "0", "0", "0", "0", "0", "1"] },
                    { "name": "Row9", "Columns": ["1", "0", "0", "0", "1", "1", "0", "0", "0", "1"] },
                    { "name": "Row10", "Columns": ["1", "0", "0", "0", "1", "1", "0", "0", "0", "1"] }
                ];

                break;
            case "IcePole":
                this.grid = [
                    { "name": "Row1", "Columns": ["0", "0", "0", "0", "1", "1", "0", "0", "0", "1"] },
                    { "name": "Row2", "Columns": ["0", "0", "0", "1", "0", "0", "1", "0", "0", "1"] },
                    { "name": "Row3", "Columns": ["0", "0", "1", "0", "0", "0", "0", "0", "0", "1"] },
                    { "name": "Row4", "Columns": ["0", "0", "0", "0", "0", "0", "0", "0", "1", "1"] },
                    { "name": "Row5", "Columns": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "1"] },
                    { "name": "Row6", "Columns": ["1", "0", "0", "0", "0", "0", "0", "0", "0", "0"] },
                    { "name": "Row7", "Columns": ["1", "0", "0", "0", "0", "1", "0", "0", "0", "0"] },
                    { "name": "Row8", "Columns": ["1", "0", "0", "0", "0", "0", "0", "0", "0", "0"] },
                    { "name": "Row9", "Columns": ["1", "0", "0", "0", "1", "1", "0", "0", "0", "0"] },
                    { "name": "Row10", "Columns": ["1", "0", "0", "0", "1", "1", "0", "0", "0", "0"] }
                ];

                break;
            case "Sjahari":
                this.grid = [
                    { "name": "Row1", "Columns": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"] },
                    { "name": "Row2", "Columns": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"] },
                    { "name": "Row3", "Columns": ["0", "0", "0", "0", "0", "0", "0", "1", "0", "0"] },
                    { "name": "Row4", "Columns": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"] },
                    { "name": "Row5", "Columns": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"] },
                    { "name": "Row6", "Columns": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"] },
                    { "name": "Row7", "Columns": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"] },
                    { "name": "Row8", "Columns": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"] },
                    { "name": "Row9", "Columns": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"] },
                    { "name": "Row10", "Columns": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"] }
                ];

                break;
        }
    }

}