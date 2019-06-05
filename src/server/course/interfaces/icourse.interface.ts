export interface ICourse {
    id?: string;
    num?: number;
    name: string;
    description1?: string;
    description2?: string;
    description3?: string;
    starttime: Date;
    endtime: Date;
    color: number;
    createdAt?: Date;
    updatedAt?: Date;
}
