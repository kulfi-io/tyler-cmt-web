<template lang="pug">
    div.change-password
        div.account
        AccountHeader(:target="'change-password'" :title="'Change Password'" )
        InfoVue
        div.account-body
            form(id="account-form")
                div.content
                    div.form-group
                        EmailVue
                    div.form-group
                        PasswordSet(:readyToSubmit="readyToSubmit"
                        :tag="'password'"
                        :placeholder="'Pass'"
                        :title="'Password is required'"
                        :label="'Password'")
                div.form-group(class="submit")
                    button.form-control(type="submit" ref="submit") Change Password
        AccountFooter       
</template>

<script lang="ts">
import Vue from 'vue';
import EmailVue from '../kulfi/email.vue';
import InfoVue from '../kulfi/info.vue';
import PasswordSet from '../kulfi/password-set.vue';
import AccountHeader from './account-header.vue';
import AccountFooter from './account-footer.vue';
export default Vue.extend({
    name: 'forgot-password',
    props: ["tag", "title", "placeholder", "readyToSubmit", "label"],
    components: {
        AccountFooter,
        AccountHeader,
        InfoVue,
        PasswordSet,
        EmailVue,
    }
});
</script>

