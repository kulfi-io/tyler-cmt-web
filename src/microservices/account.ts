import Axios, { AxiosPromise } from 'axios';
import BaseService from './base-service';
import {
    ICookieUser,
    ILogin,
    IRegisterUser,
    IReset,
    IResetAccount,
    IVerifyLogin
    } from '../models/interfaces';

export class AccountService extends BaseService{
    constructor() {
        super();
    }

    register(data: IRegisterUser): AxiosPromise {
        
        if(data.email && data.firstname && data.lastname
            && data.password && data.type && data.username) {
                data.email = this.encrypt(data.email);
                data.firstname = this.encrypt(data.firstname);
                data.lastname = this.encrypt(data.lastname);
                data.password = this.encrypt(data.password);
                data.type = this.encrypt(data.type);
                data.username = this.encrypt(data.username);
                
                // data.email = this.crypter(data.email).;
        }

        return Axios.post(this.accountRegisterEndpoint, data, {headers: this.header});
    }

    login(data: ILogin): AxiosPromise {

        if(data.username && data.password) {
            data.password = this.encrypt(data.password);
            data.username = this.encrypt(data.username);
        }
    
        return Axios.post(this.accountLoginEndpoint, data, {headers: this.header});
    }

    verify(data: IVerifyLogin): AxiosPromise {

        if(data.username && data.password && data.token) {
            data.username = this.encrypt(data.username);
            data.password = this.encrypt(data.password);
        }

        return Axios.post(this.accountVerifyEndpoint, data, {headers: this.header});
    }

    resetUser(data: IReset): AxiosPromise {
        
        if(data.username && data.password && data.email && data.token) {
            data.username = this.encrypt(data.username);
            data.password = this.encrypt(data.password);
            data.email = this.encrypt(data.email);
        } 

        return Axios.post(this.accountResetEndpoint, data, {headers: this.header});
    }

    resetRequest(data: IResetAccount): AxiosPromise {
        
        if(data) {
            data.email = this.encrypt(data.email);
        }

        return Axios.post(this.accountResetRequestEndpoint, data, {headers: this.header});
    }

    findUser(data: ICookieUser): AxiosPromise {
        console.debug('cookieuser', data.id);

        const _url = `${this.accountUserEndpoint}/${data.id}`;
        return Axios.get(_url, {headers: this.header});
    }
}

export default new AccountService();