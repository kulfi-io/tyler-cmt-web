import Cookie from '../library/cookie';
import * as TinyCookie from 'tiny-cookie';

export class CookieManager {
    private cookie?: Cookie;
    
    public setCookie = (name: string, value: Object) => {
        this.cookie = new Cookie(name, value);

        if(TinyCookie.isCookieEnabled) {
            const _value = this.cookie.cookieValue

            if(_value) {
                
                TinyCookie.setCookie(this.cookie.name
                    , _value.toString()
                    , {expires: this.cookie.expires.value});
            }
        }
    }

    public getCookie = (name: string): Cookie | undefined  => {
        const _cookie = TinyCookie.getCookie(name);
        if(_cookie) 
            this.cookie = new Cookie(name, _cookie);

        return this.cookie;
    }

    public getValue = () => {
        let _value;
        if(this.cookie) {
            _value = this.cookie.decryptedValue;
        }
        return _value;
    }


    public isValidCookie = (name: string): boolean => {
        const _cookie = TinyCookie.getCookie(name);
        if(_cookie)
            return true;
        
        return false;
    }

    public deleteCookie = (name: string) => {
        TinyCookie.remove(name);
    }

    public extendExpiration = () => {

        if(this.cookie) {
            TinyCookie.setCookie(this.cookie.name
                , this.cookie.cookieValue.toString()
                , {expires: this.cookie.expires.value});
        }
    }


}

export default new CookieManager();