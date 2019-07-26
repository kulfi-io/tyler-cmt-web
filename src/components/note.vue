<template lang="pug">
    div.note-vue
        div.portrait(ref="portrait")
            form(id="note-form-portrait")
                div.split
                    div.split-half-left
                        div.heading
                            span send us a note!
                        div.form-group
                            Email( 
                                :tag="'note-email'"
                                :placeholder="'email'"
                                :title="'email is required'"
                                :label="'email'" :account="account")
                        div.form-group
                            Name(
                                :tag="'note-first'"
                                :placeholder="'firstname'"
                                :title="'firstname is required'"
                                :account="account" :set="false")
                        div.form-group
                            Name(
                                :tag="'note-last'"
                                :placeholder="'lastname'"
                                :title="'lastname is required'"
                                :account="account" :set="false")
                        div.form-group
                            Area(
                                :tag="'note'"
                                :placeholder="'Note'"
                                :title="'Note is required'" :required="true"
                                :account="account")
                        div.form-group(class="submit")
                            button.form-control(class="submitter bg-muted" type="submit" id="send-note") Send
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
                        Email( 
                        :tag="'note-land-email'"
                        :placeholder="'email'"
                        :title="'email is required'"
                        :label="'email'" :account="account" )
                    div.split-third
                        Name(
                        :tag="'note-land-first'"
                        :placeholder="'firstname'"
                        :title="'firstname is required'"
                        :account="account")
                    div.split-third-end
                        Name(
                        :tag="'note-land-last'"
                        :placeholder="'lastname'"
                        :title="'lastname is required'"
                        :account="account")
                div.form-group
                        Area(
                        :tag="'land-note'"
                        :placeholder="'Note'"
                        :title="'Note is required'" :required="true"
                        :account="account")
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
import Library from '../library/account';

export default Vue.extend({
    name: 'note',
    components: {
        Email,
        Name,
        Area,
    },
    computed: {
        initAccount: function() {
            const _submitter = <Element>document.querySelector('#send-note');
            const _account =  new Library(_submitter, 4);
            this.$data.account = _account;
        }
    },
    data: function() {
        return {
            account: new Library()
        }
    },
    mounted: function() {

        this.initAccount;

        this.displayBasedOnOrientation();
        
        window.addEventListener("resize", (e: Event) => {
            this.displayBasedOnOrientation();
        })
    }, 
    methods: {

        validate: () => {
            console.log('validate');
        },
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
