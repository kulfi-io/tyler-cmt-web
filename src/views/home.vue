<template lang="pug">
  div.home
    HeaderVue
    FullPage.fullpage( :options="options")
      div(class="section page home")
        IntroHome(:animations="[homeTop, homeBottom]")
      div(class="section page vision")
        IntroVision(:animations="[visionTop, visionBottom]")
      div(class="section page login")
        IntroLogin
      div(class="section page register")
        IntroRegister
      div(class="section page contact")
        IntroContact
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
import IntroHome from "../components/intro-home.vue";
import IntroVision from "../components/intro-vision.vue";
import IntroLogin from '../components/intro-login.vue';
import IntroContact from '../components/intro-contact.vue';
import IntroRegister from '../components/intro-register.vue';
import Home from '../library/home';
import '../assets/sass/home.scss';

const _home = new Home(['home', 'vision', 'login', 'register', 'contact']
  , ['#C8C8C8', '#C8C8C8', '#C8C8C8', '#C8C8C8', '#C8C8C8]'])

export default Vue.extend({
  name: "home",
  components: {
    HeaderVue,
    FullPage,
    FooterVue,
    IntroHome,
    IntroVision,
    IntroLogin,
    IntroRegister,
    IntroContact
  },
  data() {
    return {
      options: _home.options,
      homeTop:  _home.findAnimation(`${_home.fullpageAnchors[0]}-top`),
      homeBottom: _home.findAnimation(`${_home.fullpageAnchors[0]}-bottom`),
      visionTop: _home.findAnimation(`${_home.fullpageAnchors[1]}-top`),
      visionBottom: _home.findAnimation(`${_home.fullpageAnchors[1]}-bottom`),

    };
  },
  mounted: function() {
    const _targets = document.querySelectorAll(".swap-position");
    // Shared.methods.setCellPositionTop(_targets);
  },
  
});
</script>

