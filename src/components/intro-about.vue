<template>
  <div class="about-animation-vue">
    <people-collage/>
    <blockquote>
      Our anatomy is structured to work as a cohesive, singular being.
      <a
        href="/about"
        class="health detail"
      >read more...</a>
    </blockquote>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PeopleCollage from "../components/people-collage.vue";
export default Vue.extend({
  name: "intro-about",
  components: {
    PeopleCollage
  }
});
</script>