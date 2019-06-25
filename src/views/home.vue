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
        scrollBar: false,
        menu: "#menu",
        navigation: true,
        anchors: ["intro", "about", "services"],
        sectionsColor: ["#1f0609", "#1f0609", "#1f0609"],
        licenseKey: "002D6FD2-0EC343D4-9403ACA4-CB7CDBFB"
      }
    };
  },
  mounted: function(){
    this.alignToTop();
  },
  methods: {
     alignToTop: function(){
        const _intro = document.querySelector('.swap-position');
        
        if(_intro) {
          const _cell = <HTMLDivElement>_intro.querySelector('.fp-tableCell');
          if(_cell) {
            _cell.classList.replace('fp-tableCell', 'swap-position-top')
          }
        }
    },
  }
  
});
</script>

