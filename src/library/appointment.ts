import Slider from './slider';

export class Appointment extends Slider {
    private body: HTMLDivElement;
    private title: HTMLInputElement;
    private location: HTMLInputElement;
    private comment: HTMLDivElement;
    private time: HTMLInputElement;

    constructor() {
        super();
        this.body = <HTMLDivElement>document.querySelector('.appointment-body');
        this.title = <HTMLInputElement>this.body.querySelector('#title');
        this.location = <HTMLInputElement>this.body.querySelector('#location');
        this.time = <HTMLInputElement>this.body.querySelector('#time');
        this.comment = <HTMLDivElement>this.body.querySelector('#comment');
        this.target = this.time;
    }

}