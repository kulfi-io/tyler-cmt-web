<template lang="pug">
    div.account-vue
        HeaderVue
        div.login-vue
            FullPage.fullpage( :options="options")
                div(class="section page fp-login ")
                    AccountLogin
        FooterVue
</template>

<script lang="ts">
import Vue from 'vue';
import AccountLogin from '../components/account-login.vue';
import HeaderVue from '../components/header-vue.vue';
import FooterVue from '../components/footer-vue.vue';
import FullPage from 'vue-fullpage.js/src/FullPage.vue';
export default Vue.extend({
    name: 'login',
    components: {
        AccountLogin,
        HeaderVue,
        FooterVue,
        FullPage
    },
    data() {
    return {
      options: {
        scrollOverflow: false,
        scrollBar: false,
        menu: "#menu",
        navigation: false,
        anchors: ["fp-login"],
        sectionsColor: ["#C8C8C8"],
        licenseKey: "002D6FD2-0EC343D4-9403ACA4-CB7CDBFB"
      }
    };
  },
})
</script>

