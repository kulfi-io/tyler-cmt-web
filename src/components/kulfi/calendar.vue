<template lang="pug">
    div.calendar
        
</template>

<script lang="ts">
import Vue from 'vue';
import '@fullcalendar/core/main.min.css';
import '@fullcalendar/daygrid/main.min.css';
import '@fullcalendar/core/main.min.js';
import '@fullcalendar/daygrid/main.min.js';

export default Vue.extend({
    name: 'kulfi-calendar',
    props: ['tag'],
});
</script>


