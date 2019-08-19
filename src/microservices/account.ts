import Axios, { AxiosPromise } from 'axios';
import BaseService from './base-service';
import {
    ICookieUser,
    ILogin,
    IRegisterUser,
    IReset,
    IResetAccount,
    IVerifyLogin,
    IEndpoint
    } from '../models/interfaces';

export class AccountService extends BaseService{
    private userEndpoint: string;
    private registerEndpoint: string;
    private verifyEndpoint: string;
    private loginEndpoint: string;
    private resetRequestEndpoint: string;
    private resetEndpoint: string;

    constructor() {
        super();
        const _user = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'user');
        const _register = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'register');
        const _verify = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'verify');
        const _login = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'login');
        const _resetRequest = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'resetRequest');
        const _reset = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'reset');
        
        this.userEndpoint = `${this.accountBaseUrl}/${_user.endpoint}`;
        this.registerEndpoint = `${this.accountBaseUrl}/${_register.endpoint}`;
        this.verifyEndpoint = `${this.accountBaseUrl}/${_verify.endpoint}`;
        this.loginEndpoint = `${this.accountBaseUrl}/${_login.endpoint}`;
        this.resetRequestEndpoint = `${this.accountBaseUrl}/${_resetRequest.endpoint}`;
        this.resetEndpoint = `${this.accountBaseUrl}/${_reset.endpoint}`;
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
        }

        return Axios.post(this.registerEndpoint, data, {headers: this.header});
    }

    login(data: ILogin): AxiosPromise {

        if(data.username && data.password) {
            data.password = this.encrypt(data.password);
            data.username = this.encrypt(data.username);
        }
    
        return Axios.post(this.loginEndpoint, data, {headers: this.header});
    }

    verify(data: IVerifyLogin): AxiosPromise {

        if(data.username && data.password && data.token) {
            data.username = this.encrypt(data.username);
            data.password = this.encrypt(data.password);
        }

        return Axios.post(this.verifyEndpoint, data, {headers: this.header});
    }

    resetUser(data: IReset): AxiosPromise {
        
        if(data.username && data.password && data.email && data.token) {
            data.username = this.encrypt(data.username);
            data.password = this.encrypt(data.password);
            data.email = this.encrypt(data.email);
        } 

        return Axios.post(this.resetEndpoint, data, {headers: this.header});
    }

    resetRequest(data: IResetAccount): AxiosPromise {
        
        if(data) {
            data.email = this.encrypt(data.email);
        }

        return Axios.post(this.resetRequestEndpoint, data, {headers: this.header});
    }

    findUser(data: ICookieUser): AxiosPromise {

        const _url = `${this.userEndpoint}/${data.id}`;
        return Axios.get(_url, {headers: this.header});
    }
}

export default new AccountService();