import Config from '../config/config.json'

export default class Home {
    private fullpageLicenseKey: string;
    private fullpageScrollOverflow: boolean;
    private fullpageScrollBar: boolean;
    private fullpageMenu: string;
    private fullpageSectionsColor: string[];
    private fullPageConfig: { "key": string; };
    public options: Object;
    public fullpageAnchors: string[];

    constructor(anchors: string[], sectionsColor:string[], overflow: boolean=false, scrollBar: boolean=false, menu: string='#menu') {
        this.fullPageConfig = Config.fullpage;
        this.fullpageLicenseKey = this.fullPageConfig.key;
        this.fullpageScrollOverflow = overflow;
        this.fullpageScrollBar = scrollBar;
        this.fullpageMenu = menu;
        this.fullpageAnchors = anchors;
        this.fullpageSectionsColor = sectionsColor;
        this.options = this.initOptions();
    }

    private initOptions = (): Object => {
        const options = {
            scrollOverflow: this.fullpageScrollOverflow,
            scrollBar: this.fullpageScrollBar,
            menu: this.fullpageMenu,
            anchors: this.fullpageAnchors,
            sectionsColor: this.fullpageSectionsColor,
            licenseKey: this.fullpageLicenseKey,
        }

        return options;
    }

   
}