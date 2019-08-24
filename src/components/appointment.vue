<template lang="pug">
    div.appointment
        div.appointment-background
        div.appointment-header
          div.title
            div.heading
              p.greet(ref="greet") Appointment
              p.greet-sub schedule an appointment!
        div.appointment-body
          div.content
            form(id="appointment-form")
              div.slider
                Slider
              div.appt-title
                input.form-control(type="text"   
                  placeholder="Title" title="Title" 
                  id="title") 
              div.appt-location
                input.form-control(type="text"   
                  placeholder="Location" title="Location" 
                  id="location") 
              div.time-duration(class="split")
                div.split-half-left
                  input.form-control(type="text"  disabled 
                  placeholder="time" title="Time" 
                  id="time") 
                div.split-half-right
                  input.form-control(type="text"   
                  placeholder="duration" title="duration" 
                  id="duration") 
              div.text-area(class="form-control" contenteditable="true"
                id="comment" data-text="comment")
              div.form-group(class="submit")
                button.form-control(class="submitter bg-muted" type="submit" id="create-meeting") Schedule Appointment
        div.appointment-footer
</template>

<script lang="ts">
import Vue from "vue";
import Slider from "./slider.vue";
import { Appointment } from "../library/appointment";

export default Vue.extend({
  name: "appointment",
  components: {
    Slider
  },
  data: function() {
    return {
      library: typeof Appointment
    };
  },
  mounted: function() {
    this.$data.library = new Appointment();
  }
});
</script>