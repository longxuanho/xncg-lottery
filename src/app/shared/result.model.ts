export const currentResultsRef = '/lottery/results';    // Đường dẫn tới data trên firebase


export enum Prizes {
    GiaiNhat = 1,
    GiaiNhi = 2,
    GiaiBa = 3
}

export class Result {
    $key?: string;
    $exists?: () => boolean;
    prize: number;
    number: number;
}