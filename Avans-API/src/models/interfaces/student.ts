/**
 * @tsoaModel
 */
export interface Student {
    //Generated
    id: number;
    name: string;
    lastname: string;
    avansId: string;
    cv?: string;
    aboutMe?: string;
}

export interface StudentPatchRequest{
    majorId: number;
}

export interface StudentProfilePatchRequest{
    aboutMe: string;
}

export interface StudentCVPatchRequest{
    cv?: string;
}
