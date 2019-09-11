import '../assets/sass/appointment.scss';
import '../assets/sass/slider.scss';
import moment from 'moment';
import {range} from '../config/config.json';


export class Slider {
    private rangeSlider: HTMLInputElement;
    private rangeBullet: HTMLElement;
    protected target?: HTMLInputElement;
    private availabilty: HTMLSpanElement;
    private busy: number[];
    private selectedDate?: number;
    protected submitter?: HTMLButtonElement;
    
    constructor() {

        this.rangeSlider =  <HTMLInputElement>document.querySelector('#range-line');
        this.rangeBullet = <HTMLElement>document.querySelector('#bullet');
        this.availabilty =  <HTMLSpanElement>document.querySelector('.availability');;

        if(this.rangeSlider && this.rangeBullet) {
          this.rangeSlider.addEventListener('input', (e: Event) => {
            this.showSliderValue();
          });
        }

        this.busy = [];
       
    }

    protected setRangeSliderValue = (value: Date) => {
        const _targetVal = value.getHours();
        this.rangeSlider.value = _targetVal.toString();
        this.rangeBullet.innerText = moment(_targetVal, ['HH:MM']).format('hh:mm a');
        this.cancelState();
    } 

    protected setFirstOpenAppointment = (selected: number, reserved: number[]) => {
        const _today =  Date.parse(new Date().toDateString());  //moment(moment(new Date().toISOString())).valueOf();
        this.selectedDate = selected;
        this.busy = reserved;
        const recursiveNext = (next: number): number => {
            const _current = reserved.find(x => new Date(x).getHours() == next)

            if( _current 
                && new Date(_current).getHours() == next) {
                    return recursiveNext(next + 1);
                }
            if(this.busy.indexOf(next) >= 0) {
                return recursiveNext(next + 1);
            } 

            return next;
        }

        if(selected >= _today) {

            if(_today == selected) {
                const _currentHour =   new Date().getHours() + 1; //moment(new Date()).format('HH');
                const _nextAppt = _currentHour < range.min ? range.min :  _currentHour;

                this.rangeSlider.value = recursiveNext(_nextAppt).toString();
            } else {
                this.rangeSlider.value = recursiveNext(parseInt(this.rangeSlider.min)).toString();
            }

            this.showSliderValue();
        }
    }

    private cancelState = () => {
        this.rangeSlider.classList.add('reserved');
        this.rangeBullet.classList.add('reserved');


        if(this.submitter) {
            this.submitter.classList.replace('bg-muted', 'bg-passed');
            this.submitter.textContent = this.submitter.getAttribute('data-label-cancel');
        }
    }

    private reserved = () => {

        if(!this.rangeBullet.classList.contains('reserved')) {
            this.rangeBullet.classList.add('reserved');
            this.availabilty.classList.add('reserved');
            this.availabilty.textContent = 'reserved';
            this.rangeSlider.classList.add('reserved');

            if(this.submitter) {
                this.submitter.classList.replace('bg-passed', 'bg-muted');
                this.submitter.textContent = this.submitter.getAttribute('data-label-reserved');
            }

            this.setSelectedTime();
        }
    }

    private setSelectedTime  = (seletedTime?: string) => {
        if(this.target) {
            
            const selectedDate = this.target.value.split(' @');
            if(seletedTime)
                this.target.value = `${selectedDate[0]} @ ${seletedTime}`
            else 
                this.target.value =  selectedDate[0];
        }
    }

    private available = (time: string) => {
        this.rangeBullet.classList.remove('reserved');
        this.availabilty.classList.remove('reserved');
        this.rangeSlider.classList.remove('reserved')
        this.availabilty.textContent = 'open';
        if(this.submitter) {
            this.submitter.classList.replace('bg-muted', 'bg-passed');
            this.submitter.textContent = this.submitter.getAttribute('data-label-create');

        }
        this.setSelectedTime(time);
    }

    protected showSliderValue = () => {

        const _targetVal = parseInt(this.rangeSlider.value);
        const _val = moment(_targetVal, ['HH:MM']).format('hh:mm a');
        
        const _reserved = this.busy.find(x => new Date(x).getHours() == _targetVal)
        
        if(this.selectedDate) {
            const _today = Date.parse(new Date().toDateString());
            this.rangeBullet.innerHTML = _val;
            

            if(this.selectedDate === _today) {
                if(_targetVal <= new Date().getHours()) {
                    this.reserved();
                } else {
                    this.available(_val);
                }
            }

            // TODO
            if(_reserved) {
                if(_targetVal == new Date(_reserved).getHours()) {
                    this.reserved();
                } else {
                    this.available(_val);
                }
            }
        }
        

       

    }
}

export default Slider;