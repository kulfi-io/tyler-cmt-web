import CalendarEventService from '../microservices/calendar-event';
import DayGrid from '@fullcalendar/daygrid';
import Interaction from '@fullcalendar/interaction';
import moment from 'moment';
import TimeGrid from '@fullcalendar/timegrid';
import { Calendar, EventInput } from '@fullcalendar/core';
import { cryptor } from './cryptor';
import { IAttendee, ICalendarUser, ICalEventResponse } from '../models/interfaces';
import '../assets/sass/schedule.scss';
import '@fullcalendar/daygrid/main.min.css';
import '@fullcalendar/timegrid/main.min.css';



export class Schedule extends cryptor{
    private calendar?: Calendar;
    private heading?: HTMLDivElement;
    private monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    private eventInputs?: EventInput[];
    private lineHeight = 1.5;
    private lineHeightPxEquivalent = 12.775;

    public refresh = (user?: ICalendarUser): void => {
        if(this.calendar) {

            const _calendar = this.calendar;
            this.calendar.destroy();
            this.setCalendarConfig(_calendar.el);
            
            if(this.calendar) {
                this.calendar.state = _calendar.state;
                this.calendar.changeView(_calendar.state.viewType);
                this.calendar.render();
                this.resizeScroller();
                this.insertTotal();
            }
        }
    }

    private setCalendarConfig(target: HTMLElement) {
        
        this.calendar = new Calendar(target, {
            plugins: [DayGrid, TimeGrid, Interaction],
            header: false,
            minTime: '10:00',
            maxTime: '24:00',
            allDaySlot: false,
            selectable: true,
            events: this.eventInputs,
        });

       
    }

    public init = (target: HTMLDivElement, user?: ICalendarUser): void => {
        
        if (target) {
            this.targetEvents()
            .then(() => {
                this.setCalendarConfig(target);
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
    public calTitle = (date?: Date): string => {

        date = date ? date : new Date();
        if(screen.width <= 411) {
            return `${this.monthNames[date.getMonth()].substr(0,3)}, ${date.getFullYear()}`;
        } 
        return `${this.monthNames[date.getMonth()]}, ${date.getFullYear()}`;
    }

    private setCalTitle = () => {
        if (this.heading) {
            if (this.calendar) {
                const _date = this.calendar.getDate();
                this.heading.innerText = this.calTitle(_date);
            }
        }
    }

    public next = (heading: HTMLDivElement): void => {
        if (this.calendar) {
            this.calendar.next();
            this.heading = heading;
            this.setCalTitle();

            this.reposition();
        }
    }

    public previous = (heading: HTMLDivElement): void => {
        if (this.calendar) {
            this.calendar.prev();
            this.heading = heading;
            this.setCalTitle();

            this.reposition();
        }
    }

    public weekView = (week: HTMLButtonElement, month: HTMLButtonElement): void => {
        if (this.calendar) {
            this.calendar.changeView('timeGridWeek');
            this.calendar.getDate();

            week.classList.toggle('active');
            month.classList.toggle('active');
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

                        // console.debug('start:', _startTime, ' lastPosition:', _lastStartPosition);
                        // console.debug('interval:', _interval, ' lastInterval:', _lastInterval);
                        // console.debug(' ------------------------- ');

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
    
    public monthView = (month: HTMLButtonElement, week: HTMLButtonElement): void => {
        if (this.calendar) {
            this.calendar.changeView('dayGridMonth');
            this.calendar.getDate();

            week.classList.toggle('active');
            month.classList.toggle('active');

            this.resizeScroller();
        }
    }
}

export default new Schedule();