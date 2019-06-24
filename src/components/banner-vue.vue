<template>
  <main itemid="#home">
    <header class="banner initial" role="banner">
      <h2>
        Providing soothing and healing massage
        <br>
        for everyone
      </h2>
      <p class="sub-main health">
        Expert care coupled with excellent
        <a class="health" href="/service/">service</a> at a reasonable price.
      </p>
    </header>
  </main>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "banner-vue"
});
</script>

<style>
main {
  color: #515769;
  margin-bottom: 0;
}

h2 {
  animation-duration: 5s;
  animation-name: fadeIn;
  animation-timing-function: cubic-bezier(0.71, 0.55, 0.62, 1.57);
}

.excite {
  font-style: italic;
}

.sub-main {
  color: #f7f7f7;
  animation-duration: 8s;
  animation-name: fadeIn;
  animation-timing-function: cubic-bezier(0.71, 0.55, 0.62, 1.57);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.health {
  color: #0ba360;
}
</style>


