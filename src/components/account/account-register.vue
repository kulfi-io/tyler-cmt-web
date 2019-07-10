<template lang="pug">
    div.account-register
        div.account
        AccountHeader(:target="'login'" :title="'register'" :href="'login'" :hrefLabel="'login'" :subtext="' to account'")
        InfoVue
        div.account-body
            form(id="register-form")
                div.content
                    div.form-group(class="split")
                        UsernameVue(class="split-half-left") 
                        EmailVue( class="split-half-right" :readyToSubmit="readyToSubmit"
                        :tag="'email'"
                        :placeholder="'email'"
                        :title="'email is required'"
                        :label="'email'")
                    div.form-group(class="split")
                        NameVue(class="split-half-left" :readyToSubmit="readyToSubmit"
                        :tag="'first'"
                        :placeholder="'firstname'"
                        :title="'firstname is required'")
                        NameVue(class="split-half-left" :readyToSubmit="readyToSubmit"
                        :tag="'last'"
                        :placeholder="'lastname'"
                        :title="'lastname is required'")
                    div.form-group
                        PasswordSetVue(:readyToSubmit="readyToSubmit"
                        :tag="'password'"
                        :placeholder="'Password'"
                        :title="'Password is required'"
                        :label="'Password'")                     
                div.form-group(class="submit")
                    button.form-control(type="submit" ref="submit") Register
        AccountFooter
</template>

<script lang="ts">
import Vue from 'vue';
import AccountHeader from './account-header.vue';
import AccountFooter from './account-footer.vue';
import InfoVue from '../kulfi/info.vue';
import UsernameVue from '../kulfi/username.vue';
import PasswordSetVue from '../kulfi/password-set.vue';
import EmailVue from '../kulfi/email.vue';
import NameVue from '../kulfi/name.vue';


export default Vue.extend({
    name: 'account-register',
    components: {
        AccountHeader,
        AccountFooter,
        UsernameVue,
        PasswordSetVue,
        EmailVue,
        NameVue,
        InfoVue,
    }
});
</script>

