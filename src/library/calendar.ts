import CalendarEventService from '../microservices/calendar-event';
import DayGrid from '@fullcalendar/daygrid';
import Interaction from '@fullcalendar/interaction';
import moment from 'moment';
import TimeGrid from '@fullcalendar/timegrid';
import { Calendar, EventInput } from '@fullcalendar/core';
import { cryptor } from './cryptor';
import { ICalEventResponse, IDayClickArgs } from '../models/interfaces';
import '../assets/sass/schedule.scss';
import '@fullcalendar/daygrid/main.min.css';
import '@fullcalendar/timegrid/main.min.css';

export class Schedule extends cryptor{
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
    private cancel: HTMLAnchorElement;
    private selectTime: HTMLAnchorElement;
    private calDate: HTMLDivElement;
    private calTitle: HTMLDivElement;
    private calLocation: HTMLDivElement;
    private fpData: Record<string, any>;

    // Appointment
    // TODO set appointment calendar values 

    constructor(target: HTMLDivElement, fpData: Record<string, any>) {

        super();
        this.fpData = fpData;
        this.target = target;
        this.title = <HTMLDivElement>document.querySelector('.cal-title');
        this.previous = <HTMLButtonElement>document.querySelector('.previous');
        this.next = <HTMLButtonElement>document.querySelector('.next');
        this.month = <HTMLButtonElement>document.querySelector('.month');
        this.week = <HTMLButtonElement>document.querySelector('.week');
        this.overlay = <HTMLDivElement>document.querySelector('.schedule-popup');
        this.cancel = <HTMLAnchorElement>document.querySelector('.cancel');
        this.selectTime = <HTMLAnchorElement>document.querySelector('.select-time');
        this.calDate = <HTMLDivElement>document.querySelector('.date');
        this.calTitle = <HTMLDivElement>document.querySelector('.name');
        this.calLocation = <HTMLDivElement>document.querySelector('.location');
        
        this.title.innerHTML = this.calHeading();

        this.previous.addEventListener('click', this.moveToPrevious);
        this.next.addEventListener('click', this.moveToNext);
        this.month.addEventListener('click', this.monthView);
        this.week.addEventListener('click', this.weekView);
        
        this.cancel.addEventListener('click', this.cancelAppointment);
        this.selectTime.addEventListener('click', this.selectAppointmentTime);
    }

    public refresh = (): void => {
        if(this.calendar) {

            const _calendar = this.calendar;
            this.calendar.destroy();
            this.setCalendarConfig();
            
            if(this.calendar) {
                this.calendar.state = _calendar.state;
                this.calendar.changeView(_calendar.state.viewType);
                this.calendar.render();
                this.resizeScroller();
                this.insertTotal();
            }
        }
    }

    private cancelAppointment = (e: Event) => {
        this.cancel.addEventListener('click', (e: Event) => {
            this.overlay.classList.remove('schedule-popup-display');
        });
    }

    private selectAppointmentTime = (e: Event) => {
        this.selectTime.addEventListener('click', (e: Event) => {
            this.overlay.classList.remove('schedule-popup-display');
            this.fpData.api.moveSlideRight();
        });
    }


    private dayClickListener = (args: IDayClickArgs) => {
        const _selectDay = moment(args.date).format('ll').valueOf();
        const _today = moment(new Date()).format('ll').valueOf();

        if (_selectDay >= _today) {

            this.overlay.classList.remove('schedule-popup-display');
            this.calTitle.innerHTML = 'Schedule an appointment with Kulfi';
            this.calLocation.innerHTML = '333 sutter street, SF CA, 94109';
            this.calDate.innerHTML = moment(args.date).format('LL');
            this.overlay.classList.add('schedule-popup-display');

        }
    }

