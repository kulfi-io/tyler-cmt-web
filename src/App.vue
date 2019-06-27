<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Home from "./views/home.vue";
export default Vue.extend({
  name: "App",
});
</script>
