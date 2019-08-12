import Config from '../config/config.json';
import { ICookie, IDuration, ICookieUser } from '../models/interfaces';
import { cryptor } from './cryptor';
import * as TinyCookie from 'tiny-cookie';

export class CookieManager extends cryptor{
    public name?: string;
    protected expires: IDuration;
    protected config: ICookie;
    public value?: Object;
    public decryptedValue?: ICookieUser;

    constructor() {
        super();
        this.config = Config.cookie

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

    public setCookie = (name: string, value: Object) => {
        this.name = name;
        this.value = this.encryptUserCookie(value);

        if(TinyCookie.isCookieEnabled && this.value)  {

            TinyCookie.setCookie(this.name
                , this.value.toString(), {expires: this.expires.value});
        }
    }

    public findCookie = (name: string) => {
        const _cookie = TinyCookie.getCookie(name);

        if(_cookie)  {
            this.name = name;
            this.value = <Object>_cookie;
            this.decryptedValue = this.decryptUserValue;
        }   
    }

    public deleteCookie = () => {
        if(this.name) {
            TinyCookie.remove(this.name);
            this.name = undefined;
            this.value = undefined;
        }
    }

    private get decryptUserValue(): ICookieUser | undefined {
        if(this.value) 
            return this.decryptUserCookie(this.value.toString());
    }
}

export default CookieManager;
