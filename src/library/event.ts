import moment from 'moment';
// import Note from './note';
// import User from './user';
import EventInput from './eventinput';

export default class Event {
    name: string;
    startTime: string
    endTime: string;
    day: string;
    private fullDate: Date;
    formatFullDate: string;
    // user: User;
    description: string;
    // notes: Note[];
    eventInput: EventInput;

    
    // constructor(name: string, fullDate: Date, duration: number, user: User
    //     , notes: Note[], description: string, inputId: string) {
    //         this.name = name;
    //         this.fullDate = fullDate;
    //         this.formatFullDate = moment(this.fullDate).format('llll');
    //         this.startTime = moment(this.fullDate).format('"YYYY-MM-DD HH:mm:ss"') ;
    //         this.endTime = moment(this.fullDate).add(duration, 'minutes').format('"YYYY-MM-DD HH:mm:ss"') ;
    //         this.day = moment(this.fullDate).format('ll');
    //         this.user = user;
    //         this.notes = notes;
    //         this.description = description;
    //         this.eventInput = new EventInput(inputId,this.name, this.description, this.startTime, this.endTime)
            

    // }

    constructor(name: string, fullDate: Date, duration: number
        , description: string, inputId: string) {
            this.name = name;
            this.fullDate = fullDate;
            this.formatFullDate = moment(this.fullDate).format('llll');
            this.startTime = moment(this.fullDate).format('"YYYY-MM-DD HH:mm:ss"') ;
            this.endTime = moment(this.fullDate).add(duration, 'minutes').format('"YYYY-MM-DD HH:mm:ss"') ;
            this.day = moment(this.fullDate).format('ll');
            // this.user = user;
            // this.notes = notes;
            this.description = description;
            this.eventInput = new EventInput(inputId,this.name, this.description, this.startTime, this.endTime)
            

    }

}

