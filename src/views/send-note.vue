<template lang="pug">
    div.send-note-vue
        HeaderVue
        div.note-vue
            FullPage.fullpage( :options="options")
              div.section(class="page send-email")
                NoteVue
        FooterVue
</template>

<script lang="ts">
import Vue from "vue";
import FullPage from "vue-fullpage.js/src/FullPage.vue";
import HeaderVue from '../components/header.vue';
import FooterVue from '../components/footer.vue';
import NoteVue from '../components/send-note.vue';
import Option from '../library/fpOption';
import '../assets/sass/note.scss';

const _note = new Option(['send-email']
  , ['#C8C8C8']);

export default Vue.extend({
  name: "send-note-view",
  components: {
      HeaderVue,
      FooterVue,
      FullPage,
      NoteVue,
  },
  mounted: function() {
    // _note.start();
  },
  data: () => {
    return {
      options: _note.Option,
    }
  }
});
</script>

