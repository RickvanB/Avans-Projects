import { Round } from './round';


/**
 * @tsoaModel
 */
export interface Timeslot {
    id?: number;
    shareCv?: boolean;
    enabled?: boolean;
    table?: number;
    round?: Round;
}

export interface TimeslotPutPost {
    shareCv: boolean;
    enabled: boolean;
}

export interface TimeslotPatchRequest {
    enroll: boolean;
}
