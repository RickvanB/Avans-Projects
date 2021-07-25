export enum CompanyStatus {
    INVITED = 0,
    REGISTERED = 1,
    PARTICIPATING = 2,
    ARCHIVED = 3
}

/**
 * @tsoaModel
 */
export interface Company {
    //Generated Checked
    id?: number;
    name: string;
    description?: string;
    logoPath?: string;
    address?: string;
    city?: string;
    zipcode?: string;
    country?: string;
    website?: string;
    status?: CompanyStatus;
    tables?: number;
}


export interface CompanyPutPost{
    //Generated Checked
    name: string;
    description?: string;
    logoPath?: string;
    address?: string;
    city?: string;
    zipcode?: string;
    country?: string;
    website?: string;
    status?: CompanyStatus;
    tables?: number;
}

export interface CompanyBannerPatchRequest{
    //Generated Checked
    banner?: string;
}