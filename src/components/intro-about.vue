<template>
  <div class="intro-about-vue">
    <div class="banner"/>
    <div class="collage"/>
    <div class="quote">
      <blockquote>
        Our anatomy is structured to work as a cohesive, singular being.
        <a
          href="/about"
          class="health detail"
        >read more...</a>
      </blockquote>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PeopleCollage from "../components/people-collage.vue";
export default Vue.extend({
  name: "intro-about"
});
</script>