<template lang="pug">
    div.appointment
        div.appointment-background
        div.appointment-header
             div.title
                div.heading
                    p.greet(ref="greet") Appointment
                    p.greet-sub schedule an appointment!
        div.appointment-body
            form(id="appointment-form")
                div.content
                    Slider
        div.appointment-footer
</template>

<script lang="ts">
import Vue from "vue";
import Slider from "./slider.vue";

export default Vue.extend({
  name: "appointment",
  components: {
    Slider
  }
});
</script>