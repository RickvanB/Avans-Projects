export interface PokemonWrapper {
    count:                      number;
    next:                       string;
    previous:                   string;
    results:                    Pokemon[];
}



export interface Pokemon {
    id:                       number;
    name:                     string;
    base_experience:          number;
    height:                   number;
    is_default:               boolean;
    order:                    number;
    weight:                   number;
    abilities:                Ability[];
    forms:                    Species[];
    game_indices:             GameIndex[];
    held_items:               HeldItem[];
    location_area_encounters: LocationAreaEncounter[];
    moves:                    Move[];
    species:                  Species;
    sprites:                  Sprites;
    stats:                    Stat[];
    types:                    Type[];
    url:                      string;
}

export interface Ability {
    is_hidden: boolean;
    slot:      number;
    ability:   Species;
}

export interface Species {
    name: string;
    url:  string;
}

export interface GameIndex {
    game_index: number;
    version:    Species;
}

export interface HeldItem {
    item:            Species;
    version_details: HeldItemVersionDetail[];
}

export interface HeldItemVersionDetail {
    rarity:  number;
    version: Species;
}

export interface LocationAreaEncounter {
    location_area:   Species;
    version_details: LocationAreaEncounterVersionDetail[];
}

export interface LocationAreaEncounterVersionDetail {
    max_chance:        number;
    encounter_details: EncounterDetail[];
    version:           Species;
}

export interface EncounterDetail {
    min_level:        number;
    max_level:        number;
    condition_values: Species[];
    chance:           number;
    method:           Species;
}

export interface Move {
    move:                  Species;
    version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
    level_learned_at:  number;
    version_group:     Species;
    move_learn_method: Species;
}

export interface Sprites {
    back_female:        string;
    back_shiny_female:  string;
    back_default:       string;
    front_female:       string;
    front_shiny_female: string;
    back_shiny:         string;
    front_default:      string;
    front_shiny:        string;
}

export interface Stat {
    base_stat: number;
    effort:    number;
    stat:      Species;
}

export interface Type {
    slot: number;
    type: Species;
}
