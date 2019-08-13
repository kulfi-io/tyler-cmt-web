<template lang="pug">
    div.send-note
        div.send-note-background
        div.send-note-header
            div.title
                div.heading
                    p.greet(ref="greet") We want to hear from you
                    p.greet-sub send us a note!
        div.send-note-body
            div.content
                form(id="note-form")
                    div.form-group
                        Email( 
                            :tag="'note-email'"
                            :placeholder="'email'"
                            :title="'email is required'"
                            :label="'email'" :account="account"
                            :validKey="'email'")
                    div.form-group
                        Name(
                            :tag="'note-first'"
                            :placeholder="'firstname'"
                            :title="'firstname is required'"
                            :account="account" :set="false"
                            :validKey="'first'")
                    div.form-group
                        Name(
                            :tag="'note-last'"
                            :placeholder="'lastname'"
                            :title="'lastname is required'"
                            :account="account" :set="false"
                            :validKey="'last'")
                    div.form-group
                        Area(
                            :tag="'note'"
                            :placeholder="'Note'"
                            :title="'Note is required'" :required="true"
                            :account="account"
                            :validKey="'note'")
                    div.form-group(class="submit")
                        button.form-control(class="submitter bg-muted" type="submit" id="send-note") Send
        div.send-note-footer
            div.split
                div.split-half-left
                    a.heading(class="link" href="/dash") Account Information
                div.split-half-right(class="link-last")
                    a.heading(class="link" href="/schedule") Schedule an appointment
</template>

<script lang="ts">
import Vue from 'vue';
import Email from '../components/kulfi/email.vue';
import Name from '../components/kulfi/name.vue';
import Area from '../components/kulfi/large-text-area.vue';
import Library from '../library/account';

export default Vue.extend({
    name: 'send-note',
    components: {
        Email,
        Name,
        Area,
    },
    computed: {
        initAccount: function() {

            const _submitter= <Element>document.querySelector('#send-note');
            const _account =  <Library>this.$data.account;
            _account.readyToSubmit.submitter = _submitter;
            _account.readyToSubmit.max = 4;
            this.$data.account = _account;

            _submitter.addEventListener('click', this.$data.account.sendNote);

        }
    },
    data: function() {
        return {
            account: new Library(),
        }
    },
    mounted: function() {
        this.initAccount;
    }
});
</script>