import Axios, { AxiosPromise } from 'axios';
import BaseService from './base-service';
import {
    ICookieUser,
    ILogin,
    IRegisterUser,
    IReset,
    IResetAccount,
    IVerifyLogin,
    IEndpoint,
    ICryptorRegisterUser,
    ICrytorLogin,
    ICryptorVerifyLogin,
    ICryptorReset,
    ICryptorResetAccount
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
        this.isProd = true;
    }

    register(data: IRegisterUser): AxiosPromise {
        
        let _data: ICryptorRegisterUser | IRegisterUser;

        if(this.isProd) {
            _data = {
                email : this.encryptIv(data.email),
                firstname: this.encryptIv(data.firstname),
                lastname: this.encryptIv(data.lastname),
                password: this.encryptIv(data.password),
                type: this.encryptIv(data.type),
                username: this.encryptIv(data.username)
            }
        } else {
            _data = data;
        }

        return Axios.post(this.registerEndpoint, _data, {headers: this.header});

    }

    login(data: ILogin): AxiosPromise {

        let _data: ICrytorLogin | ILogin;

        if(this.isProd) {
            _data = {
                username: this.encryptIv(data.username),
                password: this.encryptIv(data.password)
            }
        } else {
            _data = data;
        }

        return Axios.post(this.loginEndpoint, _data, {headers: this.header});
    
    }

    verify(data: IVerifyLogin): AxiosPromise {

        let _data: ICryptorVerifyLogin | IVerifyLogin;

        if(this.isProd) {
            _data = {
                username: this.encryptIv(data.username),
                password: this.encryptIv(data.password),
                token: data.token
            }
        }
        else {
            _data = data;
        }

        return Axios.post(this.verifyEndpoint, _data, {headers: this.header});
    }

    resetUser(data: IReset): AxiosPromise {

        let _data: ICryptorReset | IReset;
        
        if(this.isProd) {
            _data = {
                username: this.encryptIv(data.username),
                password: this.encryptIv(data.password),
                email: this.encryptIv(data.email),
                token: data.token
            }
        } else {
            _data = data;
        }

        return Axios.post(this.resetEndpoint, data, {headers: this.header});
    }

    resetRequest(data: IResetAccount): AxiosPromise {
        
        let _data: ICryptorResetAccount | IResetAccount; 

        if(this.isProd) {
            _data =  {
                email: this.encryptIv(data.email)
            }
        } else {
            _data = data;
        }

        return Axios.post(this.resetRequestEndpoint, _data, {headers: this.header});
    }

    findUser(data: ICookieUser): AxiosPromise {

        const _url = `${this.userEndpoint}/${data.id}`;
        return Axios.get(_url, {headers: this.header});
    }
}

export default new AccountService();