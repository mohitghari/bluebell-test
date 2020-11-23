export class User {
    id: string;
    photo:string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: number;
    gender: string;
    // permission: Array<{
    //     label: string,
    //     value: boolean
    // }>;
    service: Services[];
}

export class Services {
    //session: string;
    problem: string;
    method: string;
}