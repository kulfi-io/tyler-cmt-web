<template lang="pug">
    div.schedule-appointment
        div.schedule
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
        ScheduleFooter
</template>

<script lang="ts">
import Vue from 'vue';
import ScheduleHeader from './schedule-header.vue';
import ScheduleFooter from './schedule-footer.vue';
import CalendarVue from '../kulfi/calendar.vue';
import Schedule from '../../library/calendar';

export default Vue.extend({
    name: 'schedule-appointment',
    components: {
        ScheduleHeader,
        ScheduleFooter,
        CalendarVue,
    },
    mounted: function() {
        const calendar = <HTMLDivElement>this.$refs.calendar;
        const previous = <HTMLButtonElement>this.$refs.previous;
        const next = <HTMLButtonElement>this.$refs.next;
        const heading = <HTMLDivElement>this.$refs.heading;
        const week = <HTMLButtonElement>this.$refs.week;
        const month = <HTMLButtonElement>this.$refs.month;

        Schedule.init(calendar);
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
    },
    methods: {
        title: function(): string {
            return Schedule.title();
        },
       
    },
})
</script>
