import '../assets/sass/appointment.scss';
import '../assets/sass/slider.scss';
import momemt from 'moment';

export class Slider {
    private rangeSlider: HTMLInputElement;
    private rangeBullet: HTMLElement;

    constructor() {

        this.rangeSlider =  <HTMLInputElement>document.querySelector('#range-line');
        this.rangeBullet = <HTMLElement>document.querySelector('#bullet');
        
        if(this.rangeSlider && this.rangeBullet) {
          this.rangeSlider.addEventListener('input', (e: Event) => {
            this.showSliderValue();
          });
        }
    }

    showSliderValue = () => {

        const _busy = [13, 18, 21];

        const _targetVal = parseInt(this.rangeSlider.value);
        const _val =  momemt(_targetVal, ['HH:MM']).format('hh:mm a');
        this.rangeBullet.innerHTML = _val;

        if(_busy.indexOf(_targetVal) >= 0) {

            if(!this.rangeBullet.classList.contains('reserved')) {
                this.rangeBullet.classList.add('reserved');
            }

        } else {
            this.rangeBullet.classList.remove('reserved');
        }
    }
}

export default Slider;