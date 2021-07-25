/**
 * @tsoaModel
 */
export interface Round {
    //Generated VALIDATED
    id?: number; //POST does not have ID
    timestart: string;
    timeend: string;
}

export interface RoundPutPost {
    timestart: string;
    timeend: string;
}