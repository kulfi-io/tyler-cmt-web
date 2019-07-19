<template lang="pug">
    div.note-vue
        div.portrait(ref="portrait")
            form(id="note-form-portrait")
                div.split
                    div.split-half-left
                        div.heading
                            span send us a note!
                        div.form-group
                            Email( :readyToSubmit="readyToSubmit"
                                :tag="'email'"
                                :placeholder="'email'"
                                :title="'email is required'"
                                :label="'email'")
                        div.form-group
                            Name(:readyToSubmit="readyToSubmit"
                                :tag="'first'"
                                :placeholder="'firstname'"
                                :title="'firstname is required'")
                        div.form-group
                            Name(:readyToSubmit="readyToSubmit"
                                :tag="'last'"
                                :placeholder="'lastname'"
                                :title="'lastname is required'")
                        div.form-group
                            Area(:readyToSubmit="readyToSubmit"
                                :tag="'Note'"
                                :placeholder="'Note'"
                                :title="'Note is required'" :required="true")
                        div.form-group(class="submit")
                            button.form-control(type="submit" ref="submit") Send
                    div.split-half-right
                        div.heading
                            span call us!
                        div.other-info
                            section
                                p.title Tyler Chamberlain, CMT
                                p 999 Sutter Street 
                                p San Francisco, CA 94109
                                p 415.275.0167
        div.landscape(ref="landscape" class="hide-element")
            form(id="note-form-landscape")
                div.heading
                    span send us a note!
                div.form-group(class="split")
                    div.split-third
                        Email( :readyToSubmit="readyToSubmit"
                        :tag="'email'"
                        :placeholder="'email'"
                        :title="'email is required'"
                        :label="'email'")
                    div.split-third
                        Name(:readyToSubmit="readyToSubmit"
                        :tag="'first'"
                        :placeholder="'firstname'"
                        :title="'firstname is required'")
                    div.split-third-end
                        Name(:readyToSubmit="readyToSubmit"
                        :tag="'last'"
                        :placeholder="'lastname'"
                        :title="'lastname is required'")
                div.form-group
                        Area(:readyToSubmit="readyToSubmit"
                        :tag="'Note'"
                        :placeholder="'Note'"
                        :title="'Note is required'" :required="true")
                div.form-group(class="submit")
                    button.form-control(type="submit" ref="submit") Send
                div.heading   
                    div.other-info
                        section
                            p.landscape-contact Tyler Chamberlain, CMT  |  999 Sutter Street, San Francisco, CA 94109 | 415.275.0167 
</template>

<script lang="ts">
import Vue from 'vue';
import Email from '../components/kulfi/email.vue';
import Name from '../components/kulfi/name.vue';
import Area from '../components/kulfi/large-text-area.vue';
export default Vue.extend({
    name: 'note',
    components: {
        Email,
        Name,
        Area,
    },
    mounted: function(){

        this.displayBasedOnOrientation();
        
        window.addEventListener("resize", (e: Event) => {
            this.displayBasedOnOrientation();
        })
    }, 
    methods: {

        displayBasedOnOrientation: function() {

            console.debug('resize');
            const _portrait = <HTMLDivElement>this.$refs.portrait;
            const _landscape = <HTMLDivElement>this.$refs.landscape;
            const _portraitClassList = _portrait.classList;
            const _landscapeClassList = _landscape.classList;

            if(window.screen.height <= 414) {
                console.debug(window.screen.height)
                
                if(!_portraitClassList.contains('hide-element')) {
                    _portrait.classList.add('hide-element');
                    console.debug('portrait', _portrait.className);
                    _landscape.classList.remove('hide-element');
                    console.debug('landscape', _landscape.className);

                }

            }
            else {
                if(!_landscapeClassList.contains('hide-element')) {
                    _landscape.classList.add('hide-element');
                    _portrait.classList.remove('hide-element');
                }
               

            }
            
        }
    }
});
</script>
