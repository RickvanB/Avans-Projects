export interface ApiResponse {
    status: string;
    message: string;
}

export class ApiError extends Error {
    public message: string;
    public status: number;
    constructor(name: string, status: number, message: string) {
        super();
        this.message = message;
        this.status = status;
        this.name = name;
    }
}
