import { faLock, faEye, faEyeSlash, IconDefinition, faUser, faEnvelope, faCheck } from "@fortawesome/fontawesome-free-solid";
import { User, Login, VerifyLogin } from '../models/account';
import { MailerUser, Note } from '../models/mailer';
import AccountService  from '../microservices/account';
import MailerService from '../microservices/mailer';
import Cookie from './cookie';
import CookieManager from './cookieManager';

export interface validKey {
    name: string;
    relative: string,
    value: boolean;
}

export class ReadyToSubmit {
    public validated: validKey[];
    public submitter?: Element;
    public max: number;

    constructor(submitter?: Element, max: number = 1) {
        this.validated = [];
        this.submitter = submitter;
        this.max = max;
    }

    public muted = (): void => {
        if(this.submitter) {
            var _classes = this.submitter.classList;
            var _passed = _classes.contains("bg-passed");
            var _muted = _classes.contains("bg-muted");

            if(_passed)
                _classes.remove('bg-passed');
                        
            if(!_muted) 
                _classes.add('bg-muted');
             
        }
    }

    public passed = (): void => {
        if(this.submitter) {
            var _classes = this.submitter.classList;
            var _passed =  _classes.contains("bg-passed");
            var _muted = _classes.contains("bg-muted");

            if(!_passed)
                _classes.add('bg-passed');
                        
            if(_muted) 
                _classes.remove('bg-muted');
             
        }
    }
}

export default class Account {
    public matched?: boolean
    public pwdCriteriaMatched: validKey[];
    public readyToSubmit:ReadyToSubmit;
    private cookie?: Cookie;

    constructor(submitter?: Element, max: number=1) {
        this.pwdCriteriaMatched=[];
        this.readyToSubmit = new ReadyToSubmit(submitter, max);
        this.cookie = CookieManager.getCookie('tyler-cmt')
    }

    private notifySubmitter = (submitter: Element, originalValue: string) => {
        if(submitter.textContent !== originalValue) {
            const _reset = () => {
                submitter.textContent = originalValue;
                this.readyToSubmit.muted;
            }
            setTimeout(_reset, 2000);
        }
    }

    private setCookie = (login: Login) => {
        if(this.cookie) {
            const _cookie = <Login>this.cookie.decryptedValue;
            if(_cookie === login ) {
               console.debug('cookie', _cookie);
               console.debug('login', login);
               
            }
        } else {
            CookieManager.setCookie('tyler-cmt', login);
        }
    }

    private removeCookie = () => {
        if(this.cookie) {
            CookieManager.deleteCookie('tyler-cmt');
            this.cookie = undefined;
        }
    }

    public login = (e: Event) => {
        e.preventDefault();
        const _failed = this.readyToSubmit.validated.filter(x => !x.value);
        
        if(_failed.length == 0 
            && this.readyToSubmit.validated.length == this.readyToSubmit.max) {
            
            const _submitter = <HTMLButtonElement>e.currentTarget;
            const _form = <HTMLFormElement>_submitter.closest('form');
            const _icons = _form.querySelectorAll('.fa');
            const _submitterTextContent = <string>_submitter.textContent;
            let _username = <HTMLInputElement>_form.querySelector('#username');
            let _password = <HTMLInputElement>_form.querySelector('#password')

            const _data = new Login();
            _data.username = _username.value;
            _data.password = _password.value;

            AccountService.login(_data)
            .then((result) => {

                this.readyToSubmit.validated = [];
                _username.value = '';
                _password.value = '';
                this.readyToSubmit.muted();

                _icons.forEach((item: Element) => {
                    this.muted(item);
                });

                _submitter.textContent = result.status 
                    ? `${result.statusText} ${result.data.message}.`
                    : _submitterTextContent;

                this.setCookie(_data);
                this.notifySubmitter(_submitter, _submitterTextContent)
            })
            .catch((err) => {
                _submitter.textContent = err.response.data.message;
                this.notifySubmitter(_submitter, _submitterTextContent);
                this.removeCookie();
            });
        }
    }

