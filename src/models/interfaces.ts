import { View } from '@fullcalendar/core';

export interface IMicroService {
    name: string;
    scheme: string;
    baseEndpoint: string;
    port: number;
    token: string;
    endpoints: IEndpoint[];
}

export interface IEndpoint {
    name: string;
    endpoint: string;
}

export interface IAppointmentMessage {
    title: string;
    location: string;
}

export interface IMailerUser {
    userId?: string;
    email?: string;
    username?: string;
    token?: string;
}

export interface INote {
    email?: string;
    firstname?: string;
    lastname?: string;
    content?: string;
}

export interface ICookie {
    secret: string;
    expiration: IExpiration;
}

export interface IExpiration {
    duration: IDuration[];
    selected: string;
}

export interface IDuration {
    name: string;
    value: string;
}


export interface IResetAccount {
    email: string;
}

export interface IResetRequest extends IResetAccount {
    firstname: string,
    lastname: string,
    username: string,
    token: string;
}

export interface IReset extends IResetAccount {
    username: string;
    token: string;
    password: string;
}

export interface IVerifyLogin {
    username: string,
    password: string,
    token: string
}

export interface ILogin {
    username: string;
    password: string;
}

export interface IRegisterUser {
    id?: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    username: string;
    type: string;
    active?: boolean
}

export interface IUserType {
    id: string;
    display: string;
    description: string;
    active: boolean | string;
}

export interface IUser {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: IUserType;
    active: boolean;
    tokenValidated: boolean;
    validationToken: string;
}

export interface ICookieUser {
    id: string;
    fullname: string
}

export interface ICalendarUser {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
}

export interface IMeetingNote {
    title: string;
    display: string;
    detail: string;
    id: string;
}

export interface IMeetingNoteUser extends IMeetingNote {
    user: ICalendarEvent
}

export interface ICalendarEvent {
    id: string;
    start: Date;
    end: Date;
    title: string;
    description: string;
    meetingNotes: IMeetingNote[],
    user: ICalendarUser
}

export interface IEventRange {
    start: Date | string;
    end: Date | string;
}

export interface ICalTime {
    dateTime: string;
    timeZone: string;
}

export interface IAttendee {
    email: string;
    responseStatus?: string;
}


export interface ICalEventResponse  {
    id?: string;
    summary?: string;
    location?: string;
    description?: string;
    start?: ICalTime;
    end?: ICalTime;
    attendees?: IAttendee[]
}


export interface IDayRenderArg {
    view: View;
    date: Date;
    allDay?: boolean;
    el: HTMLElement;
}

export interface IDayClickArgs {
    date: Date;
    dateStr: string;
    allDay: boolean;
    resource?: any;
    dayEl: HTMLElement;
    jsEvent: MouseEvent;
    view: View;
}

