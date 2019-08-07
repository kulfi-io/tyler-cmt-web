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

export interface ICookie {
    secret: string;
    expiration: IExpiration;
}

export interface IExpiration {
    duration: IDuration[];
    selected: string;
}

export interface IDuration {
    name: string;
    value: string;
}

export interface IEncryptedData {
    iv: Buffer;
    data: string;
    tag: Buffer;
}

export interface IEncryptedLogin {
    username: IEncryptedData;
    password: IEncryptedData;
}
