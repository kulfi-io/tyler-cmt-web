<template lang="pug">
    div.privacy
      HeaderVue
      Privacy
      FooterVue
</template>

<script lang="ts">
import Vue from "vue";
import Privacy from '../components/privacy.vue';
import HeaderVue from '../components/header.vue';
import FooterVue from '../components/footer.vue';

export default Vue.extend({
  name: 'privacy',
  components: {
    HeaderVue,
    Privacy,
    FooterVue
  }
});
</script>

