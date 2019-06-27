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

<style lang="scss" scoped>
.about-animation-vue {
  
  color: #515769;
  padding-top: 10%;
  padding-left: 12%;
  padding-right: 10%;
  padding-bottom: 5%;
  animation-duration: 1s;
  animation-name: fadeIn;
  animation-timing-function: cubic-bezier(0.71, 0.55, 0.62, 1.57);

  blockquote {
    margin: 0.5rem 0 1rem;
    position: relative;
    font-family: "Sanchez", serif;
    font-size: 2em;
    line-height: 1.5em;
    font-style: italic;
  }

  .detail {
    text-decoration: none;
    font-size: small;
    font-family: sans-serif;
    text-transform: capitalize;
    white-space: nowrap;
  }
}
</style>

