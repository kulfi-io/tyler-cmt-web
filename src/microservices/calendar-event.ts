import Axios, { AxiosPromise } from 'axios';
import BaseService from './base-service';
import { IEndpoint} from '../models/interfaces';

export class CalendarEventService extends BaseService{

    private eventEndpoint: string;

    
    constructor() {
        super();
        const _event = <IEndpoint>this.event.endpoints
            .find(x => x.name === 'events');
        
        this.eventEndpoint = `${this.eventBaseUrl}/${_event.endpoint}`;

    }

    events(): AxiosPromise {
        return Axios.get(this.eventEndpoint);
    }
}

export default new CalendarEventService();