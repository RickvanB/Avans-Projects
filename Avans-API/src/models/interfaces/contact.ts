/**
 * @tsoaModel
 */
export interface Contact {
    //Generated
    id?: number;
    department?: string;
    name?: string;
    insertion?: string;
    lastname?: string;
    emailaddress: string; //Als Mark iemand uitnodigd, is alleen e-mail benodigd.
    mainContact?: boolean;
    receiveNewsletter?: boolean;
    phone?: string;
    phoneAlternative?: string;
    password?: string;
    internshipContact?: boolean;
}

export interface ContactPutPost{
    department?: string;
    name?: string;
    insertion?: string;
    lastname?: string;
    emailaddress: string; //Als Mark iemand uitnodigd, is alleen e-mail benodigd.
    mainContact?: boolean;
    receiveNewsletter?: boolean;
    phone?: string;
    phoneAlternative?: string;
    password?: string;
    internshipContact?: boolean;
}