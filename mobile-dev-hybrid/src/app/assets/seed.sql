CREATE TABLE IF NOT EXISTS pokemon (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(45) NOT NULL UNIQUE,
    lat FLOAT,
    long FLOAT,
    imageUrl VARCHAR(100)
)

CREATE TABLE IF NOT EXISTS player (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(45)
)

CREATE TABLE IF NOT EXISTS playerPokemon (
    FOREIGN KEY(pokemonId) REFERENCES pokemon(id),
    FOREIGN KEY(playerId) REFERENCES player(id),
    lat VARCHAR(45),
    long VARCHAR(45),
    catchDate DATETIME
)