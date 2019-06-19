<template>
  <div id="home">
    <header-vue/>
    <full-page :options="options" id="fullpage">
      <div class="section page">
        <h3></h3>
      </div>
      <div class="section page">
        <h3>Section 2</h3>
      </div>
      <div class="section page">
        <h3>Section 3</h3>
      </div>
    </full-page>
    <footer-vue/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FullPage from "vue-fullpage.js/src/FullPage.vue";
import HeaderVue from "../components/header-vue.vue";
import FooterVue from "../components/footer-vue.vue";
export default Vue.extend({
  name: "home",
  components: {
    HeaderVue,
    FullPage,
    FooterVue
  },
  data() {
    return {
      options: {
        scrollOverflow: true,
        scrollBar: false,
        menu: "#menu",
        navigation: true,
        anchors: ["page1", "page2", "page3"],
        sectionsColor: ["#ba4744", "#c0dfd9", "#6534ff"],
        licenseKey: "002D6FD2-0EC343D4-9403ACA4-CB7CDBFB"
      }
    };
  }
});
</script>

