<template lang="pug">
  div.slider
    div.container
      div.range-slider
        div.bullet(id="bullet" ) 10:00 am
        div.availability Open
        input.range-line(id="range-line"  type="range" value="10" min="10" max="23")
      div.box-minmax
        div.split
          div.split-half-left 10:00 am
          div.split-half-right 11:00 pm
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "slider",
});
</script>