/**
 * @tsoaModel
 */
export interface Speedmeet {
    id?: number;
    start: string;
    end: string;
    title: string;
    description: string;
    welcomeMessage: string;
    enrollmentStart: string;
    mapPath?: string;
    maxEnrollmentsPerStudent: number;
}

export interface SpeedmeetPutPost {
    start: string;
    end: string;
    title: string;
    description: string;
    welcomeMessage: string;
    enrollmentStart: string;
    mapPath?: string;
    maxEnrollmentsPerStudent: number;
}