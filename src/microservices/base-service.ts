import Config from '../config/config.json';
import Crypto from 'crypto-js';
import { ENV } from '../models/model-enums';
import { IEndpoint, IMicroService } from '../models/interfaces';

export default class BaseService {
    protected header: { "Accept": string; "Content-Type": string; "enctype": string; "x_access_token": string; };
    private isProd: boolean;

    private account: IMicroService;
    private accountBaseUrl: string;
    protected accountUserEndpoint: string;
    protected accountRegisterEndpoint: string;
    protected accountVerifyEndpoint: string;
    protected accountLoginEndpoint: string;

    private mailer: IMicroService;
    private mailerBaseUrl: string;
    protected mailerNoteEndpoint: string;
    protected mailerRegisterEndpoint: string;
    protected mailerResetEndpoint: string;

    constructor() {
        this.isProd = process.env.NODE_ENV === ENV.PROD;
        this.account = <IMicroService>Config.microservices.find(x => x.name === 'account');
        this.mailer = <IMicroService>Config.microservices.find(x => x.name === 'mailer');
        this.header = Config.header;
        
        this.accountBaseUrl = `${this.account.scheme}://${this.account.baseEndpoint}:${this.account.port}`;
        const _accountUser = <IEndpoint>this.account.endpoints.find(x => x.name === 'user');
        const _accountRegister = <IEndpoint>this.account.endpoints.find(x => x.name === 'register');
        const _accountVerify = <IEndpoint>this.account.endpoints.find(x => x.name === 'verify');
        const _accountLogin = <IEndpoint>this.account.endpoints.find(x => x.name === 'login');
        
        this.accountUserEndpoint = `${this.accountBaseUrl}/${_accountUser.endpoint}`;
        this.accountRegisterEndpoint = `${this.accountBaseUrl}/${_accountRegister.endpoint}`;
        this.accountVerifyEndpoint = `${this.accountBaseUrl}/${_accountVerify.endpoint}`;
        this.accountLoginEndpoint = `${this.accountBaseUrl}/${_accountLogin.endpoint}`;
        
        this.mailerBaseUrl = `${this.mailer.scheme}://${this.mailer.baseEndpoint}:${this.mailer.port}`;
        const _mailerNote = <IEndpoint>this.mailer.endpoints.find(x => x.name === 'note');
        const _mailerRegister = <IEndpoint>this.mailer.endpoints.find(x => x.name === 'register');
        const _mailerReset = <IEndpoint>this.mailer.endpoints.find(x => x.name === 'reset');

        this.mailerNoteEndpoint = `${this.mailerBaseUrl}/${_mailerNote.endpoint}`;
        this.mailerRegisterEndpoint = `${this.mailerBaseUrl}/${_mailerRegister.endpoint}`;
        this.mailerResetEndpoint = `${this.mailerBaseUrl}/${_mailerReset.endpoint}`;

    }

    protected encrypt = (data: string): string => {
        const _data = Crypto.AES.encrypt(data, Config.secret);
        return this.isProd ? _data.toString() : data;
    }

    protected decrypt = (data: string): string => {
        const _data = Crypto.AES.decrypt(data, Config.secret);
        const _plainText = _data.toString(Crypto.enc.Utf8);
        return this.isProd ? _plainText : data;
    }

}