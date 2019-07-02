<template>
  <div :style="style" ref="animevue"></div>
</template>

<script lang="ts">
import Vue from "vue";
import lottie from "lottie-web";
export default Vue.extend({
  name: "anime-vue",
  props: {
    loop: Boolean,
    height: String,
    width: String,
    autoplay: Boolean,
    options: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      style: {
        width: this.width ? `${this.width}px` : "100%",
        height: this.height ? `${this.height}px` : "100%",
        // overflow: "hidden",
        // margin: "0 auto",
      }
    };
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

