import Cookie from './cookie';
import { cryptor } from './cryptor';
import { ICookieUser, IUser } from '@/models/interfaces';

export class Helper extends cryptor {
    protected user?: IUser;
    protected _cookieManager: Cookie;
    protected _value?: ICookieUser;
    private _book?: HTMLDivElement;
    private _navs?: NodeListOf<HTMLUListElement>;


    constructor() {
        super();
        this._cookieManager = new Cookie();
        this._cookieManager.findCookie();
    }

    protected LoggedOut = () => {
        this._cookieManager.deleteCookie();
        this.displayloggedItems();
    }

    protected userAccessRedirect = () => {
        if (!this._cookieManager.value ) {
            window.location.href = `${window.location.protocol}//${window.location.host}/#login`;
        } else {
            this._value = this._cookieManager.decryptedValue;
        }
    }

    protected displayloggedItems = () => {
        if(!this._book) {
            this._book = <HTMLDivElement>document.querySelector('.book');
            this._book.addEventListener('click', (e: Event) => {
                window.location.href = '/schedule';
            });


            if(this._cookieManager.value && !this._book.classList.contains('show')) {
                this._book.classList.add('show');
            } 

        } else {
            if(!this._cookieManager.value && this._book.classList.contains('show')) {
                this._book.classList.remove('show');
            } 
        }
        
       

        if(!this._navs) {
            this._navs = document.querySelectorAll('.pages');

            if(this._cookieManager.value) {
                this._navs.forEach((item: HTMLUListElement) => {
                    item.classList.remove('active-nav');
    
                    if(item.classList.contains('logged-in')) {
                        item.classList.add('active-nav');
                    }
                });
            } else {
                this._navs.forEach((item: HTMLUListElement) => {
                    item.classList.remove('active');
    
                    if(item.classList.contains('default')) {
                        item.classList.add('active');
                    }
                });
            }
        }
    }

    
}

export default Helper;