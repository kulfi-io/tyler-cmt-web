<template lang="pug">
    div.about
        HeaderVue
        AboutVue
        FooterVue
</template>

<script lang="ts">
import Vue from 'vue';
import AboutVue from '../components/about.vue';
import HeaderVue from '../components/header.vue';
import FooterVue from '../components/footer.vue';
export default Vue.extend({
    name: 'about-view',
    components: {
        HeaderVue,
        AboutVue,
        FooterVue
    },
    
})
</script>





