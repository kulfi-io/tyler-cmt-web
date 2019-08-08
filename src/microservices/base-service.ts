import Config from '../config/config.json';
import crypto from 'crypto';
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
    protected accountResetRequestEndpoint: string;

    private mailer: IMicroService;
    private mailerBaseUrl: string;
    protected mailerNoteEndpoint: string;
    protected mailerRegisterEndpoint: string;
    protected mailerResetRequestEndpoint: string;
    private algorithm: string;
    private hashType: string;
    private hash: crypto.Hmac;
    private key: Buffer;
    private iv: Buffer;

    constructor() {
        
        this.header = Config.header;
        this.isProd = process.env.NODE_ENV === ENV.PROD;

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

        this.accountUserEndpoint = `${this.accountBaseUrl}/${_accountUser.endpoint}`;
        this.accountRegisterEndpoint = `${this.accountBaseUrl}/${_accountRegister.endpoint}`;
        this.accountVerifyEndpoint = `${this.accountBaseUrl}/${_accountVerify.endpoint}`;
        this.accountLoginEndpoint = `${this.accountBaseUrl}/${_accountLogin.endpoint}`;
        this.accountResetRequestEndpoint = `${this.accountBaseUrl}/${_accountResetRequest.endpoint}`;

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

        // CRYPTO
        this.hashType = 'sha512';
        this.algorithm = 'aes-256-gcm';
        this.hash = crypto.createHmac(this.hashType, Config.secret);
        this.key = this.hash.digest().slice(0, 32);
        this.iv = Buffer.alloc(16, 0);

    }

    protected encryptIV = (data: string) : string => {

        const _cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let _encrypted = _cipher.update(data, 'utf8', 'hex');
        let _final = _cipher.final('hex');

        return _encrypted;

        // return this.isProd ? _encrypted : data;

    }

    protected decryptIV = (data: string): string => {

        const _decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
        let _decrypted = _decipher.update(data, 'hex', 'utf8');

        return _decrypted;
        // return this.isProd ? _decrypted : data;

    }

}