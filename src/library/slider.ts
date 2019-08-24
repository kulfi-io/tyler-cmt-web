import '../assets/sass/appointment.scss';
import '../assets/sass/slider.scss';
import momemt from 'moment';


export class Slider {
    private rangeSlider: HTMLInputElement;
    private rangeBullet: HTMLElement;
    protected target?: HTMLInputElement;
    
    constructor() {

        this.rangeSlider =  <HTMLInputElement>document.querySelector('#range-line');
        this.rangeBullet = <HTMLElement>document.querySelector('#bullet');
        
        if(this.rangeSlider && this.rangeBullet) {
          this.rangeSlider.addEventListener('input', (e: Event) => {
            this.showSliderValue();
          });
        }
    }

   
    protected showSliderValue = () => {

        const _busy = [13, 18, 21];

        const _availalility = <HTMLSpanElement>document.querySelector('.availability');

        const _targetVal = parseInt(this.rangeSlider.value);
        const _val =  momemt(_targetVal, ['HH:MM']).format('hh:mm a');
        this.rangeBullet.innerHTML = _val;
        

        if(_busy.indexOf(_targetVal) >= 0) {

            if(!this.rangeBullet.classList.contains('reserved')) {
                this.rangeBullet.classList.add('reserved');
                _availalility.classList.add('reserved');
                _availalility.textContent = 'reserved';
                this.rangeSlider.classList.add('reserved');
            }

        } else {
            this.rangeBullet.classList.remove('reserved');
            _availalility.classList.remove('reserved');
            this.rangeSlider.classList.remove('reserved')
            _availalility.textContent = 'open';

            if(this.target) {
                const _targetVal: string[] = this.target.value.split('@');
                this.target.value = `${_targetVal[0].trim()} @ ${_val}`;
            }
        }
    }
}

export default Slider;