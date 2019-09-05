import Cookie from './cookie';
import { cryptor } from './cryptor';
import { ICookieUser, IUser } from '@/models/interfaces';

export class Helper extends cryptor {
    protected user?: IUser;
    protected _cookieManager: Cookie;
    protected _value?: ICookieUser;

    constructor() {
        super();
        this._cookieManager = new Cookie();
        this._cookieManager.findCookie();
        this.userAccessRedirect();
    }

    protected userAccessRedirect = () => {
        if (!this._cookieManager.value) {
            window.location.href = `${window.location.protocol}//${window.location.host}/#login`;
        } else {
            this._value = this._cookieManager.decryptedValue;
        }
    }
}

export default Helper;