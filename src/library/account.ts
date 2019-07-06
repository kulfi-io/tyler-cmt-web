export class Account {
    public matched?: boolean 

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

    public showPassword = (elm: HTMLButtonElement): void  => {
        var _targetName = elm.getAttribute("data-target");
        var _faItem = elm.querySelector(".fa-eye");
        if (_targetName) {
            var _target = <HTMLInputElement>document.getElementById(_targetName);
            if (_target) {
                _target.setAttribute("type", "text");
                if (_faItem) {
                    var _classes = _faItem.className.match(/\S+/g) || [];
                    var _item = _classes.indexOf("fa-eye");
                    if (_item >= 0) {
                        _classes.splice(_item, 1);
                        _classes.push("fa-eye-slash");

                        _faItem.className = _classes.join(" ");
                    }
                }
            }
        }
    }

    public hidePassword =  (elm: HTMLButtonElement): void  => {
        var _targetName = elm.getAttribute("data-target");
        var _faItem = elm.querySelector(".fa-eye-slash");
        if (_targetName) {
            var _target = <HTMLInputElement>document.getElementById(_targetName);
            if (_target) {
                _target.setAttribute("type", "password");
                if (_faItem) {
                    var _classes = _faItem.className.match(/\S+/g) || [];
                    var _item = _classes.indexOf("fa-eye-slash");
                    if (_item >= 0) {
                        _classes.splice(_item, 1);
                        _classes.push("fa-eye");

                        _faItem.className = _classes.join(" ");
                    }
                }
            }
        }
    }

    public togglePwdDisplay = (elm: HTMLButtonElement): void => {
        var _visibleState = elm.getAttribute("data-display");
        if (_visibleState) {
            if (_visibleState === "hidden") {
                this.showPassword(elm);
                elm.setAttribute("data-display", "display");
            } else {
                this.hidePassword(elm);
                elm.setAttribute("data-display", "hidden");
            }
        }
    }

    public passed = (elm: HTMLElement | null): void => {
        if (elm) {
            var _classes = elm.className.match(/\S+/g) || [];
            var _passed = _classes.indexOf("passed");
            var _mutedIcon = _classes.indexOf("fa-base");
            if (_passed < 0) {
                _classes.push("passed");

                if (_mutedIcon >= 0) {
                    _classes.splice(_mutedIcon, 1);
                }

                elm.className = _classes.join(" ");
            }
        }
    }

    public muted = (elm: HTMLElement | null): void => {
        if (elm) {
            var _classes = elm.className.match(/\S+/g) || [];
            var _muted = _classes.indexOf("text-muted");
            var _mutedIcon = _classes.indexOf("fa-base");
            var _passed = _classes.indexOf("passed");
            if (_passed >= 0) {
                _classes.splice(_passed, 1);

                if (_muted < 0 && !_mutedIcon) {
                    _classes.push("text-muted");
                }

                if (_mutedIcon < 0) {
                    _classes.push("fa-base");
                }

                elm.className = _classes.join(" ");
            }
        }
    }




}

export default new Account();