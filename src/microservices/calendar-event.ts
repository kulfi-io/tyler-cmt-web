import Axios, { AxiosPromise } from 'axios';
import BaseService from './base-service';
import { IEndpoint, ICalEvent, ICryptorCalEvent} from '../models/interfaces';

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

        let _data: ICryptorCalEvent | ICalEvent;

        if(this.isProd) {
            _data = {
                end: this.encryptIv(data.end),
                location: this.encryptIv(data.location),
                start: this.encryptIv(data.start),
                title: this.encryptIv(data.title),
                email: this.encryptIv(data.email),
                comment: data.comment ? this.encryptIv(data.comment) : undefined
            }
        } else {
            _data = data;
        }

        return Axios.post(this.eventEndpoint, _data, { headers: this.header});
    }

    delete(id: string): AxiosPromise {
        const _endpoint = `${this.eventEndpoint}/${id}`;

        return Axios.delete(_endpoint, { headers: this.header});
    }
}

export default new CalendarEventService();