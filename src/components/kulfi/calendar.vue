<template lang="pug">
    div.calendar
        
</template>

<script lang="ts">
import Vue from 'vue';
// import Schedule from '../../library/calendar';
import '@fullcalendar/core/main.min.css';
import '@fullcalendar/daygrid/main.min.css';
import '@fullcalendar/core/main.min.js';
import '@fullcalendar/daygrid/main.min.js';

export default Vue.extend({
    name: 'kulfi-calendar',
    props: ['tag'],
    // mounted: function(){
    //     let schedule: Schedule;
    //     const _calendar = document.querySelector('.calendar');

    //     if(_calendar) {
    //         schedule = new Schedule(_calendar as HTMLDivElement)
    //         schedule.init();
    //     }
    // }
});
</script>


