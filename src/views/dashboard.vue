<template lang="pug">
    div.dash
        HeaderVue
        FullPage.fullpage( :options="options")
            div(class="section page dashboard")
                Dashboard(:library="library")
        FooterVue
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderVue from '../components/header.vue';
import FooterVue from '../components/footer.vue';
import FullPage from "vue-fullpage.js/src/FullPage.vue";
import Dashboard from '../components/dashboard.vue';
import Options from '../library/fpOption';
import Library from '../library/dashboard';
import '../assets/sass/dashboard.scss';

const _options = new Options(['dashboard'], ['#C8C8C8']);

export default Vue.extend({
    name: 'dashboard-view',
    components: {
        HeaderVue,
        FooterVue,
        FullPage,
        Dashboard
    },
    data: () => {
        return {
            options: _options.Option,
            library: new Library(),
        }
    }
});
</script>



