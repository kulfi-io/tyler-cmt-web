import Axios, { AxiosPromise } from 'axios';
import BaseService from './base-service';
import {IUser,INote, IResetRequest} from '../models/interfaces';

export class MailerService extends BaseService{
    constructor() {
        super();
    }

    register(data: IUser): AxiosPromise {

        if(data.email && data.username && data.userId
            && data.token) {
                data.email = data.email;
                data.userId = data.userId;
                data.username = data.username;
                data.token = data.token;
        }

        return Axios.post(this.mailerRegisterEndpoint, data, {headers: this.header});
    }

    resetRequest(data: IResetRequest): AxiosPromise {
        return Axios.post(this.mailerResetRequestEndpoint, data, {headers: this.header})
    }

    sendNote(data: INote): AxiosPromise {
        
        if(data.email && data.firstname && data.lastname
            && data.content) {
            
            data.email = this.encrypt(data.email);
            data.firstname = this.encrypt(data.firstname);
            data.lastname = this.encrypt(data.lastname);
            data.content = this.encrypt(data.content);

        }

        return Axios.post(this.mailerNoteEndpoint, data, {headers: this.header});
    }

}

export default new MailerService();