    public verify = (e: Event) => {
        e.preventDefault();
        console.debug('verify');
        const _failed = this.readyToSubmit.validated.filter(x => !x.value);
        
        if(_failed.length == 0 
            && this.readyToSubmit.validated.length == this.readyToSubmit.max) {
            
            const _submitter = <HTMLButtonElement>e.currentTarget;
            const _form = <HTMLFormElement>_submitter.closest('form');
            const _icons = _form.querySelectorAll('.fa');
            const _submitterTextContent = <string>_submitter.textContent;
            let _token = <HTMLInputElement>_form.querySelector('#token');
            let _username = <HTMLInputElement>_form.querySelector('#username');
            let _password = <HTMLInputElement>_form.querySelector('#password')

            const _data = new VerifyLogin();
            _data.username = _username.value;
            _data.password = _password.value;
            _data.token = _token.value;

            console.debug('_data', _data);
            AccountService.verify(_data)
            .then((result) => {

                this.readyToSubmit.validated = [];
                _username.value = '';
                _password.value = '';
                _token.value = '';
                
                this.readyToSubmit.muted();

                _icons.forEach((item: Element) => {
                    this.muted(item);
                });

                _submitter.textContent = result.status 
                    ? `${result.statusText} ${result.data.message}.`
                    : _submitterTextContent;

                this.setCookie(_data);
                this.notifySubmitter(_submitter, _submitterTextContent)
            })
            .catch((err) => {
                console.debug('err', err);
                _submitter.textContent = err.response.data.message;
                this.notifySubmitter(_submitter, _submitterTextContent);
                this.removeCookie();
            });
        }

    }

    public sendNote = (e: Event) => {
        e.preventDefault();
        const _failed = this.readyToSubmit.validated.filter(x => !x.value);
        
        if(_failed.length == 0 
            && this.readyToSubmit.validated.length == this.readyToSubmit.max) {
            
            const _submitter = <HTMLButtonElement>e.currentTarget;
            const _form = <HTMLFormElement>_submitter.closest('form');
            const _icons = _form.querySelectorAll('.fa');
            const _submitterTextContent = <string>_submitter.textContent;
            let _email:HTMLInputElement;
            let _first:HTMLInputElement;
            let _last:HTMLInputElement;
            let _content: HTMLDivElement;

            const setElements = ()  => {
                
                if(_form.id.indexOf('portrait') >= 0) {
                    _email = <HTMLInputElement>_form.querySelector('#note-email');
                    _first = <HTMLInputElement>_form.querySelector('#note-first');
                    _last = <HTMLInputElement>_form.querySelector('#note-last');
                    _content = <HTMLDivElement>_form.querySelector('#note');
                } else {
                    _email = <HTMLInputElement>_form.querySelector('#note-land-email');
                    _first = <HTMLInputElement>_form.querySelector('#note-land-first');
                    _last = <HTMLInputElement>_form.querySelector('#note-land-last');
                    _content = <HTMLDivElement>_form.querySelector('#land-note');
                }

                const _data = new Note();
                _data.email = _email.value;
                _data.firstname = _first.value;
                _data.lastname = _last.value;
                _data.content = _content.innerText;

                MailerService.sendNote(_data)
                .then((result) => {
                    this.readyToSubmit.validated = [];
                    _email.value = '';
                    _first.value = '';
                    _last.value = '';
                    this.readyToSubmit.muted();

                    _icons.forEach((item: Element) => {
                        this.muted(item);
                    });

                    _submitter.textContent = result.status 
                        ? `${result.statusText} ${result.data.message}.`
                        : _submitterTextContent;

                    this.notifySubmitter(_submitter, _submitterTextContent)
        
                })
                .catch((err) => {
                    _submitter.textContent = err.response.data.message;
                    this.notifySubmitter(_submitter, _submitterTextContent);
                });
            }

            setElements();
        }
    }

