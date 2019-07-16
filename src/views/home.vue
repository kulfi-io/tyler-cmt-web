<template lang="pug">
  div.home
    HeaderVue
    FullPage.fullpage( :options="options")
      div(class="section page splash ")
        Splash
      div(class="section page collage ")
        Collage
      //- div(class="section page services")
      //-   h3 Services
      //- div(class="section page contact")
      //-   h3 Contact
    FooterVue
</template>


<script lang="ts">
import Vue from "vue";
import FullPage from "vue-fullpage.js/src/FullPage.vue";
import HeaderVue from "../components/header.vue";
import FooterVue from "../components/footer.vue";
import Splash from "../components/intro-splash.vue";
import Collage from "../components/intro-collage.vue";
import '../assets/sass/home.scss';

export default Vue.extend({
  name: "home",
  components: {
    HeaderVue,
    FullPage,
    FooterVue,
    Splash,
    Collage
  },
  data() {
    return {
      options: {
        scrollOverflow: false,
        scrollBar: false,
        menu: "#menu",
        navigation: false,
        anchors: ["splash", "collage"],
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

