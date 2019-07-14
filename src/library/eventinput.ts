export default class EventInput {
    id: string;
    title: string;
    description: string;
    start: string;
    end: string;


    constructor(id: string, title: string, description: string, start: string, end: string) {
        this.id = id;
        this.title= title;
        this.description = description;
        this.start = start.replace('\"','').replace('\"','');
        this.end = end.replace('\"','').replace('\"','');
    }
}