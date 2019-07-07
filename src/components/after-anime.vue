<template lang="pug">
  div( ref="animevue")
</template>

<script lang="ts">
import Vue from "vue";
import lottie from "lottie-web";
export default Vue.extend({
  name: "anime-vue",
  props: {
    loop: Boolean,
    autoplay: Boolean,
    options: {
      type: Object,
      required: true
    }
  },
  mounted: function() {
    const _anime = lottie.loadAnimation({
      container: <HTMLElement>this.$refs.animevue,
      loop: this.loop,
      autoplay: this.autoplay,
      renderer: "svg",
      animationData: this.options.animationData,
      rendererSettings: this.options.rendererSettings
    });
    this.$emit("animation create", _anime);
  }
});
</script>

