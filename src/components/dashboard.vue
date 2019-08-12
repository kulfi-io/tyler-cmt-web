<template lang="pug">
    div.dashboard-vue
        div.header
            div.greeting
                div.salutation
                    p.greet(ref="greet") Welcome back
                    p.today(ref="today")
        div.content
            div.heading Account Information
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
                    div.control-label Notes
                    div.note-list( class="data" ref="note-list")
                        p This is the first note
                        p This is the second note
                        p This is the third note
                        p This is the fourth note
                        p This is the fifth note

        div.footer
            div.split
                div.split-half-left
                    div.heading Contact
                div.split-half-right
                    div.heading Schedule

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'dashboard',
    props: ['library'],
    mounted: function() {
        // const _today = <HTMLElement>this.$refs.today;
        // const _greet = <HTMLElement>this.$refs.greet;
        // const _first = <HTMLElement>this.$refs.firstname;
        
        // _today.innerText = this.library.today;
        // _greet.innerText += ` ${this.library.fullname}!`;
        // console.debug('account', new Date().toLocaleTimeString());
        // // _first.innerText = this.library.user.firstName;
    },
    methods: {
    }
});
</script>