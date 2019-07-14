import moment from 'moment';
import EventInput from './eventinput';
export default class Event {
    constructor(name, fullDate, duration, user, notes, description) {
        this.name = name;
        this.fullDate = fullDate;
        this.formatFullDate = moment(this.fullDate).format('llll');
        this.startTime = moment(this.fullDate).format('"YYYY-MM-DD HH:mm:ss"');
        this.endTime = moment(this.fullDate).add(duration, 'minutes').format('"YYYY-MM-DD HH:mm:ss"');
        this.day = moment(this.fullDate).format('ll');
        this.user = user;
        this.notes = notes;
        this.description = description;
        this.eventInput = new EventInput(this.name, this.description, this.startTime, this.endTime);
    }
}
//# sourceMappingURL=event.js.map