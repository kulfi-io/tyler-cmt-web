<template>
    <div id="app">
        <home />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Home from './views/home.vue';
export default Vue.extend({
    name: 'App',
    components: {
        Home
    }
    
});
</script>

