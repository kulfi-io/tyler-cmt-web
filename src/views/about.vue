<template lang="pug">
    div.about
        HeaderVue
        AboutVue
        FooterVue
</template>

<script lang="ts">
import Vue from 'vue';
import AboutVue from '../components/about-vue.vue';
import HeaderVue from '../components/header-vue.vue';
import FooterVue from '../components/footer-vue.vue';
export default Vue.extend({
    name: 'about',
    components: {
        HeaderVue,
        AboutVue,
        FooterVue
    },
    
})
</script>