    private setCalendarConfig() {
        
        this.calendar = new Calendar(this.target, {
            plugins: [DayGrid, TimeGrid, Interaction],
            header: false,
            minTime: '10:00',
            maxTime: '24:00',
            allDaySlot: false,
            selectable: true,
            events: this.eventInputs,
            eventClick: function (args) {
                console.debug('event-click', args);
            },
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
                if(this.calendar) {
                    this.calendar.render();
                    this.resizeScroller();
                    this.insertTotal();
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
            // backgroundColor: '#efefef',
            // borderColor: '#005276',
            
        }

        return _eventInput;

    }

    private insertTotal = () => {
        if(this.eventInputs && this.eventInputs.length) {
            if(this.calendar && this.calendar.view.type ===  'dayGridMonth') {
                
                this.eventInputs.forEach((event: EventInput) => {
                    
                    const _target = <HTMLElement>document.querySelector(`.fc-bg table tbody tr td[data-date="${moment(event.date).format('YYYY-MM-DD')}"]`);
                    if(_target) {
                        const _total = document.createElement('div')
                        _total.setAttribute('class', 'total')
                        _total.innerText = '30';

                        _target.appendChild(_total);
                    }

                });
            }
        }
    }

    private targetEvents = ()  => {

        return new Promise((resolve, reject) => {
            CalendarEventService.events()
            .then((result) => {
                const  _items = <ICalEventResponse[]>result.data.events;
                const _eventInputs: EventInput[] = [];

                _items.forEach((item: ICalEventResponse) => {
                    _eventInputs.push(this.decryptResponse(item));
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
        if(screen.width <= 411) {
            return `${this.monthNames[date.getMonth()].substr(0,3)}, ${date.getFullYear()}`;
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
        if(_scrollerList) {
            _scrollerList.forEach((item: Element) => {
                const _scroller = <HTMLDivElement>item;
                _scroller.style.height = 'inherit';
            });
        }
    }

    private reposition = () => {
        
        this.resizeScroller();
        this.resizeWeekViewContent();
        this.positionMeetings()
    }

    private positionMeetings = () => {
        const _startPosition = 10
        const _startLocation = 41;
        // const _mediaStartLocation = 44;
        // const _activeLocation = this.portraitMediaScreen ? _mediaStartLocation : _startLocation;
        const _activeLocation = 41;
        let _lastStartPosition = _startPosition;
        let _lastInterval = 0;

        const _eventElements = document.querySelectorAll('.fc-content-skeleton table tbody .fc-content-col .fc-time-grid-event');
        if(_eventElements) {

            _eventElements.forEach((event: Element)  => {
                const _event = <HTMLDivElement>event
                const _time = <HTMLDivElement>_event.querySelector('.fc-time');
            
                if(_time && _event) {
                    const _dataFull = _time.getAttribute('data-full');
                    
                    if(_dataFull) {

                        const _dataFullArray = _dataFull.split(' - ');
                        let _startTime = parseInt(_dataFullArray[0].replace('AM', '').replace('PM', ''));
                        let _endTime = parseInt(_dataFullArray[1].replace('AM', '').replace('PM', ''));

                        _event.removeAttribute('style');
                        let _style = `top: ${_activeLocation}px; z-index: 1`;

                        let _interval = 0
                        if(_dataFullArray[0].indexOf('PM') >=0) {
                            if(_startTime < 12)
                                _startTime = _startTime + 12;
                        }

                        if(_startTime > _lastStartPosition) {
                            _interval = _startTime - _lastStartPosition;
                            
                            if(_lastInterval === _interval) {
                                _interval++;
                            } else {
                                if(_lastInterval > _interval) {
                                    _interval = _lastInterval;
                                }
                            }
                                
                            _style = `top: ${_interval * _activeLocation}px; z-index: 1`;
                        }

                        _event.setAttribute('style', _style);
                        _lastStartPosition = _startTime

                        if(_interval > _lastInterval)
                            _lastInterval = _interval;

                    }
                }
            });
        }
    }

    private resizeWeekViewContent = () => {

        const _halfHeight = this.lineHeightPxEquivalent * this.lineHeight;
        const _hourHeight = this.lineHeightPxEquivalent * (this.lineHeight * 2);
       
        const _eventElements = document.querySelectorAll('.fc-content-skeleton table tbody .fc-content-col .fc-time-grid-event');
        
        if(_eventElements) {
            _eventElements.forEach((event: Element) => {
                const _content = <HTMLDivElement>event.querySelector('.fc-content'); 
                
                const _time = <HTMLDivElement>event.querySelector('.fc-content .fc-time');
                if(_time) {
                    const _full = _time.getAttribute('data-full');
                    if(_full) {
                        const _duration = _full.replace('AM', '').replace('PM', '').split(' - ');
                        let _length = parseInt(_duration[1]) - parseInt(_duration[0]); 
                        
                        if(parseInt(_duration[0]) === 12) {
                            _length = (parseInt(_duration[1]) + 12) - parseInt(_duration[0]) ; 
                        }

                        if(_duration[1].indexOf(':00') >= 0) {
                            _content.style.height =  `${_length * _hourHeight}px`;
                        } else {
                            _content.style.height = `${_length * _halfHeight}px`;
                        }
                    }
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