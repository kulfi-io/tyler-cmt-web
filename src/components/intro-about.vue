<template>
  <div class="intro-about-vue">
    <div class="banner"/>
    <after-anime :options="People" :loop="false" :autoplay="true"/>
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
import PeopleData from '../assets/animations/collage.json';
import AfterAnime from './after-anime.vue';
export default Vue.extend({
  name: "intro-about",
  components: {
    AfterAnime,
  },
   data: function() {
    return {
      People: {
        animationData: PeopleData
      },
     
    };
  }
});
</script>