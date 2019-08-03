export class User {
    id?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    password?: string;
    username?: string;
    type?: string = 'basic';
    active?: boolean
}

export class Login {
    username?: string;
    password?: string;
}

export class ResetLogin {
    email?: string;
}

export class VerifyLogin {
    username?: string;
    password?: string;
    token?: string;
}