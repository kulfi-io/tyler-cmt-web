<template lang="pug">
    div.schedule-vue
        HeaderVue
        div.schedule-appointment-vue
            FullPage.fullpage( :options="options")
                div.section(class="page schedule-appointment")
                    ScheduleAppointmenVue
        FooterVue
</template>

<script lang="ts">
import Vue from "vue";
import FullPage from "vue-fullpage.js/src/FullPage.vue";
import HeaderVue from '../components/header-vue.vue';
import FooterVue from '../components/footer-vue.vue';
import ScheduleAppointmenVue from '../components/schedule/schedule.appointment.vue';

export default Vue.extend({
  name: "schedule",
  components: {
      HeaderVue,
      FooterVue,
      FullPage,
      ScheduleAppointmenVue,
  },
  data: () => {
    return {
      options: {
        scrollOverflow: true,
        scrollBar: false,
        navigation: false,
        controlArrows: true,
        slidesNavigation: true,
        anchors: ["appointment"],
        sectionsColor: ["#C8C8C8"],
        licenseKey: "002D6FD2-0EC343D4-9403ACA4-CB7CDBFB"
      }
    };
  }
});
</script>

