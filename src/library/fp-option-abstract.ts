import Config from '../config/config.json';

export abstract class FPOptions {
    protected fullpageLicenseKey: string;
    protected fullpageScrollOverflow: boolean;
    protected fullpageScrollBar: boolean;
    protected fullpageMenu: string;
    protected fullpageSectionsColor: string[];
    protected options?: Object;
    protected fullpageAnchors: string[];

    constructor(
        protected anchors: string[], protected sectionsColor:string[]
        , protected overflow: boolean=false, protected scrollBar: boolean=false
        , protected menu: string='#menu') {

        this.fullpageAnchors = anchors;
        this.fullpageMenu = menu;
        this.fullpageLicenseKey = Config.fullpage.key;
        this.fullpageScrollOverflow = overflow;
        this.fullpageScrollBar = scrollBar;
        this.fullpageSectionsColor = sectionsColor;
    }

    abstract initOptions(): Object;
}