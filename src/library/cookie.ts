import Crypto from 'crypto-js';
import Config from '../config/config.json';

export class Cookie {
    public name: string;
    public expires: string;
    public duration: string;
    private value:  Crypto.WordArray;
    private config: { "secret": string; "expiration": { "durations": { "min": string; "sec": string; "hour": string; "day": string; "month": string; "year": string; }; "duration": string; }; };
    private durations: { "min": string; "sec": string; "hour": string; "day": string; "month": string; "year": string; };

    constructor(name: string, value: Object) {
        this.config = Config.cookie;
        this.name = name;
        this.value =  Crypto.AES.encrypt(value.toString(), Config.cookie.secret)
        this.durations = Config.cookie.expiration.durations;
        this.duration = Config.cookie.expiration.duration;
        this.expires = "1m";   
        this.initDuration();
    }

    private initDuration = () => {


        if(this.duration.indexOf('min') >= 0) {
            this.setMinDuration();
        }

        if(this.duration.indexOf('sec') >= 0) {
            this.setSecDuration();
        }

        if(this.duration.indexOf('day') >= 0) {
            this.setDayDuration();
        }

        if(this.duration.indexOf('month') >= 0) {
            this.setMonthDuration();
        }

        if(this.duration.indexOf('year') >= 0) {
            this.setYearDuration();
        }
    }



    private setMinDuration = () => {
        this.expires = this.durations.min;
    }

    private setSecDuration = () => {
        this.expires = this.durations.sec;
    }

    private setDayDuration = () => {
        this.expires = this.durations.day;
    }

    private setMonthDuration = () => {
        this.expires = this.durations.month;
    }

    private setYearDuration = () => {
        this.expires = this.durations.year;
    }

    public getCookieValue = () => {
        return this.value;
    }

    public decryptedValue = () => {

        const _bytes = Crypto.AES.decrypt(this.value, this.config.secret);
        const _plainText = _bytes.toString(Crypto.enc.Utf8);
        return _plainText;
    }
}

export default Cookie;
