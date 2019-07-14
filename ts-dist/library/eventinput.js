export default class EventInput {
    constructor(title, description, start, end) {
        this.title = title;
        this.description = description;
        this.start = start.replace('\"', '').replace('\"', '');
        this.end = end.replace('\"', '').replace('\"', '');
    }
}
//# sourceMappingURL=eventinput.js.map