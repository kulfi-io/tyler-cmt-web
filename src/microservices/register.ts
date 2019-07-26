import BaseService from './base-service';
import user from '@/models/user';
import Axios, {AxiosPromise} from 'axios';

export class RegisterService extends BaseService{
    constructor() {
        super();
    }

    add(data: user): AxiosPromise {
        if(data.email && data.firstName && data.lastName
            && data.password && data.type && data.username) {
                data.email = this.encrypt(data.email);
                data.firstName = this.encrypt(data.firstName);
                data.lastName = this.encrypt(data.lastName);
                data.password = this.encrypt(data.password);
                data.type = this.encrypt(data.type);
                data.username = this.encrypt(data.username)
        }

        return Axios.post(this.registerEndpoint, data, {headers: this.header});
    }
}