<template lang="pug">
  main.intro-splash-vue
    div.top-wrapper
      AfterAnime.top-banner(:options="Top" :loop="false" :autoplay="true")
    div.bottom-wrapper
      AfterAnime.bottom-banner(:options="Bottom" :loop="false" :autoplay="true")
</template>


<script lang="ts">
import Vue from "vue";
import BottomData from "../assets/animations/intro-banner.json";
import TopData from "../assets/animations/splash-top.json";
import AfterAnime from './after-anime.vue';
export default Vue.extend({
  name: "spash-vue",
  components: {
    AfterAnime,
  },
  data: function() {
    return {
      Bottom: {
        animationData: BottomData
      },
      Top: {
        animationData: TopData
      }
    };
  }
});
</script>
