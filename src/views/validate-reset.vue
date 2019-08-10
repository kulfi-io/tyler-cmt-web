<template lang="pug">
    div.validate
        HeaderVue
        FullPage.fullpage( :options="options")
            div(class="section page reset")
                ValidateVue
        FooterVue
</template>

<script lang="ts">
import Vue from 'vue';
import ValidateVue from '../components/validate-password-reset.vue';
import HeaderVue from '../components/header.vue';
import FooterVue from '../components/footer.vue';
import FullPage from 'vue-fullpage.js/src/FullPage.vue';
import Option from '../library/fpOption';

const _validate = new Option(['validate']
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
            options: _validate.Option,
        };
    },
    
})
</script>





