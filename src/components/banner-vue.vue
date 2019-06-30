<template>
  <main class="intro-banner">
    <div class="bb-wrapper">
      <after-anime class="body-banner" :options="Massage" :loop="false" :autoplay="true"/>
    </div>
    <div class="masg-wrapper">
      <after-anime class="massage-banner" :options="Body" :loop="false" :autoplay="true"/>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import BodyData from "../assets/animations/intro-banner.json";
import MassageData from "../assets/animations/massage.json";
import AfterAnime from './after-anime.vue';
export default Vue.extend({
  name: "banner-vue",
  components: {
    AfterAnime
  },
  data: function() {
    return {
      Body: {
        animationData: BodyData
      },
      Massage: {
        animationData: MassageData
      }
    };
  }
});
</script>
