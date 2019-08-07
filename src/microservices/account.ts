import Axios, { AxiosPromise } from 'axios';
import BaseService from './base-service';
import { User, Login, VerifyLogin } from '../models/account';

export class AccountService extends BaseService{
    constructor() {
        super();
    }

    register(data: User): AxiosPromise {

        if(data.email && data.firstname && data.lastname
            && data.password && data.type && data.username) {
                data.email = this.encryptIV(data.email);
                data.firstname = this.encryptIV(data.firstname);
                data.lastname = this.encryptIV(data.lastname);
                data.password = this.encryptIV(data.password);
                data.type = this.encryptIV(data.type);
                data.username = this.encryptIV(data.username);
        }

        return Axios.post(this.accountRegisterEndpoint, data, {headers: this.header});
    }

    login(data: Login): AxiosPromise {

        if(data.username && data.password) {
            data.password = this.encryptIV(data.password);
            data.username = this.encryptIV(data.username);
        }
    
        return Axios.post(this.accountLoginEndpoint, data, {headers: this.header});
    }

    verify(data: VerifyLogin): AxiosPromise {

        if(data.username && data.password && data.token) {
            data.username = this.encryptIV(data.username);
            data.password = this.encryptIV(data.password);
        }

        return Axios.post(this.accountVerifyEndpoint, data, {headers: this.header});
    }
}

export default new AccountService();