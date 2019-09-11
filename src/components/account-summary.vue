<template lang="pug">
    div.account-summary-vue
        div.account-summary-background
        div.account-summary-header
            div.title
                div.heading
                    p.greet(ref="greet") Welcome back
                    p.greet-sub( class="today" ref="today")
        div.account-summary-body
            div.content
                div.split 
                    div.split-half-left
                        div.account-info
                            div.control-label Firstname
                            div.firstname( class="data" ref="firstname")
                    div.split-half-right
                        div.account-info
                            div.control-label Lastname                            
                            div.lastname( class="data" ref="lastname")
                div.split 
                    div.split-half-left
                        div.account-info
                            div.control-label Email
                            div.email( class="data" ref="email")
                    div.split-half-right
                        div.account-info
                            div.control-label Username                            
                            div.username( class="data" ref="username")
                div.split 
                    div.split-half-left
                        div.account-info
                            div.control-label Last appointment
                            div.last( class="data" ref="last-appt") Tue Jul 12 2019
                    div.split-half-right
                        div.account-info
                            div.control-label Next appointment                            
                            div.next( class="data" ref="next-appt") Sun Sep 12 2019
                div.notes
                    div.account-info
                            div.control-label Meeting notes
                            div.note-list( class="data" ref="note-list")
                                p This is the first note
                                p This is the second note
                                p This is the third note
                                p This is the fourth note
                                p This is the fifth note
        div.account-summary-footer
            div.split
                div.split-half-left
                    a.heading(class="link" href="/note") Send a note
                div.split-half-right(class="link-last")
                    a.heading(class="link" href="/schedule") Schedule an appointment
</template>

<script lang="ts">
import Vue from 'vue';
import Library from '../library/account-summary';

export default Vue.extend({
    name: 'account-summary',
    mounted: function() {
        this.$data.library.start();
    },
    data: function() {
        return {
            library: new Library()
        }
    }

});
</script>