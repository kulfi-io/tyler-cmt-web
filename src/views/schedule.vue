<template lang="pug">
  div.schedule-vue
    HeaderVue
    div.schedule-appointment-vue
      FullPage.fullpage( :options="options")
        div.section(class="page schedule")
          div.slide(class="calendar")
            ScheduleAppointmenVue
          div.slide(class="appointment")
            Appointment
    FooterVue
</template>

<script lang="ts">
import Vue from "vue";
import FullPage from "vue-fullpage.js/src/FullPage.vue";
import HeaderVue from "../components/header.vue";
import FooterVue from "../components/footer.vue";
import ScheduleAppointmenVue from "../components/schedule-appointment.vue";
import Appointment from "../components/appointment.vue";
import Option from "../library/fpOption";

const _schedule = new Option(['schedule'], ['#C8C8C8']);

export default Vue.extend({
  name: "schedule-view",
  components: {
    HeaderVue,
    FooterVue,
    FullPage,
    ScheduleAppointmenVue,
    Appointment
  },
  data: () => {
    return {
      options: _schedule.Option
    };
  }
});
</script>

