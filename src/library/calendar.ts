import CalendarEventService from '../microservices/calendar-event';
import DayGrid from '@fullcalendar/daygrid';
import Helper from './helper';
import Interaction from '@fullcalendar/interaction';
import moment from 'moment';
import TimeGrid from '@fullcalendar/timegrid';
import { Appointment } from './appointment';
import { Calendar, EventInput } from '@fullcalendar/core';
import { defaultApptMessage } from '../config/config.json';
import { range } from '../config/config.json';
import '../assets/sass/schedule.scss';
import '@fullcalendar/daygrid/main.min.css';
import '@fullcalendar/timegrid/main.min.css';
import {
    IAppointmentMessage,
    ICalEventResponse,
    IDayClickArgs,
    IDayEventArgs,
    IEventArgs,
} from '../models/interfaces';


export class Schedule extends Helper {
    private calendar?: Calendar;
    private monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    private eventInputs?: EventInput[];
    private lineHeight = 1.5;
    private lineHeightPxEquivalent = 12.775;
    private target: HTMLDivElement;
    private title: HTMLDivElement;
    private previous: HTMLButtonElement;
    private next: HTMLButtonElement;
    private month: HTMLButtonElement;
    private week: HTMLButtonElement;
    private overlay: HTMLDivElement;
    private closeSchedulePopup: HTMLAnchorElement;
    private selectTime: HTMLAnchorElement;
    private calDate: HTMLDivElement;
    private calTitle: HTMLDivElement;
    private calLocation: HTMLDivElement;
    private fpData: Record<string, any>;
    private reserved: number[];

    // Appointment
    private apptDefaultText: IAppointmentMessage;
    private appointment: Appointment;
    private cancelOverlay: HTMLDivElement;
    private cancelTime: HTMLAnchorElement;
    private cancelSubject: HTMLDivElement;
    private closeCancelPopup: HTMLAnchorElement;
    private cancelDate: HTMLDivElement;
    private cancelAppointment: HTMLAnchorElement;
    private cancelTitle: HTMLDivElement;
    // TODO
    // add meeting notes;

    // Cancel apt




    constructor(target: HTMLDivElement, fpData: Record<string, any>) {

        super();
        this.userAccessRedirect();
        this.attachNavEvents();
        this.displayloggedItems();
        this.logOut();


        this.appointment = new Appointment();
        this.apptDefaultText = defaultApptMessage;
        this.fpData = fpData;
        this.target = target;
        this.title = <HTMLDivElement>document.querySelector('.cal-title');
        this.previous = <HTMLButtonElement>document.querySelector('.previous');
        this.next = <HTMLButtonElement>document.querySelector('.next');
        this.month = <HTMLButtonElement>document.querySelector('.month');
        this.week = <HTMLButtonElement>document.querySelector('.week');
        this.overlay = <HTMLDivElement>document.querySelector('.schedule-popup');
        this.closeSchedulePopup = <HTMLAnchorElement>document.querySelector('.cancel');
        this.selectTime = <HTMLAnchorElement>document.querySelector('.select-time');
        this.calDate = <HTMLDivElement>document.querySelector('.cal-date');
        this.calTitle = <HTMLDivElement>document.querySelector('.cal-name');
        this.calLocation = <HTMLDivElement>document.querySelector('.cal-location');

        this.title.innerHTML = this.calHeading();

        // Cancel Apt pop-up
        this.cancelOverlay = <HTMLDivElement>document.querySelector('.schedule-cancel');
        this.cancelTime = <HTMLAnchorElement>document.querySelector('.cancel-time');
        this.cancelDate = <HTMLDivElement>document.querySelector('.cancel-date');
        this.cancelSubject = <HTMLDivElement>document.querySelector('.cancel-subject');
        this.cancelAppointment = <HTMLAnchorElement>document.querySelector('.cancel-apt');
        this.closeCancelPopup = <HTMLAnchorElement>document.querySelector('.close');
        this.cancelTitle = <HTMLDivElement>document.querySelector('.schedule-cancel-popup .title');

        this.previous.addEventListener('click', this.moveToPrevious);
        this.next.addEventListener('click', this.moveToNext);
        this.month.addEventListener('click', this.monthView);
        this.week.addEventListener('click', this.weekView);

        this.closeSchedulePopup.addEventListener('click', this.closePopup);
        this.selectTime.addEventListener('click', this.selectAppointmentTime);
        this.closeCancelPopup.addEventListener('click', this.closePopup);

        this.cancelAppointment.addEventListener('click', this.removeAppointment);
        this.reserved = [];

    }

