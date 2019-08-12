import Cookie from './cookie';
import { IUser, ICookieUser } from '@/models/interfaces';
import AccountService from '@/microservices/account';
import { cryptor } from './cryptor';

export default class Dash extends cryptor {
    public user?: IUser;
    private _cookieManager: Cookie;
    private _value?: ICookieUser;
    private _cookieName: string;

    constructor() {
        super();
        this._cookieName = 'tyler-cmt';
        this._cookieManager = new Cookie();
        this._cookieManager.findCookie(this._cookieName);
        this.userAccessRedirect();
        this.findUser();
    } 

    private userAccessRedirect = () => {
        if(!this._cookieManager.value) {
           window.location.href = `${window.location.protocol}//${window.location.host}/#login`;
        } else {
            this._value = this._cookieManager.decryptedValue;
        }
    }

    public get today(): string {
        const _date = new Date();
        return _date.toDateString();
    }

    public get fullname(): string | undefined  {
        if(this._value) 
            return this.decrypt(this._value.fullname);
        else 
           this.userAccessRedirect();
    }

    private findUser = () => {

        if(this._value) {
            AccountService.findUser(this._value)
            .then((user) => {
                this.user = user.data;
                if(user.data && this.user) {

                    this.user.active = this.decrypt(user.data.active) === 'true' ? true : false;
                    this.user.email = this.decrypt(user.data.email);
                    this.user.firstName = this.decrypt(user.data.firstName);
                    this.user.lastName = this.decrypt(user.data.lastName);
                    this.user.username =  this.decrypt(user.data.username);
                    this.user.userType.display = this.decrypt(user.data.userType.display);
                    this.user.userType.description = this.decrypt(user.data.userType.description);

                } else {
                    this._cookieManager.deleteCookie();
                    this.userAccessRedirect();
                }
                
                if(this._value)
                    this._cookieManager.setCookie(this._cookieName, this._value);

            })
            .catch((err) => {
                console.debug(err.message);
            });
        }
    }
}

