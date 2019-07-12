import { Calendar, View } from '@fullcalendar/core';
import DayGrid from '@fullcalendar/daygrid';
import TimeGrid from '@fullcalendar/timegrid';
import Interaction from '@fullcalendar/interaction';
import moment from 'moment';

import '../assets/sass/schedule.scss';
import '@fullcalendar/daygrid/main.min.css';
import '@fullcalendar/timegrid/main.min.css';
import '@fullcalendar/core/main.min.js';
// import '@fullcalendar/daygrid/main.min.js';

export class Schedule {
    private calendar?: Calendar;
    private heading?: HTMLDivElement;
    private monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];


    public init = (target: HTMLDivElement): void => {
        if (target) {
            this.calendar = new Calendar(target, {
                plugins: [DayGrid, TimeGrid, Interaction],
                header: false,
                minTime: '10:00',
                maxTime: '23:59',
                allDaySlot: false,
                selectable: true,
            });

            this.calendar.render();
        }
    }

    public title = (): string => {
        const _date = new Date();
        return `${this.monthNames[_date.getMonth()]}, ${_date.getFullYear()}`;
    }

    private setTitle = () => {
        if (this.heading) {
            if (this.calendar) {
                const _date = this.calendar.getDate();
                const _title = `${this.monthNames[_date.getMonth()]}, ${_date.getFullYear()}`;
                this.heading.innerText = _title;
            }
        }
    }

    public next = (heading: HTMLDivElement): void => {
        if (this.calendar) {
            this.calendar.next();
            this.heading = heading;
            this.setTitle();
        }
    }

    public previous = (heading: HTMLDivElement): void => {
        if (this.calendar) {
            this.calendar.prev();
            this.heading = heading;
            this.setTitle();
        }
    }

    public weekView = (week: HTMLButtonElement, month: HTMLButtonElement): {} | undefined => {
        if (this.calendar) {
            this.calendar.changeView('timeGridWeek');
            this.calendar.getDate();

            week.classList.toggle('active');
            month.classList.toggle('active');
            
            this.addPastStyleWeekView();
            return this.dateRange();
        }
    }
    public monthView = (month: HTMLButtonElement, week: HTMLButtonElement): {} | undefined => {
        if (this.calendar) {
            this.calendar.changeView('dayGridMonth');
            this.calendar.getDate();

            week.classList.toggle('active');
            month.classList.toggle('active');

            return this.dateRange();
        }
    }

    private dateRange = (): {} | undefined => {
        if (this.calendar) {
            var _view = this.calendar.view;
            var _start = _view.activeStart;
            var _end = _view.activeEnd;

            var _range = {
                start: _start,
                end: _end
            };

            return _range;
        }
    }

    private addPastStyleWeekView = (): void  => {
       if(this.calendar) {
            if(this.calendar.state.viewType === 'timeGridWeek') {
                console.debug(this.calendar.state.viewType)
                const _theads = document.querySelectorAll(
                    '.fc-timeGrid-view th');
                const _days = document.querySelectorAll(
                    '.fc-timeGrid-view tbody .fc-time-grid table tbody .fc-day');

                if(_theads && _days) {
                    console.debug('theads', _theads.length)
                    console.debug('days', _days)
                    for( let i=0; i < _theads.length; i++) {
                        if(_theads[i].classList.contains('fc-past')) {
                            const _day = _days.item(i);
                            if(!_day.classList.contains('fc-past')) {
                                console.debug('day', _day.classList);
                            }
                        }
                    }
                }
            }
       }
    } 
        
}

export default new Schedule();