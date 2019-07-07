<template lang="pug">
    div.account-vue
        HeaderVue
        div.login-vue
            FullPage.fullpage( :options="options")
                div.section(class="page login ")
                  div.slide
                    AccountLogin
                  div.slide
                    ChangePassword
                  div.slide
                    ResetPassword
        FooterVue
</template>

<script lang="ts">
import Vue from 'vue';
import AccountLogin from '../components/account/account-login.vue';
import HeaderVue from '../components/header-vue.vue';
import FooterVue from '../components/footer-vue.vue';
import FullPage from 'vue-fullpage.js/src/FullPage.vue';
import ChangePassword from '../components/account/change-password.vue';
import ResetPassword from '../components/account/reset-password.vue';
export default Vue.extend({
    name: 'login',
    components: {
        AccountLogin,
        HeaderVue,
        FooterVue,
        FullPage,
        ChangePassword,
        ResetPassword,
    },
    data() {
    return {
      options: {
        scrollOverflow: false,
        scrollBar: false,
        menu: "#menu",
        navigation: false,
        controlArrows: false,
        anchors: ["login"],
        sectionsColor: ["#C8C8C8"],
        licenseKey: "002D6FD2-0EC343D4-9403ACA4-CB7CDBFB"
      }
    };
  },
})
</script>

