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
                    div.split()
                        div.split-third(class='email note')
                        div.split-third(class='first note')
                        div.splitflex-1(class='last note')
                    div.form-group
                        input.form-control(class='subject' type='text' placeholder='Subject' required)
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
import Area from '../components/kulfi/large-text-area.vue';
import Library from '../library/account';
import { SendNote } from '../library/sendNote';

export default Vue.extend({
    name: 'send-note',
    components: {
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

        },
        initNote: function() {
            const _note = new SendNote();
            this.$data.note = _note;
        }
    },
    data: function() {
        return {
            account: new Library(),
            note: typeof SendNote
        }
    },
    mounted: function() {
        this.initAccount;
        this.initNote;
    }
});
</script>