    public register = (e: Event) => {
        e.preventDefault();
        const _failed = this.readyToSubmit.validated.filter(x => !x.value);

        if(_failed.length == 0 
            && this.readyToSubmit.validated.length == this.readyToSubmit.max) {

            const _submitter = <HTMLButtonElement>e.currentTarget;
            const _submitterTextContent = <string>_submitter.textContent;
            const _form = <HTMLFormElement>_submitter.closest('form');
            const _username = <HTMLInputElement>_form.querySelector('#username');
            const _email = <HTMLInputElement>_form.querySelector('#register-email');
            const _first = <HTMLInputElement>_form.querySelector('#firstname');
            const _last = <HTMLInputElement>_form.querySelector('#lastname');
            const _pwd = <HTMLInputElement>_form.querySelector('#password');
            const _verify = <HTMLInputElement>_form.querySelector('#verify-password');
            const _icons = _form.querySelectorAll('.fa');
            const _criteriaPassed = _form.querySelectorAll('.instructions .passed');

            const _user = new User();
            _user.username = _username.value;
            _user.email = _email.value;
            _user.firstname = _first.value;
            _user.lastname = _last.value;
            _user.password = _pwd.value;
            _user.type = 'basic';

            AccountService.register(_user)
            .then((result) => {

                _submitter.textContent = result.status 
                    ? `${result.statusText} ${result.data.message.username}.`
                    : _submitterTextContent;
                    
                MailerService.register(<MailerUser>result.data.message)
                .then((result) => {

                    this.readyToSubmit.validated = [];
                    _username.value = '';
                    _email.value = '';
                    _first.value = '';
                    _last.value = '';
                    _pwd.value = '';
                    _verify.value = '';
                    this.readyToSubmit.muted();
                    _icons.forEach((item: Element) => {
                        this.muted(item);
                    });
        
                    _criteriaPassed.forEach((item: Element) => {
                        this.muted(item);
                    })
                    
                    _submitter.textContent += `Please check your email.`;
                    this.notifySubmitter(_submitter, _submitterTextContent);
                })
                .catch((err) => {
                    _submitter.textContent = err.response.data.message;
                    this.notifySubmitter(_submitter, _submitterTextContent);
                });
            })
            .catch((err) => {
                _submitter.textContent = err.response.data.message;
                this.notifySubmitter(_submitter, _submitterTextContent);
            });
        }
    }

    public matchSiblingState = (elms: Element[]) => {
        if(elms.length) {
            const _passed = this.readyToSubmit.validated.filter(x => x.value);
            const _failed = this.readyToSubmit.validated.filter(x => !x.value);
            
            _passed.forEach((key: Object) => {
                const _key = <validKey>key;
                const _target = elms.find(x => x.classList.value.indexOf(_key.relative) > 0);
                if(_target)
                    this.passed(_target)
                
            });

            _failed.forEach((key: Object) => {
                const _key = <validKey>key;
                
                const _target = elms.find(x => x.classList.value.indexOf(_key.relative) > 0);
                if(_target)
                    this.muted(_target)
            });

            if(this.readyToSubmit.submitter && _failed.length == 0) {
                
                if(this.readyToSubmit.validated.length == this.readyToSubmit.max)
                    this.readyToSubmit.passed();

            } else {
                this.readyToSubmit.muted();
            }
        }
    }

