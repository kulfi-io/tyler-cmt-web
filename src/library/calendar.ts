import { Calendar, View } from '@fullcalendar/core';
import DayGrid from '@fullcalendar/daygrid';
import TimeGrid from '@fullcalendar/timegrid';
import Interaction from '@fullcalendar/interaction';
import moment from 'moment';

import '../assets/sass/schedule.scss';
import '@fullcalendar/daygrid/main.min.css';
import '@fullcalendar/timegrid/main.min.css';
import '@fullcalendar/core/main.min.js';

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

    public weekView = (week: HTMLButtonElement, month: HTMLButtonElement): void => {
        if (this.calendar) {
            this.calendar.changeView('timeGridWeek');
            this.calendar.getDate();

            week.classList.toggle('active');
            month.classList.toggle('active');
            
        }
    }
    public monthView = (month: HTMLButtonElement, week: HTMLButtonElement): void => {
        if (this.calendar) {
            this.calendar.changeView('dayGridMonth');
            this.calendar.getDate();

            week.classList.toggle('active');
            month.classList.toggle('active');
        }
    }
}

export default new Schedule();