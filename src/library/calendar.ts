import { Calendar, View, EventInput, constrainPoint } from '@fullcalendar/core';
import DayGrid from '@fullcalendar/daygrid';
import TimeGrid from '@fullcalendar/timegrid';
import Interaction from '@fullcalendar/interaction';
import Event from './event';
import User from './user';
import Note from './note';

import '../assets/sass/schedule.scss';
import '@fullcalendar/daygrid/main.min.css';
import '@fullcalendar/timegrid/main.min.css';

export class Schedule {
    private calendar?: Calendar;
    private heading?: HTMLDivElement;
    private monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    private eventInputs?: EventInput[];

    public init = (target: HTMLDivElement, user: User): void => {
        if (target) {
            this.calendar = new Calendar(target, {
                plugins: [DayGrid, TimeGrid, Interaction],
                header: false,
                minTime: '09:00',
                maxTime: '24:00',
                allDaySlot: false,
                selectable: true,
                events: this.events(user),
            });

            this.calendar.render();
            this.resizeScroller();
        }
    }

    private events = (user: User): EventInput[] => {
        
        const _notes: Note[] = [
            new Note('note', 'back', 'my back is tight', '1', '1'),
            new Note('note', 'back 1', 'my back is tight 1', '2', '2'),
            new Note('note', 'back 2', 'my back is tight 2', '3', '3'),
            new Note('note', 'back 2', 'my back is tight 2', '3', '3'),
            new Note('note', 'back 4', 'my back is tight 4', '4', '4'),

        ]
        const _today = new Date('2019');
        const _events: Event[] = [
            new Event('Event 1', new Date("2019-07-12 10:00:00"), 60, user, _notes, 'First Event', '1'),
            new Event('Event 3', new Date('2019-07-12 12:00:00'), 60, user, _notes, 'Third Event', '2'),
            new Event('Event 4', new Date('2019-07-12 13:00:00'), 60, user, _notes, 'Fouth Event', '3'),
            new Event('Event 5', new Date("2019-07-12 15:00:00"), 60, user, _notes, 'Fifth Event', '4'),
            new Event('Event 6', new Date('2019-07-12 17:00:00'), 60, user, _notes, 'Sixth Event', '5'),
            new Event('Event 8', new Date('2019-07-12 18:00:00'), 60, user, _notes, 'Eighth Event', '6')
        ]

        const _inputs = [
            _events[0].eventInput,
            _events[1].eventInput,
            _events[2].eventInput,
            _events[3].eventInput,
            // _events[5].eventInput,
        ]

        this.eventInputs = _inputs;

        return this.eventInputs;
    }

    public title = (date?: Date): string => {

        date = date ? date : new Date();
        if(screen.width <= 411) {
            return `${this.monthNames[date.getMonth()].substr(0,3)}, ${date.getFullYear()}`;
        } 
        return `${this.monthNames[date.getMonth()]}, ${date.getFullYear()}`;
    }

    private setTitle = () => {
        if (this.heading) {
            if (this.calendar) {
                const _date = this.calendar.getDate();
                this.heading.innerText = this.title(_date);
            }
        }
    }

    public next = (heading: HTMLDivElement): void => {
        if (this.calendar) {
            this.calendar.next();
            this.heading = heading;
            this.setTitle();

            this.reposition();
        }
    }

    public previous = (heading: HTMLDivElement): void => {
        if (this.calendar) {
            this.calendar.prev();
            this.heading = heading;
            this.setTitle();

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
        let _lastStartPosition = _startPosition;
        let _lastInterval = 0;

        const _events = document.querySelectorAll('.fc-content-skeleton table tbody .fc-content-col .fc-time-grid-event');
        if(_events) {

            _events.forEach((event: Element)  => {
                const _event = <HTMLDivElement>event
                const _time = <HTMLDivElement>_event.querySelector('.fc-time');
            
                if(_time && _event) {
                    const _dataFull = _time.getAttribute('data-full');
                    
                    if(_dataFull) {

                        const _dataFullArray = _dataFull.split(' - ');
                        let _startTime = parseInt(_dataFullArray[0].replace('AM', '').replace('PM', ''));
                        let _endTime = parseInt(_dataFullArray[1].replace('AM', '').replace('PM', ''));

                        _event.removeAttribute('style');
                        let _style = `top: 41px; z-index: 1`;

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
                                
                            _style = `top: ${_interval * 41.5}px; z-index: 1`;
                        }

                        console.debug('start:', _startTime, ' lastPosition:', _lastStartPosition);
                        console.debug('interval:', _interval, ' lastInterval:', _lastInterval);
                        console.debug(' ------------------------- ');

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
       
        const _events = document.querySelectorAll('.fc-content-skeleton table tbody .fc-content-col .fc-time-grid-event');
        if(_events) {
            _events.forEach((event: Element) => {
                const _content = <HTMLDivElement>event.querySelector('.fc-content'); 
                
                const _time = <HTMLDivElement>event.querySelector('.fc-content .fc-time');
                if(_time) {
                    const _full = _time.getAttribute('data-full');
                    if(_full) {
                        const _duration = _full.replace('AM', '').replace('PM', '').split(' - ');
                        let _length = parseInt(_duration[1]) - parseInt(_duration[0]); 
                        
                        if(parseInt(_duration[0]) === 12) {
                            _length = (parseInt(_duration[1]) + 12) - parseInt(_duration[0]); 
                        }
                        
                        if(_duration[1].indexOf(':00') >= 0) {
                            _content.style.height =  `${_length * 37}px`;
                        } else {
                            _content.style.height = `${_length * 30}px`;
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