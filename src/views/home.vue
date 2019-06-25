<template lang="pug">
  div.home
    HeaderVue
    FullPage.fullpage( :options="options")
      div(class="section page swap-position")
        IntroAnimation
        BannerVue
      div(class="section page about")
        h3 Section 2
      div(class="section page services")
        h3 Section 3
    FooterVue
</template>


<script lang="ts">
import Vue from "vue";
import FullPage from "vue-fullpage.js/src/FullPage.vue";
import HeaderVue from "../components/header-vue.vue";
import FooterVue from "../components/footer-vue.vue";
import IntroAnimation from "../components/intro-animation.vue";
import BannerVue from '../components/banner-vue.vue';
import Shared from '../shared';



export default Vue.extend({
  name: "home",
  components: {
    HeaderVue,
    FullPage,
    FooterVue,
    IntroAnimation,
    BannerVue,
  },
  data() {
    return {
      options: {
        scrollOverflow: false,
        scrollBar: true,
        menu: "#menu",
        navigation: true,
        anchors: ["intro", "about", "services"],
        sectionsColor: ["#1f0609", "#b99256", "#7496c7"],
        licenseKey: "002D6FD2-0EC343D4-9403ACA4-CB7CDBFB"
      }
    };
  },
  mounted: function(){
    const _target = <HTMLDivElement>document.querySelector('.swap-position');
    Shared.methods.setCellPositionTop(_target);
  }
  
});
</script>

