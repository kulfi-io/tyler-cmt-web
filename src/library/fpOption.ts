import { FPOptions } from './fp-option-abstract';

export default class FPOption extends FPOptions {
    
    constructor(anchors: string[], sectionsColor:string[]
        , overflow: boolean=false, scrollBar: boolean=false
        , menu: string='#menu'){
            
        super(anchors, sectionsColor, overflow
            ,scrollBar, menu);
        this.options = this.initOptions();
    }

    public get Option() : Object {
        return <Object>this.options;
    }

    initOptions = (): Object => {
        const options = {
            scrollOverflow: this.fullpageScrollOverflow,
            scrollBar: this.fullpageScrollBar,
            menu: this.fullpageMenu,
            anchors: this.fullpageAnchors,
            sectionsColor: this.fullpageSectionsColor,
            licenseKey: this.fullpageLicenseKey
        }

        return options;
    }
}