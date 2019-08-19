import Config from '../config/config.json';
import { cryptor } from '@/library/cryptor';
import { IMicroService } from '../models/interfaces';

export default class BaseService extends cryptor {
    protected header: { "Accept": string; "Content-Type": string; "enctype": string; "x_access_token": string; };

    protected account: IMicroService;
    protected accountBaseUrl: string;

    protected mailer: IMicroService;
    protected mailerBaseUrl: string;

    protected event: IMicroService;
    protected eventBaseUrl: string;

    constructor() {
        super();
        this.header = Config.header;

        // API
        this.account = <IMicroService>Config.microservices.find(x => x.name === 'account');
        this.mailer = <IMicroService>Config.microservices.find(x => x.name === 'mailer');
        this.event = <IMicroService>Config.microservices.find(x => x.name === 'event');

        // ACCOUNT
        this.accountBaseUrl = `${this.account.scheme}://${this.account.baseEndpoint}:${this.account.port}`;

        // MAILER
        this.mailerBaseUrl = `${this.mailer.scheme}://${this.mailer.baseEndpoint}:${this.mailer.port}`;
        
        // EVENT
        this.eventBaseUrl = `${this.event.scheme}://${this.event.baseEndpoint}:${this.event.port}`;

    }
}