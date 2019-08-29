import Slider from './slider';
import moment from 'moment';
import { ICalEvent } from '@/models/interfaces';
import CalendarEventService from '@/microservices/calendar-event';


export class Appointment extends Slider {
	private body: HTMLDivElement;
	public title: HTMLInputElement;
	public location: HTMLInputElement;
	private comment: HTMLDivElement;
	public selectDate: HTMLInputElement;
	private schedule: HTMLButtonElement;
	private popOverlay: HTMLDivElement;
	private popName: HTMLDivElement;
	private popLocation: HTMLDivElement;
	private popDate: HTMLDivElement;
	private popReset: HTMLAnchorElement;
	private popDuration: HTMLDivElement;
	private popComment: HTMLDivElement;
	private popCreate: HTMLAnchorElement;
	private duration: HTMLInputElement;

	constructor() {
		super();

		this.body = <HTMLDivElement>document.querySelector('.appointment-body');
		this.title = <HTMLInputElement>this.body.querySelector('#title');
		this.location = <HTMLInputElement>this.body.querySelector('#location');
		this.selectDate = <HTMLInputElement>this.body.querySelector('#selectDate');
		this.comment = <HTMLDivElement>this.body.querySelector('#comment');
		this.target = this.selectDate;
		this.duration = <HTMLInputElement>this.body.querySelector('#duration');
		this.schedule = <HTMLButtonElement>this.body.querySelector('.submitter');
		
		this.popOverlay = <HTMLDivElement>this.body.querySelector('.appt-popup');
		this.popName = <HTMLDivElement>this.popOverlay.querySelector('.pop-name');
		this.popLocation = <HTMLDivElement>this.popOverlay.querySelector('.pop-location');
		this.popDate = <HTMLDivElement>this.popOverlay.querySelector('.pop-date')
		this.popDuration = <HTMLDivElement>this.popOverlay.querySelector('.pop-duration');
		this.popComment = <HTMLDivElement>this.popOverlay.querySelector('.pop-comment');
		this.popReset = <HTMLAnchorElement>this.popOverlay.querySelector('.cancel');
		this.popCreate = <HTMLAnchorElement>this.popOverlay.querySelector('.create');

		this.schedule.addEventListener('click', this.confirmAppointment);
		this.popReset.addEventListener('click', this.resetAppointment);
		this.popCreate.addEventListener('click', this.createAppointment)	
		this.title.addEventListener('keyup', this.readyToConfirm);
		this.location.addEventListener('keyup', this.readyToConfirm);
		this.selectDate.addEventListener('keyup', this.readyToConfirm);
		this.title.addEventListener('paste', this.readyToConfirm);
		this.location.addEventListener('paste', this.readyToConfirm);
		this.selectDate.addEventListener('paste', this.readyToConfirm);
		
		this.duration.addEventListener('keydown', this.preventDurationKeyEntry);
		this.duration.addEventListener('keyup', this.readyToConfirm);
	}

	public findFistAppointment = () => {
		const _selected = moment(this.selectDate.value).valueOf();
		this.setFirstOpenAppointment(_selected);
		this.validated();
		
	}

	private preventDurationKeyEntry = (e: KeyboardEvent) => {
		const _keys: number[] = [46, 40, 8];

		if(_keys.indexOf(e.keyCode) < 0) {
			e.preventDefault();
		} 
	}

	private resetAppointment = (e: Event) => {
		this.popOverlay.classList.remove('appt-popup-display');
	}

	private validated = () => {
		if(this.title.value.trim().length > 0 
		&& this.location.value.trim().length > 0 
			&& this.selectDate.value.indexOf('@') >= 0
			&& this.duration.value.trim().length > 0)  {

				if(this.schedule.classList.contains('bg-muted')) {
					this.schedule.classList.replace('bg-muted', 'bg-passed');
				} else {
					this.schedule.classList.replace('bg-passed', 'bg-muted');
				}
		}
	}

	private readyToConfirm = (e: Event) => {
		this.validated();
	}

	private confirmAppointment = (e: Event) => {

		e.preventDefault();

		if(this.schedule.classList.contains('bg-passed')) {
			this.popName.innerText = this.title.value;
			this.popLocation.innerText = this.location.value;
			this.popDate.innerText = this.selectDate.value;
			this.popDuration.innerText = this.duration.value + ' minutes';
			this.popComment.innerHTML = this.comment.innerText;
			this.popOverlay.classList.add('appt-popup-display');
		} else {
			return false;
		}

	}

	private createAppointment = (e: Event) => {
		const _parseSelectedDate = this.selectDate.value.replace('@ ', '');
		const _duration = this.duration.value;
		const _start =  moment(_parseSelectedDate);
		const _end = moment(_parseSelectedDate).add(_duration, 'minutes');

		const _data: ICalEvent = {
			start: _start.toString(),
			end: _end.toString(),
			title: this.title.value,
			location: this.location.value,
			email: 'ashish@ashishc.io'
		}

		CalendarEventService.create(_data)
		.then((result) => {
			console.debug('result', result);
		})
		.catch((err) => {
			console.debug(err);
		});
	}

}