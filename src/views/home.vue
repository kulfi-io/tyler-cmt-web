<template lang="pug">
  div.home
    HeaderVue
    FullPage.fullpage( :options="options")
      div(class="section page splash")
        Splash(:animations="[splashTop, splashBottom]")
      div(class="section page collage")
        Collage(:animations="[collageTop, collageBottom]")
      div(class="section page contact")
        Contact
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
import Contact from '../components/intro-contact.vue';
import Home from '../library/home';
import '../assets/sass/home.scss';

const _home = new Home(['splash', 'collage', 'contact']
  , ['#C8C8C8', '#C8C8C8', '#C8C8C8'])

export default Vue.extend({
  name: "home",
  components: {
    HeaderVue,
    FullPage,
    FooterVue,
    Splash,
    Collage,
    Contact
  },
  data() {
    return {
      options: _home.options,
      splashTop:  _home.findAnimation('splash-top'),
      splashBottom: _home.findAnimation('splash-bottom'),
      collageTop: _home.findAnimation('collage-top'),
      collageBottom: _home.findAnimation('collage-bottom'),

    };
  },
  mounted: function() {
    const _targets = document.querySelectorAll(".swap-position");
    // Shared.methods.setCellPositionTop(_targets);
  },
  
});
</script>

