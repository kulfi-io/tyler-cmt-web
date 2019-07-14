export default class Note {
    title: string;
    subject: string;
    body: string;
    userId: string;
    id: string;

    constructor(title: string, subject: string, body: string, userId: string, id: string) {
        this.title = title;
        this.subject = subject;
        this.body = body;
        this.userId = userId;
        this.id = id;
    }
}
