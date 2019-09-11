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
import Helper from '../library/helper';
import NavHelper from '../library/nav-helper';


export default Vue.extend({
  name: 'privacy-view',
  components: {
    HeaderVue,
    Privacy,
    FooterVue
  },
  mounted: function(){
    this.$data.helper.displayloggedItems();
    this.$data.helper.attachNavEvents();
    NavHelper.setActiveNavItem('privacy');
  },
  data: function(){
      return {
          helper: new Helper()
      }
  }
});
</script>

