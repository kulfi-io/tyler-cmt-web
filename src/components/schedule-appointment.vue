<template lang="pug">
    div.schedule-appointment
        div.schedule-background
        div.schedule-header
            div.schedule-navigation
                div.navigation(class="split")
                    div.split-half-left
                        button.form-control(ref="previous" class="previous") prev
                    div.split-half-right
                        button.form-control( ref="next" class="next") next
                div.title
                    div.heading(class="cal-title" ref="heading") 
                div.view(class="split")
                    div.split-half-left
                        button.form-control(ref="month" class="active" class="month") month
                    div.split-half-right
                        button.form-control(ref="week" class="week") week
        div.schedule-body
            div.content
                form(id="schedule-appointment-form")
                    div.calendar(ref="calendar")
                    div.schedule-popup(id="schedule-popup" ref="schedule-popup")
                        div.popup
                            div.title Schedule Appointment
                            div.body
                                div.name(class="info") 
                                div.location(class="info") 
                                div.date(class="info") 
                                div.split
                                    div.split-half-left
                                        a.heading(class="link select-time" href="#") select time 
                                    div.split-half-right(class="link-last")
                                        a.heading(class="link cancel" href="#") Cancel 
        div.schedule-footer
            div.split
                div.split-half-left
                    a.heading(class="link" href="/dash") Account Information
                div.split-half-right(class="link-last")
                    a.heading(class="link" href="/note") Send a note
</template>

<script lang="ts">
import Vue from 'vue';
import {Schedule} from '../library/calendar' ;

export default Vue.extend({
    name: 'schedule-appointment',
    data: function() {
        return {
            schedule: typeof Schedule,
        }
    },
    mounted: function() {
        const calendar = <HTMLDivElement>this.$refs.calendar;
        const _data = this.$parent.$data;
        this.$data.schedule = new Schedule(calendar, this.$parent.$data);
        this.$data.schedule.init();
        
    }
})
</script>
