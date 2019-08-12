import Cookie from './cookie';
import { IUser } from '@/models/interfaces';
import AccountService from '@/microservices/account';
import { cryptor } from './cryptor';

export default class Dash extends cryptor {
    public user?: IUser;
    private CookieManager: Cookie;

    constructor() {
        super();
        this.CookieManager = new Cookie();
        this.CookieManager.findCookie('tyler-cmt');
        this.findUser();
    } 

    public today = (): string => {
        const _date = new Date();
        return _date.toDateString();
    }

    public fullname = (): string => {
        console.debug('fullname')
        if(this.user) 
            return `${this.user.firstName} ${this.user.lastName}`
        else 
            return 'no-user';
    }


    private findUser = () => {

        if(this.CookieManager.decryptedValue) {
            console.debug('find called');
            AccountService.findUser(this.CookieManager.decryptedValue)
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

                }
                
                console.debug('user', this.user);
            })
            .catch((err) => {
                console.debug(err.message);
            });

        }
    }
}

