export interface IMicroService {
    name: string;
    scheme: string;
    baseEndpoint: string;
    port: number;
    token: string;
    endpoints: IEndpoint[];
}

export interface IEndpoint {
    name: string;
    endpoint: string;
}

export interface IUser {
    userId?: string;
    email?: string;
    username?: string;
    token?: string;
}

export interface INote {
    email?: string;
    firstname?: string;
    lastname?: string;
    content?: string;
}
