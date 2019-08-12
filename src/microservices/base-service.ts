import Config from '../config/config.json';
import { cryptor } from '@/library/cryptor';
import { IEndpoint, IMicroService } from '../models/interfaces';

export default class BaseService extends cryptor {
    protected header: { "Accept": string; "Content-Type": string; "enctype": string; "x_access_token": string; };

    private account: IMicroService;
    private accountBaseUrl: string;
    protected accountUserEndpoint: string;
    protected accountRegisterEndpoint: string;
    protected accountVerifyEndpoint: string;
    protected accountLoginEndpoint: string;
    protected accountResetRequestEndpoint: string;
    protected accountResetEndpoint: string;

    private mailer: IMicroService;
    private mailerBaseUrl: string;
    protected mailerNoteEndpoint: string;
    protected mailerRegisterEndpoint: string;
    protected mailerResetRequestEndpoint: string;

    constructor() {
        super();
        this.header = Config.header;

        // API
        this.account = <IMicroService>Config.microservices.find(x => x.name === 'account');
        this.mailer = <IMicroService>Config.microservices.find(x => x.name === 'mailer');
        
        // ACCOUNT
        this.accountBaseUrl = `${this.account.scheme}://${this.account.baseEndpoint}:${this.account.port}`;
        const _accountUser = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'user');
        const _accountRegister = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'register');
        const _accountVerify = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'verify');
        const _accountLogin = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'login');
        const _accountResetRequest = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'resetRequest');
        const _accountReset = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'reset');
        
        this.accountUserEndpoint = `${this.accountBaseUrl}/${_accountUser.endpoint}`;
        this.accountRegisterEndpoint = `${this.accountBaseUrl}/${_accountRegister.endpoint}`;
        this.accountVerifyEndpoint = `${this.accountBaseUrl}/${_accountVerify.endpoint}`;
        this.accountLoginEndpoint = `${this.accountBaseUrl}/${_accountLogin.endpoint}`;
        this.accountResetRequestEndpoint = `${this.accountBaseUrl}/${_accountResetRequest.endpoint}`;
        this.accountResetEndpoint = `${this.accountBaseUrl}/${_accountReset.endpoint}`;

        // MAILER
        this.mailerBaseUrl = `${this.mailer.scheme}://${this.mailer.baseEndpoint}:${this.mailer.port}`;
        const _mailerNote = <IEndpoint>this.mailer.endpoints
            .find(x => x.name === 'note');
        const _mailerRegister = <IEndpoint>this.mailer.endpoints
            .find(x => x.name === 'register');
        const _mailerResetRequest = <IEndpoint>this.mailer.endpoints
            .find(x => x.name === 'resetRequest');
        
        this.mailerNoteEndpoint = `${this.mailerBaseUrl}/${_mailerNote.endpoint}`;
        this.mailerRegisterEndpoint = `${this.mailerBaseUrl}/${_mailerRegister.endpoint}`;
        this.mailerResetRequestEndpoint = `${this.mailerBaseUrl}/${_mailerResetRequest.endpoint}`;
    }
}