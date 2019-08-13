<template lang="pug">
    div.schedule-appointment
        div.schedule-background
        div.schedule-header
            div.schedule-navigation
                div.navigation(class="split")
                    div.split-half-left
                        button.form-control(ref="previous" ) prev
                    div.split-half-right
                        button.form-control( ref="next") next
                div.title
                    div.heading( ref="heading") {{ title() }}
                div.view(class="split")
                    div.split-half-left
                        button.form-control(ref="month" class="active") month
                    div.split-half-right
                        button.form-control(ref="week") week
        div.schedule-body
            form(id="schedule-appointment-form")
                div.content
                    div.calendar(ref="calendar")
        div.schedule-footer
            div.split
                div.split-half-left
                    a.heading(class="link" href="/dash") Account Information
                div.split-half-right(class="link-last")
                    a.heading(class="link" href="/note") Send a note
</template>

<script lang="ts">
import Vue from 'vue';
import Schedule from '../library/calendar' ;
import User from '../library/user';

export default Vue.extend({
    name: 'schedule-appointment',
    mounted: function() {
        const calendar = <HTMLDivElement>this.$refs.calendar;
        const previous = <HTMLButtonElement>this.$refs.previous;
        const next = <HTMLButtonElement>this.$refs.next;
        const heading = <HTMLDivElement>this.$refs.heading;
        const week = <HTMLButtonElement>this.$refs.week;
        const month = <HTMLButtonElement>this.$refs.month;

        const _user = new User('1', 'Lucy', 'Dog');
        Schedule.init(calendar, _user);
        previous.addEventListener('click', (e: Event) => {
            Schedule.previous(heading)
        });
        next.addEventListener('click', (e: Event) => {
            Schedule.next(heading);
        });
        week.addEventListener('click', (e: Event) => {
            Schedule.weekView(week, month);
        });
        month.addEventListener('click', (e: Event) => {
            Schedule.monthView(month, week);
        });

        window.addEventListener('resize', (e: Event) => {
            Schedule.refresh(_user);
        });
    },
    methods: {
        title: function(): string {
            return Schedule.title();
        },
       
    },
})
</script>