    public refresh = (): void => {
        if (this.calendar) {

            const _calendar = this.calendar;
            this.calendar.destroy();
            this.setCalendarConfig();

            if (this.calendar) {
                this.calendar.state = _calendar.state;
                this.calendar.changeView(_calendar.state.viewType);
                this.calendar.render();
                this.resizeScroller();
            }
        }
    }

    private removeAppointment = (e: Event) => {
        e.preventDefault();
        const _target = <HTMLAnchorElement>e.currentTarget;

        if (_target) {
            const _sent = _target.getAttribute('data-sent')
            const _id = _target.getAttribute('data-cal-id');

            if (_id && _sent === 'false') {
                _target.setAttribute('data-sent', '');
                CalendarEventService.delete(_id)
                    .then((result) => {
                        this.cancelTitle.innerText = 'Appointment canceled';

                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        }
    }

    private closePopup = (e: Event) => {
        this.overlay.classList.remove('schedule-popup-display');
        this.cancelOverlay.classList.remove('schedule-popup-display');
    }

    private selectAppointmentTime = (e: Event) => {
        this.setApptValues();
        this.overlay.classList.remove('schedule-popup-display');
        this.fpData.api.moveSlideRight();
    }

    private setApptValues = () => {

        this.appointment.title.value = this.calTitle.innerText;
        this.appointment.selectDate.value = this.calDate.innerText;
        this.appointment.location.value = this.calLocation.innerText;
        let _targetdate = new Date(this.appointment.selectDate.value);

        const _reserved = this.reserved.filter(x => new Date(x).toDateString() === _targetdate.toDateString())

        this.appointment.findFirstAppointment(_reserved, this.fpData);
    }

    private dayClickListener = (args: IDayClickArgs) => {
        const _selectDay = moment(args.date).format('ll').valueOf();
        const _today = moment(new Date()).format('ll').valueOf();

        if (_selectDay >= _today) {

            this.overlay.classList.remove('schedule-popup-display');
            this.calTitle.innerHTML = this.apptDefaultText.title + ' Kulfi';
            this.calLocation.innerHTML = this.apptDefaultText.location;
            this.calDate.innerHTML = moment(args.date).format('LL');
            this.overlay.classList.add('schedule-popup-display');
            this.selectTime.focus();
        }
    }

    private GetDifference = (start: string, end: string): number => {
        const _start = new Date(start);
        const _end = new Date(end);

        const _endHr = _end.getHours() == 0 ? 24 : _end.getHours();

        let _diffHr = (_endHr - _start.getHours()) * 60;
        let _diffmin = (_end.getMinutes() - _start.getMinutes())

        return _diffHr + _diffmin;

    }

    private addEventDateAttribute = (args: IDayEventArgs) => {
        const _el = <HTMLAnchorElement>args.el;
        const _elTime = <HTMLDivElement>_el.querySelector('.fc-time');

        if (_elTime) {
            if (this.eventInputs) {
                const _input = this.eventInputs.find(x => x.id === args.event.id);
                if (_input && _input.start && _input.end) {

                    const _diff = this.GetDifference(_input.start.toString(), _input.end.toString()).toString();
                    const _start24 = new Date(_input.start.toString()).getHours().toString();

                    const _start = new Date(_input.start.toString()).toISOString();
                    const _end = new Date(_input.end.toString()).toISOString();

                    _elTime.setAttribute('event-duration', _diff);
                    _elTime.setAttribute('event-min', '10');
                    _elTime.setAttribute('event-max', '23');
                    _elTime.setAttribute('event-hour-val', _start24);
                    _elTime.setAttribute('start', _start);
                    _elTime.setAttribute('end', _end);


                    if (_input && _input.start) {
                        const _comparer = new Date(_input.start.toString()).toDateString();
                        const _reserved = this.eventInputs.filter(x => x.start ? new Date(x.start.toString()).toDateString() === _comparer : false)

                        if (_reserved)
                            this.insertTotal(_reserved, _comparer);
                    }
                }
            }

        }
    }

    private openEvent = (args: IEventArgs) => {

        if (this.eventInputs) {
            const _target = this.eventInputs.find(x => x.id === args.event.id);

            if (_target && _target.date && _target.start && _target.end) {

                const _targetDate = new Date(_target.date.toString()).getDate();
                const _todate = new Date().getDate()
                const _start = moment(_target.start).format('hh:mm a');
                const _end = moment(_target.end).format('hh:mm a')
                const _time = `${_start} - ${_end}`;


                if (_targetDate > _todate) {

                    this.cancelSubject.innerText = _target.title ? _target.title : '';
                    this.cancelDate.innerText = _target.date ? new Date(_target.date.toString()).toDateString() : '';

                    this.cancelTime.innerText = _time;
                    this.cancelAppointment.setAttribute('data-cal-id', args.event.id);
                    this.cancelAppointment.setAttribute('data-sent', 'false'),
                        this.cancelOverlay.classList.add('schedule-popup-display');

                }


            }

        }
    }

    private setCalendarConfig() {

        this.calendar = new Calendar(this.target, {
            plugins: [DayGrid, TimeGrid, Interaction],
            header: false,
            minTime: `${range.min}:00`,
            maxTime: `${range.max}:59`,
            allDaySlot: false,
            selectable: true,
            events: this.eventInputs,
            eventRender: this.addEventDateAttribute,
            eventClick: this.openEvent,
            dateClick: this.dayClickListener
        });
    }

    public init = (): void => {

        if (this.target) {
            this.targetEvents()
                .then(() => {
                    this.setCalendarConfig();

                })
                .catch((err: Error) => {
                    console.debug(err);
                })
                .finally(() => {
                    if (this.calendar) {
                        this.calendar.render();
                        this.resizeScroller();
                    }
                });
        }
    }

    private decryptResponse = (item: ICalEventResponse): EventInput => {

        const _eventInput: EventInput = {
            id: item.id ? this.decrypt(item.id) : undefined,
            title: item.summary ? this.decrypt(item.summary) : undefined,
            start: item.start ? this.decrypt(item.start.dateTime) : undefined,
            end: item.end ? this.decrypt(item.end.dateTime) : undefined,
            date: item.start ? this.decrypt(item.start.dateTime) : undefined,
            allDay: false,
        }

        return _eventInput;

    }

    private insertTotal = (inputs: EventInput[], date: string) => {

        if (inputs && inputs.length) {
            const _date = moment(inputs[0].start).format('YYYY-MM-DD')
            const _target = <HTMLElement>document.querySelector(`.fc-bg table tbody tr td[data-date="${_date}"]`);

            if (_target) {
                const _created = _target.querySelector('.total')
                if (!_created) {
                    const _total = document.createElement('div')
                    _total.setAttribute('class', 'total')
                    _total.innerText = inputs.length.toString();

                    _target.appendChild(_total);
                }
            }
        }

    }

    private targetEvents = () => {

        return new Promise((resolve, reject) => {
            CalendarEventService.events()
                .then((result) => {
                    const _items = <ICalEventResponse[]>result.data.events;
                    const _eventInputs: EventInput[] = [];

                    _items.forEach((item: ICalEventResponse) => {
                        const _item = this.decryptResponse(item);
                        if (_item.start)
                            this.reserved.push(Date.parse(_item.start.toString()))

                        _eventInputs.push(_item);
                    });


                    this.eventInputs = _eventInputs
                    resolve();

                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }

    private calHeading = (date?: Date): string => {

        date = date ? date : new Date();
        if (screen.width <= 411) {
            return `${this.monthNames[date.getMonth()].substr(0, 3)}, ${date.getFullYear()}`;
        }
        return `${this.monthNames[date.getMonth()]}, ${date.getFullYear()}`;
    }

    private setCalHeading = () => {
        if (this.calendar) {
            const _date = this.calendar.getDate();
            this.title.innerText = this.calHeading(_date);
        }
    }

    public moveToNext = (e: Event): void => {
        if (this.calendar) {
            this.calendar.next();
            this.setCalHeading();

            this.reposition();
        }
    }

    public moveToPrevious = (e: Event): void => {

        if (this.calendar) {
            this.calendar.prev();
            this.setCalHeading();
            this.reposition();
        }

    }

    public weekView = (e: Event): void => {
        if (this.calendar) {
            this.calendar.changeView('timeGridWeek');
            this.calendar.getDate();

            this.week.classList.toggle('active');
            this.month.classList.toggle('active');
            this.reposition();
        }
    }

    private resizeScroller = () => {
        const _scrollerList = document.querySelectorAll('.fc-scroller');
        if (_scrollerList) {
            _scrollerList.forEach((item: Element) => {
                const _scroller = <HTMLDivElement>item;
                _scroller.style.height = 'inherit';
            });
        }
    }

    private reposition = () => {

        this.resizeScroller();
        this.resizeWeekViewContent();
    }

    private getPosition = (start: number): number => {
        const _baseHeight = 41;
        const _min = 10;
        const _max = 23;

        const _interval = start - _min;

        return _interval * _baseHeight;
    }

    private setMeetingDurationInterval = (duration: number): number => {
        const _interval = ((duration / 60) / .25);
        return _interval;
    }

    private resizeWeekViewContent = () => {
        const _durationHeight = (this.lineHeightPxEquivalent * (this.lineHeight / 2));
        const _eventElements = document.querySelectorAll('.fc-content-skeleton table tbody .fc-content-col .fc-time-grid-event');
        const _baseDistance = 41;

        if (_eventElements) {
            let _startPosition: number = 0;
            let _activeDate: string;
            let _lastPosition: number = 0;
            let _lastTime: HTMLDivElement | undefined;

            _eventElements.forEach((event: Element) => {

                const _content = <HTMLDivElement>event.querySelector('.fc-content');
                const _time = <HTMLDivElement>event.querySelector('.fc-content .fc-time');
                let _currentDate = _time.getAttribute('start');
                const _eventHour = _time.getAttribute('event-hour-val');
                const _eventDuration = _time.getAttribute('event-duration');
                let _position: number = 0;

                if (_currentDate) {
                    _currentDate = new Date(_currentDate).toString();
                }

                if (_startPosition == 0 && _eventHour) {
                    _startPosition = this.getPosition(parseInt(_eventHour));
                }

                if (_eventHour && _currentDate
                    && new Date(_currentDate).toDateString() !== new Date(_activeDate).toDateString()) {
                    _activeDate = _currentDate;
                    _startPosition = this.getPosition(parseInt(_eventHour));
                    _lastPosition = 0;
                    _lastTime = undefined;
                }

                if (event && _time && _eventHour) {

                    // Set height of the meeting based on meeding duration
                    // at 15 minute interval
                    if (_eventDuration) {

                        const _interval = this.setMeetingDurationInterval(parseInt(_eventDuration))
                        _content.style.height = `${_interval * _durationHeight}px`;

                    }

                    event.removeAttribute('style');

                    if (_lastPosition == 0 && !_lastTime) {
                        _position = _startPosition;
                        event.setAttribute('style', `top: ${_position}px`);

                    } else {

                        let _start = _time.getAttribute('start');
                        let _end = _time.getAttribute('end');
                        const _lastStart = _lastTime ? _lastTime.getAttribute('start') : '0';
                        const _lastEnd = _lastTime ? _lastTime.getAttribute('end') : '0';
                        let _durationDiff;

                        if (_start && _end && _lastStart && _lastEnd) {

                            const _offsetDiff = moment(_start).diff(moment(_lastEnd));
                            _durationDiff = (_offsetDiff / 60000) / 60;

                            if (_lastEnd.trim() === _start.trim()) {
                                _position = _lastPosition;
                            } else {
                                _position = _lastPosition + (_durationDiff * _baseDistance);
                            }
                        }

                        event.setAttribute('style', `top: ${_position}px`);

                    }

                    _lastPosition = _position;
                    _lastTime = _time;
                }
            });
        }
    }

    public monthView = (e: Event): void => {
        if (this.calendar) {
            this.calendar.changeView('dayGridMonth');
            this.calendar.getDate();

            this.week.classList.toggle('active');
            this.month.classList.toggle('active');

            this.resizeScroller();
        }
    }
}

export default Schedule;