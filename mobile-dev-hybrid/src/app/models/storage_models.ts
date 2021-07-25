export interface Pokemon {
    id:                      number;
    name:                    string;
    lat:                     number;
    long:                    number;
    imageUrl:                string;
}

export interface Player {
    id:                      number;
    name:                    string;
    password:                string,
    pokemonCatches:          PokemonCatch[]       
}

export interface PokemonCatch {
    pokemonId:               number;
    lat:                     number;
    long:                    number;
    catchDate:               Date;
    pokemon:                 Pokemon;
    position:                number;
}