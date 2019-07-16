<template lang="pug">
    div.intro-collage-vue
      //- div.People-text
      //-   AfterAnime(:options="People" :loop="false" :autoplay="true")
      //- div.collage-image
      //-   AfterAnime(:options="Collage" :loop="false" :autoplay="true")
      AfterAnime.people-text(:options="People" :loop="false" :autoplay="true")
      AfterAnime.collage-image(:options="Collage" :loop="false" :autoplay="true")
      div.quote
        blockquote Our anatomy is structured to work as a cohesive, singular being.         
          a.detail(class="health" href="about") read more...
</template>

<script lang="ts">
import Vue from "vue";
import CollageData from '../assets/animations/collage.json';
import PeopleData from '../assets/animations/about-banner.json';
import AfterAnime from './after-anime.vue';
export default Vue.extend({
  name: "intro-about",
  components: {
    AfterAnime,
  },
   data: function() {
    return {
      Collage: {
        animationData: CollageData
      },
      People: {
        animationData: PeopleData
      }
     
    };
  }
});
</script>