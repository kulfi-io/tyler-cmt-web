import Config from '../config/config.json';
import crypto from 'crypto';
import { ENV } from '@/models/model-enums';
import { ICookieUser } from '@/models/interfaces.js';

export class cryptor {
    private algorithm: string;
    private isProd: boolean;
   
    constructor() {
        this.algorithm = 'aes192';
        this.isProd = process.env.NODE_ENV === ENV.PROD;
    }

    protected encrypt = (data: Object): string => {

        let encrypted = '';
        const cipher = crypto.createCipher(this.algorithm, Config.secret);
        encrypted = cipher.update(data.toString(), 'utf8', 'hex');
        encrypted += cipher.final('hex');

        return encrypted;
        //return this.isProd ? encrypted : data.toString();
    }

    protected decrypt(data: Object): string  {

        let decrypted = '';
        const decipher = crypto.createDecipher(this.algorithm, Config.secret);
        decrypted = decipher.update(data.toString(), 'hex', 'utf8');
        decrypted += decipher.final().toString();
        
        return decrypted;

        // return this.isProd ? decrypted : data.toString();
    }

    protected encryptUserCookie(data: Object): string {
        const _jData = JSON.stringify(<ICookieUser>data);
        const _encrypted = this.encrypt(_jData);
        return _encrypted.toString();
    }

    protected decryptUserCookie(data: string):  ICookieUser{
        const _decrypted = JSON.parse(this.decrypt(data));
        return <ICookieUser>_decrypted;
    }


}