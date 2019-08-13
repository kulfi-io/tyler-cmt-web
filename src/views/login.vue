<template lang="pug">
    div.account-vue
        HeaderVue
        div.login-vue
            FullPage.fullpage( :options="options")
                div.section(class="page login")
                  div.slide
                    AccountLogin
                  div.slide
                    ResetPassword
                  div.slide
                    ChangePassword
        FooterVue
</template>

<script lang="ts">
import Vue from 'vue';
import AccountLogin from '../components/account/account-login.vue';
import HeaderVue from '../components/header.vue';
import FooterVue from '../components/footer.vue';
import FullPage from 'vue-fullpage.js/src/FullPage.vue';
import ChangePassword from '../components/account/change-password.vue';
import ResetPassword from '../components/account/reset-password.vue';
export default Vue.extend({
    name: 'login-view',
    components: {
        AccountLogin,
        HeaderVue,
        FooterVue,
        FullPage,
        ChangePassword,
        ResetPassword,
    },
    data:  ()=>{
    return {
      options: {
        scrollOverflow: false,
        scrollBar: false,
        navigation: false,
        controlArrows: true,
        slidesNavigation: true,
        anchors: ["login"],
        sectionsColor: ["#C8C8C8"],
        licenseKey: "002D6FD2-0EC343D4-9403ACA4-CB7CDBFB"
      }
    };
  },
})
</script>

<style scoped>
.login-vue {
  animation-duration: 1s;
  animation-name: fadeIn;
  animation-timing-function: cubic-bezier(0.71, 0.55, 0.62, 1.57);
}
</style>


