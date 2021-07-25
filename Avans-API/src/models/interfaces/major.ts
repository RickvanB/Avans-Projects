/**
 * @tsoaModel
 */
export interface Major {
    //Generated
    id?: number; //POST never has an ID
    name: string;
    maxEnrollmentsPerCompany?: number;
    shortName: string;
    educationCode: string;
    archived: boolean;
}

export interface MajorPutPost {
    //Generated
    name: string;
    maxEnrollmentsPerCompany?: number;
    shortName: string;
    educationCode: string;
    archived: boolean;
}

export interface MajorsPatch {
    majorIds: number[];
    add: boolean;
}

export interface TableMajorsPut {
    majorIds: number[];
}

