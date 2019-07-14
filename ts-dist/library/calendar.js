import { Calendar } from '@fullcalendar/core';
import DayGrid from '@fullcalendar/daygrid';
import TimeGrid from '@fullcalendar/timegrid';
import Interaction from '@fullcalendar/interaction';
import Event from './event';
import Note from './note';
import '../assets/sass/schedule.scss';
import '@fullcalendar/daygrid/main.min.css';
import '@fullcalendar/timegrid/main.min.css';
export class Schedule {
    constructor() {
        this.monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        this.init = (target, user) => {
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
            }
        };
        this.events = (user) => {
            const _notes = [
                new Note('note', 'back', 'my back is tight', '1', '1'),
                new Note('note', 'back 1', 'my back is tight 1', '2', '2'),
                new Note('note', 'back 2', 'my back is tight 2', '3', '3'),
                new Note('note', 'back 2', 'my back is tight 2', '3', '3'),
                new Note('note', 'back 4', 'my back is tight 4', '4', '4'),
            ];
            const _today = new Date('2019');
            const _events = [
                new Event('Event 1', new Date("2019-07-12 10:00:00"), 60, user, _notes, 'First Event'),
                new Event('Event 3', new Date('2019-07-12 12:00:00'), 60, user, _notes, 'Third Event'),
                new Event('Event 4', new Date('2019-07-12 13:00:00'), 60, user, _notes, 'Fouth Event'),
                new Event('Event 5', new Date("2019-07-12 14:00:00"), 60, user, _notes, 'Fifth Event'),
                new Event('Event 6', new Date('2019-07-12 15:00:00'), 60, user, _notes, 'Sixth Event'),
                new Event('Event 8', new Date('2019-07-12 16:00:00'), 60, user, _notes, 'Eighth Event')
            ];
            console.debug(_events);
            const _inputs = [
                _events[0].eventInput,
                _events[1].eventInput,
                _events[2].eventInput,
                _events[3].eventInput,
                _events[4].eventInput,
            ];
            return _inputs;
        };
        this.title = () => {
            const _date = new Date();
            return `${this.monthNames[_date.getMonth()]}, ${_date.getFullYear()}`;
        };
        this.setTitle = () => {
            if (this.heading) {
                if (this.calendar) {
                    const _date = this.calendar.getDate();
                    const _title = `${this.monthNames[_date.getMonth()]}, ${_date.getFullYear()}`;
                    this.heading.innerText = _title;
                }
            }
        };
        this.next = (heading) => {
            if (this.calendar) {
                this.calendar.next();
                this.heading = heading;
                this.setTitle();
            }
        };
        this.previous = (heading) => {
            if (this.calendar) {
                this.calendar.prev();
                this.heading = heading;
                this.setTitle();
            }
        };
        this.weekView = (week, month) => {
            if (this.calendar) {
                this.calendar.changeView('timeGridWeek');
                this.calendar.getDate();
                week.classList.toggle('active');
                month.classList.toggle('active');
                const _scrollerList = document.querySelectorAll('.fc-scroller');
                if (_scrollerList) {
                    _scrollerList.forEach((item) => {
                        const _scroller = item;
                        _scroller.style.height = 'inherit';
                    });
                }
                this.setEventContentContainerSize();
            }
        };
        this.setEventContentContainerSize = () => {
            const start = 10;
            const end = 24;
            let pastPosition = 0;
            const _events = document.querySelectorAll('.fc-content-skeleton table tbody .fc-content-col .fc-time-grid-event');
            if (_events) {
                _events.forEach((event) => {
                    const _content = event.querySelector('.fc-content');
                    const _time = event.querySelector('.fc-content .fc-time');
                    if (_time) {
                        const _full = _time.getAttribute('data-full');
                        if (_full) {
                            const _duration = _full.replace('AM', '').replace('PM', '').split(' - ');
                            let _length = parseInt(_duration[1]) - parseInt(_duration[0]);
                            if (parseInt(_duration[0]) === 12) {
                                _length = (parseInt(_duration[1]) + 12) - parseInt(_duration[0]);
                            }
                            if (_duration[1].indexOf(':00') >= 0) {
                                _content.style.height = `${_length * 37}px`;
                            }
                            else {
                                _content.style.height = `${_length * 30}px`;
                            }
                            if (start === parseInt(_duration[0])) {
                                event.setAttribute('style', 'top: 40px; z-index: 1');
                            }
                            else {
                                let _increment = parseInt(_duration[0]) - start;
                                event.removeAttribute('style');
                                event.setAttribute('style', `top: ${_incerment * }40px; z-index: 1`);
                                // _content.style.top = `${_increment * 40}px`
                                // _content.style.zIndex = '1';
                            }
                        }
                    }
                });
            }
        };
        this.monthView = (month, week) => {
            if (this.calendar) {
                this.calendar.changeView('dayGridMonth');
                this.calendar.getDate();
                week.classList.toggle('active');
                month.classList.toggle('active');
            }
        };
    }
}
export default new Schedule();
//# sourceMappingURL=calendar.js.map