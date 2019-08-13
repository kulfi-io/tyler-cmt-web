<template lang="pug">
    div.account-vue
        HeaderVue
        div.register-vue
            FullPage.fullpage(:options="options")
                div.section(class="page register")
                    AccountRegister
                    FooterVue
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderVue from '../components/header.vue';
import FooterVue from '../components/footer.vue';
import FullPage from 'vue-fullpage.js/src/FullPage.vue';
import AccountRegister from '../components/account/account-register.vue';
export default Vue.extend({
   name: 'register-view',
   components: {
       HeaderVue,
       FooterVue,
       FullPage,
       AccountRegister,
   },
   data: () => {
        return {
            options: {
                scrollOverflow: true,
                scrollBar: false,
                navigation: false,
                anchors: ["register"],
                sectionsColor: ["#C8C8C8"],
                licenseKey: "002D6FD2-0EC343D4-9403ACA4-CB7CDBFB"
            }
        };
    },
});
</script>

<style scoped>
.register-vue {
  animation-duration: 1s;
  animation-name: fadeIn;
  animation-timing-function: cubic-bezier(0.71, 0.55, 0.62, 1.57);
}
</style>


