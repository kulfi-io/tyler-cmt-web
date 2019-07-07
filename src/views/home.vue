<template lang="pug">
  div.home
    HeaderVue
    FullPage.fullpage( :options="options")
      div(class="section page intro ")
        BannerVue
      div(class="section page about ")
        About
      div(class="section page services")
        h3 Services
      div(class="section page contact")
        h3 Contact
    FooterVue
</template>


<script lang="ts">
import Vue from "vue";
import FullPage from "vue-fullpage.js/src/FullPage.vue";
import HeaderVue from "../components/header-vue.vue";
import FooterVue from "../components/footer-vue.vue";
import BannerVue from "../components/banner-vue.vue";
import About from "../components/intro-about.vue";

export default Vue.extend({
  name: "home",
  components: {
    HeaderVue,
    FullPage,
    FooterVue,
    BannerVue,
    About
  },
  data() {
    return {
      options: {
        scrollOverflow: false,
        scrollBar: false,
        menu: "#menu",
        navigation: false,
        anchors: ["intro", "about", "services"],
        // sectionsColor: ["#1f0609", "#7398c9",#1f0609", "#7496c7"],
        sectionsColor: ["#C8C8C8", "#C8C8C8", "#C8C8C8"],
        licenseKey: "002D6FD2-0EC343D4-9403ACA4-CB7CDBFB"
      }
    };
  },
  mounted: function() {
    const _targets = document.querySelectorAll(".swap-position");
    // Shared.methods.setCellPositionTop(_targets);
  }
});
</script>

