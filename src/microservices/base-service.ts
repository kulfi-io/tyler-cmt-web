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
    protected accountResetEndpoint: string;

    private mailer: IMicroService;
    private mailerBaseUrl: string;
    protected mailerNoteEndpoint: string;
    protected mailerRegisterEndpoint: string;
    protected mailerResetRequestEndpoint: string;
    private algorithm: string;

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

        // CRYPTO
        this.algorithm = 'aes192';

    }

    protected encrpyt = (data: string) : string => {

        const cipher = crypto.createCipher(this.algorithm, Config.secret);

        let encrypted = '';
        cipher.on('readable', () => {
        const data = cipher.read();
        if (data)
            encrypted += data.toString('hex');
        });
        cipher.on('end', () => {
            console.log(encrypted);
            // Prints: ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504
        });

        cipher.write(data);
        cipher.end();

        return encrypted;
    }

    protected decrypt = (data: string): string => {
        const decipher = crypto.createDecipher(this.algorithm, Config.secret);

        let decrypted = '';
        decipher.on('readable', () => {
        const data = decipher.read();
        if (data)
            decrypted += data.toString('utf8');
        });
        decipher.on('end', () => {
            console.log(decrypted);
            // Prints: some clear text data
        });

        decipher.write(data, 'hex');
        decipher.end();

        return decrypted;
    }

}