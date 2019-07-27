import { faLock, faEye, faEyeSlash, IconDefinition, faUser, faEnvelope, faCheck } from "@fortawesome/fontawesome-free-solid";

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

    constructor(submitter?: Element, max: number=1) {
        this.pwdCriteriaMatched=[];
        this.readyToSubmit = new ReadyToSubmit(submitter, max);
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

