import Axios, { AxiosPromise } from 'axios';
import BaseService from './base-service';
import { IEndpoint, ICalEvent} from '../models/interfaces';

export class CalendarEventService extends BaseService{

    private eventsEndpoint: string;
    private eventEndpoint: string;

    constructor() {
        super();
        const _events = <IEndpoint>this.event.endpoints
            .find(x => x.name === 'events');
        
        const _event = <IEndpoint>this.event.endpoints
            .find(x => x.name === 'event');
        
        this.eventsEndpoint = `${this.eventBaseUrl}/${_events.endpoint}`;
        this.eventEndpoint = `${this.eventBaseUrl}/${_event.endpoint}`;

    }

    events(): AxiosPromise {
        return Axios.get(this.eventsEndpoint);
    }

    create(data: ICalEvent): AxiosPromise {

        data.end = this.encrypt(data.end);
        data.location = this.encrypt(data.location);
        data.start = this.encrypt(data.start);
        data.title = this.encrypt(data.title);
        data.email = this.encrypt(data.email);
        data.comment = data.comment ? this.encrypt(data.comment) : undefined;

        return Axios.post(this.eventEndpoint, data, { headers: this.header});
    }
}

export default new CalendarEventService();