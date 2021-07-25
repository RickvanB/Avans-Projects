interface IName {
    formatted: string;
    familyName: string;
    givenName: string;
}

interface IAccounts {
    username: string;
    userId: string;
}

export interface IProfile {
    nickname: string;
    emails: string[];
    id: string;
    name: IName;
    tags: string[];
    accounts: IAccounts;
    organizations: string;
    title: string;
    cardnumber: string;
    phoneNumbers: string[];
    location: string;
    employee: string;
    student: string;
    token: string;
    tokenSecret: string;
}
