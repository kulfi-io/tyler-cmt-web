<template lang="pug">
    div.validate
        HeaderVue
        FullPage.fullpage( :options="options")
            div(class="section page validate")
                ValidateVue
        FooterVue
</template>

<script lang="ts">
import Vue from 'vue';
import ValidateVue from '../components/validate-login.vue';
import HeaderVue from '../components/header.vue';
import FooterVue from '../components/footer.vue';
import FullPage from 'vue-fullpage.js/src/FullPage.vue';
import Validate from '../library/validate';

const _validate = new Validate(['validate']
  , ['#C8C8C8']);

export default Vue.extend({
    name: 'about',
    components: {
        HeaderVue,
        ValidateVue,
        FooterVue,
        FullPage
    },
    data() {
        return {
            options: _validate.options,
        };
    },
    
})
</script>





