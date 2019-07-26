import Config from '../config/config.json';
import Crypto from 'crypto-js';

export default class BaseService {
    protected baseUrl: string;
    protected accountBaseUrl: string;
    protected header: { "Accept": string; "Content-Type": string; "enctype": string; "x_access_token": string; };
    protected config: { "scheme": string; "baseEndpoint": string; "accountBase": number; "mailerBase": number; "token": string; "userEndpoint": string; "loginEndpoint": string; "verifyEndpoint": string; "registerEndpoint": string; "secret": string; };
    protected registerEndpoint: string;
    constructor() {
        this.config = Config.microservice;
        this.header = Config.header;
        this.baseUrl = `${this.config.scheme}://${this.config.baseEndpoint}`;
        this.accountBaseUrl = `${this.baseUrl}:${this.config.accountBase}`;
        this.registerEndpoint = `${this.accountBaseUrl}${this.config.userEndpoint}`;
    }

    protected encrypt = (data: string): string => {
        const _data = Crypto.AES.encrypt(data, this.config.secret);
        return _data.toString();
    }

    protected decrypt = (data: string): string => {
        const _data = Crypto.AES.decrypt(data, this.config.secret);
        const _plainText = _data.toString(Crypto.enc.Utf8);
        return _plainText;
    }

}