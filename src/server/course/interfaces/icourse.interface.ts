export interface ICourse {
    id?: string;
    no?: number;
    name: string;
    description1?: string;
    description2?: string;
    description3?: string;
    starttime: Date;
    endtime: Date;
    color: string;
    available: boolean;
    limit: number;
    createdAt?: Date;
    updatedAt?: Date;
}
