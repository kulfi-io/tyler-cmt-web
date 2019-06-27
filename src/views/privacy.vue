<template lang="pug">
    div.privacy
      HeaderVue
      PrivacyVue
      FooterVue
</template>

<script lang="ts">
import Vue from "vue";
import PrivacyVue from '../components/privacy-vue.vue';
import HeaderVue from '../components/header-vue.vue';
import FooterVue from '../components/footer-vue.vue';

export default Vue.extend({
  name: 'privacy',
  components: {
    HeaderVue,
    PrivacyVue,
    FooterVue
  }
});
</script>

