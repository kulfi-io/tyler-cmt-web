import AccountService from '@/microservices/account';
import { Helper } from './helper';

export default class Dash extends Helper {

    constructor() {
        super();
        this.findUser();
    }

    private setValues = () => {
        if (this.user) {
            const _greet = <HTMLElement>document.querySelector('.greet');
            const _today = <HTMLElement>document.querySelector('.today');
            const _first = <HTMLElement>document.querySelector('.firstname');
            const _last = <HTMLElement>document.querySelector('.lastname');
            const _email = <HTMLElement>document.querySelector('.email');
            const _username = <HTMLElement>document.querySelector('.username');

            _first.innerText = this.user.firstName;
            _last.innerText = this.user.lastName;
            _greet.innerText += ` ${this.user.firstName} ${this.user.lastName}`;
            _today.innerText = new Date().toDateString();
            _email.innerText = this.user.email;
            _username.innerText = this.user.username;
        }
    }
    
    public get today(): string {
        const _date = new Date();
        return _date.toDateString();
    }

    public get fullname(): string | undefined {
        if (this._value)
            return this.decrypt(this._value.fullname);
        else
            this.userAccessRedirect();
    }

    private findUser = () => {

        if (this._value) {

            AccountService.findUser(this._value)
                .then((user) => {
                    this.user = user.data;
                    if (user.data && this.user) {

                        this.user.active = this.decrypt(user.data.active) === 'true' ? true : false;
                        this.user.email = this.decrypt(user.data.email);
                        this.user.firstName = this.decrypt(user.data.firstName);
                        this.user.lastName = this.decrypt(user.data.lastName);
                        this.user.username = this.decrypt(user.data.username);
                        this.user.userType.display = this.decrypt(user.data.userType.display);
                        this.user.userType.description = this.decrypt(user.data.userType.description);

                    } else {
                        this._cookieManager.deleteCookie();
                        this.userAccessRedirect();
                    }

                    if (this._value)
                        this._cookieManager.setCookie(this._value);

                    this.setValues();

                })
                .catch((err) => {
                    console.debug(err.message);
                });
        }
    }
}