    public validateComplete = (key: validKey) => {
    
        if(key) {
            if(this.readyToSubmit.validated.length) {
                const _index = this.readyToSubmit.validated.findIndex(x => x.name === key.name);
                if(_index >= 0) {
                    this.readyToSubmit.validated[_index] = key;
                } else {
                    this.readyToSubmit.validated.push(key);
                }
            } else {
                this.readyToSubmit.validated.push(key);
            }

            if(this.readyToSubmit.submitter && this.readyToSubmit.validated.length == this.readyToSubmit.max) {
                const _failed = this.readyToSubmit.validated.filter(x => !x.value);
                _failed.length == 0 ? this.readyToSubmit.passed() : this.readyToSubmit.muted();
            }

        }
    }
    public displayPassword = (elm: SVGElement) => {
       
        const _iconParent = <HTMLSpanElement>elm.parentNode;
        const _iconPrepend = <HTMLDivElement>_iconParent.parentNode;
        const _parent= <HTMLDivElement>_iconPrepend.parentNode
        const _pwd= <HTMLInputElement>_parent.querySelector('input');

        const _path = <SVGPathElement>elm.querySelector('path');
        if(_path) {
            
            let _display: string | boolean | null =   _iconParent.getAttribute('data-display');
            _display = _display !== null  && _display === "true" ? false : true
            
            const _icon = this.displayEyeIcon(_display);

            _iconParent.setAttribute('data-display', _display.toString())
            
            if(!_display) {
                _pwd.setAttribute('type', 'password');
            } else {
                _pwd.setAttribute('type', 'text');
            }
            _path.setAttribute('d', _icon.icon[4]);
        }
        
    }

    public displayEyeIcon = (display: boolean = false): IconDefinition => {
        if(!display)
            return faEye;
        else
            return faEyeSlash;
    }

    public displayUserIcon = (): IconDefinition => {
        return faUser;
    }

    public displayLockIcon = (): IconDefinition => {
        return faLock;
    }

    public displayEnvelopIcon = (): IconDefinition => {
        return faEnvelope;
    }

    public displayCheckIcon = (): IconDefinition => {
        return faCheck;
    }

    private getLowerAlpha = (criteria: string): string => {
        var _result = criteria.replace(/[A-Z0-9!@#$%]/g, "");
        return _result;
    }

    private getUpperAlpha = (criteria: string): string  => {
        var _result = criteria.replace(/[a-z0-9!@#$%]/g, "");
        return _result;
    }

    private getDigit = (criteria: string): string => {
        var _result = criteria.replace(/[a-zA-Z!@#$%]/g, "");
        return _result;
    }

    private getSpecial = (criteria: string): string => {
        var _result = criteria.replace(/[a-zA-Z0-9]/g, "");
        return _result;
    }

    public validateLowerAlpha = (criteria: string): boolean => {
        var _parsed = this.getLowerAlpha(criteria);
        const _result = /[a-z]/.test(_parsed);
        return _result;
    }

    public validateUpperAlpha = (criteria: string): boolean => {
        var _parsed = this.getUpperAlpha(criteria);
        const _result = /[A-Z]/.test(_parsed);
        return _result;
    }

    public validateDigit = (criteria: string): boolean => {
        var _parsed = this.getDigit(criteria);
        const _result = /\d/.test(_parsed);
        return _result;
    }

    public validateSpecial = (criteria: string): boolean => {
        var _parsed = this.getSpecial(criteria);
        const _result = /[!@#$%]/.test(_parsed);
        return _result;
    }

    public validateMatched = (source: string, target: string): boolean => {
        return source === target;
    }

    public muted = (elm: Element): void => {
        if(elm) {
            var _classes = elm.classList;
            var _passed = _classes.contains("passed");
            var _muted = _classes.contains("text-muted");

            if(_passed)
                _classes.remove('passed');
                        
            if(!_muted) 
                _classes.add('text-muted');
             
        }
    }

    public setValidationResult = (result: validKey) => {
        if(this.pwdCriteriaMatched.length) {
            const _index = this.pwdCriteriaMatched.findIndex(x => x.name === result.name);
            if(_index >= 0) {
                this.pwdCriteriaMatched[_index] = result;
            } else {
                this.pwdCriteriaMatched.push(result);
            }
            
        } else {
            this.pwdCriteriaMatched.push(result);
        }
    }

    public passed = (elm: Element): void => {
        if(elm) {

            var _classes = elm.classList;
            var _passed =  _classes.contains("passed");
            var _muted = _classes.contains("text-muted");

            if(!_passed)
                _classes.add('passed');
                        
            if(_muted) 
                _classes.remove('text-muted');
             
        }
    }
}

