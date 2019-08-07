import Config from '../config/config.json';
import Crypto from 'crypto';
import { ICookie, IDuration } from '../models/interfaces';

export class Cookie {
    public name: string;
    public expires: IDuration;
    private config: ICookie
    private algorithm: string;
    private cipher: Crypto.Cipher;
    private decipher: Crypto.Decipher;
    private value: Object;

    constructor(name: string, value: Object) {

        this.algorithm = 'aes-256-gcm';
      
        this.cipher = Crypto.createCipher(this.algorithm, Config.secret);
        this.decipher = Crypto.createDecipher(this.algorithm, Config.secret);

        this.config = Config.cookie
        this.name = name;
        this.value = this.encrypt(value);
        this.expires = {
            name: 'sec',
            value: '20sec'
        };
        this.initDuration();
    }

    private initDuration = () => {
        const _selected = this.config.expiration.selected;
        const _expires = this.config.expiration.duration
                        .find((x:IDuration) => x.name === _selected);

        if(_expires) this.expires = _expires;

    }

    public get cookieValue() {
        return this.value;
    }

    protected encrypt = (data: Object): string => {
        var crypted = this.cipher.update(data.toString(),'utf8','hex')
        crypted += this.cipher.final('hex');
        return crypted; 
    }

    public get decryptedValue() {
        var decrypted = this.decipher.update(this.value.toString(), 'hex', 'utf8');
        return decrypted;
    }
}

export default Cookie;
