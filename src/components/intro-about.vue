<template lang="pug">
    div.intro-about-vue
      div.about-banner
        AfterAnime(:options="About" :loop="false" :autoplay="true")
      div.collage
        AfterAnime(:options="People" :loop="false" :autoplay="true")
      div.quote
        blockquote Our anatomy is structured to work as a cohesive, singular being.
        a.detail(class="health" href="about") read more...
</template>

<script lang="ts">
import Vue from "vue";
import PeopleData from '../assets/animations/collage.json';
import AboutData from '../assets/animations/about-banner.json';
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
      About: {
        animationData: AboutData
      }
     
    };
  }
});
</script>