<template lang="pug">
    div.account-summary
        HeaderVue
        FullPage.fullpage( :options="options")
            div(class="section page account-summary")
                AccountSummary()
        FooterVue
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderVue from '../components/header.vue';
import FooterVue from '../components/footer.vue';
import FullPage from "vue-fullpage.js/src/FullPage.vue";
import AccountSummary from '../components/account-summary.vue';
import Options from '../library/fpOption';
import '../assets/sass/account-summary.scss';

const _options = new Options(['account-summary'], ['#C8C8C8']);

export default Vue.extend({
    name: 'summary-view',
    components: {
        HeaderVue,
        FooterVue,
        FullPage,
        AccountSummary
    },
    data: () => {
        return {
            options: _options.Option,
        }
    }
});
</script>



