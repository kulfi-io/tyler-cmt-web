import '../assets/sass/appointment.scss';
import '../assets/sass/slider.scss';
import moment from 'moment';

export class Slider {
    private rangeSlider: HTMLInputElement;
    private rangeBullet: HTMLElement;
    protected target?: HTMLInputElement;
    private availabilty: HTMLSpanElement;
    private busy: number[];
    private now: string;
    private selectedDate?: number;
    
    constructor() {

        this.rangeSlider =  <HTMLInputElement>document.querySelector('#range-line');
        this.rangeBullet = <HTMLElement>document.querySelector('#bullet');
        this.availabilty =  <HTMLSpanElement>document.querySelector('.availability');;

        if(this.rangeSlider && this.rangeBullet) {
          this.rangeSlider.addEventListener('input', (e: Event) => {
            this.showSliderValue();
          });
        }

        this.busy = [10, 13, 18, 21];
        this.now =  moment(new Date()).format('HH');
        // console.debug('today', )
        // const _now = momemt(new Date()).format('mm-dd-yyyy').valueOf();
        // this.setFirstOpenAppointment(_now);
       
    }

    protected setFirstOpenAppointment = (selected: number) => {
        const _today =  moment(moment(new Date().toISOString())).valueOf();
        
        this.selectedDate = selected;
        const recursiveNext = (next: number): number => {
            if(this.busy.indexOf(next) >= 0) {
                return recursiveNext(next + 1);
            } 

            return next;
        }

        if(selected >= _today) {

            if(_today == selected) {
                const _currentNow =  moment(new Date()).format('HH');
                const _nextAppt = parseInt(_currentNow) + 1;

                this.rangeSlider.value = recursiveNext(_nextAppt).toString();
            } else {
                this.rangeSlider.value = recursiveNext(parseInt(this.rangeSlider.min)).toString();
            }

            this.showSliderValue();
        }
    }

    private reserved = () => {

        if(!this.rangeBullet.classList.contains('reserved')) {
            this.rangeBullet.classList.add('reserved');
            this.availabilty.classList.add('reserved');
            this.availabilty.textContent = 'reserved';
            this.rangeSlider.classList.add('reserved');

            this.setSelectedTime()
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
        this.setSelectedTime(time);
    }

    protected showSliderValue = () => {

        const _targetVal = parseInt(this.rangeSlider.value);
        const _val =  moment(_targetVal, ['HH:MM']).format('hh:mm a');
        
        if(this.selectedDate) {
            const _today = Date.parse(new Date().toDateString());
            this.rangeBullet.innerHTML = _val;
            this.available(_val);

            if(this.selectedDate === _today) {
                if(_targetVal <= parseInt(this.now)) {
                    this.reserved();
                }
            }

            // TODO
            // compare busy
        }
        

       

    }
}

export default Slider;