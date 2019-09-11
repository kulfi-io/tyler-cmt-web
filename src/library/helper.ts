import Cookie from './cookie';
import { cryptor } from './cryptor';
import { ICookieUser, IUser } from '@/models/interfaces';


export class Helper extends cryptor {
    protected user?: IUser;
    protected _cookieManager: Cookie;
    protected _value?: ICookieUser;
    private _book?: HTMLDivElement;
    private _navs?: HTMLUListElement[];


    constructor() {
        super();
        this._cookieManager = new Cookie();
        this._cookieManager.findCookie();
    }

    protected logOut = () => {
        const _item = <HTMLAnchorElement>document.querySelector('.logout');

        if(_item) {

            _item.addEventListener('click', (e: Event) => {
                e.preventDefault();
                this.LoggedOut();
            });
        }
    }

    protected LoggedOut = () => {
        
        console.debug('logged-out');
        this._cookieManager.deleteCookie();
        this.displayBookedItems();

        window.location.href = '/';
    }

    protected userAccessRedirect = () => {
        if (!this._cookieManager.value ) {
            window.location.href = `${window.location.protocol}//${window.location.host}/#login`;
        } else {
            this._value = this._cookieManager.decryptedValue;
        }
    }

    public attachNavEvents = () => {
        
        this._navs = Array.from(document.querySelectorAll('.pages'));
        if(this._navs) {
            this._navs.forEach((list: HTMLUListElement) => {
                const _items =list.querySelectorAll('li');
                if(_items) {
                    _items.forEach((item: Element) => {
                      item.addEventListener('click', this.selectMunuItem);
                    });
                }
            });
        }
    }

    private selectMunuItem = (e: Event) => {
        const _target = <HTMLElement>e.currentTarget;
        
        if(_target) {
          const _parent = _target.parentNode;
  
          if(_parent) {
            const _item = _parent.querySelector('li.active');
            if(_item) {
              _item.classList.remove('active');
            }
          }
          
          _target.classList.add('active');
        }
  
    }

    protected displayloggedItems = () => {

        if(!this._navs) {
            this._navs = Array.from(document.querySelectorAll('.pages'));
        }

        if(this._navs) {
            
            if(this._cookieManager.value) {
                this._navs.forEach((item: HTMLUListElement) => {
                    item.classList.remove('active-nav');
    
                    if(item.classList.contains('logged-in')) {
                        item.classList.add('active-nav');
                    }
                });
            } else {
                this._navs.forEach((item: HTMLUListElement) => {
                    item.classList.remove('active-nav');
    
                    if(item.classList.contains('default')) {
                        item.classList.add('active-nav');
                    }
                });
            }
        }

    }

    public displayBookedItems = () => {
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
        
        this.displayloggedItems();

        
    }

    
}

export default Helper;