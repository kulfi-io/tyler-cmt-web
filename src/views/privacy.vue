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

export default Vue.extend({
  name: 'privacy-view',
  components: {
    HeaderVue,
    Privacy,
    FooterVue
  },
  mounted: function(){
        this.$data.helper.displayloggedItems();
  },
  data: function(){
      return {
          helper: new Helper()
      }
  }
});
</script>

