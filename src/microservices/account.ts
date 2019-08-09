import Axios, { AxiosPromise } from 'axios';
import BaseService from './base-service';
import { User, Login, VerifyLogin } from '../models/account';
import { IResetAccount, IReset} from '../models/interfaces';

export class AccountService extends BaseService{
    constructor() {
        super();
    }

    register(data: User): AxiosPromise {

        if(data.email && data.firstname && data.lastname
            && data.password && data.type && data.username) {
                data.email = this.encrpyt(data.email);
                data.firstname = this.encrpyt(data.firstname);
                data.lastname = this.encrpyt(data.lastname);
                data.password = this.encrpyt(data.password);
                data.type = this.encrpyt(data.type);
                data.username = this.encrpyt(data.username);
        }

        return Axios.post(this.accountRegisterEndpoint, data, {headers: this.header});
    }

    login(data: Login): AxiosPromise {

        if(data.username && data.password) {
            data.password = this.encrpyt(data.password);
            data.username = this.encrpyt(data.username);
        }
    
        return Axios.post(this.accountLoginEndpoint, data, {headers: this.header});
    }

    verify(data: VerifyLogin): AxiosPromise {

        if(data.username && data.password && data.token) {
            data.username = this.encrpyt(data.username);
            data.password = this.encrpyt(data.password);
        }

        return Axios.post(this.accountVerifyEndpoint, data, {headers: this.header});
    }

    resetUser(data: IReset): AxiosPromise {
        
        if(data.username && data.password && data.email && data.token) {
            data.username = this.encrpyt(data.username);
            data.password = this.encrpyt(data.password);
            data.email = this.encrpyt(data.email);
        } 

        return Axios.post(this.accountResetEndpoint, data, {headers: this.header});
    }

    resetRequest(data: IResetAccount): AxiosPromise {
        
        if(data) {
            data.email = this.encrpyt(data.email);
        }

        return Axios.post(this.accountResetRequestEndpoint, data, {headers: this.header});
    }
}

export default new AccountService();