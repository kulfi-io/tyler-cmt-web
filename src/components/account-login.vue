<template lang="pug">
    div.account-vue
        div.account
        div.account-header
            h3.title Login
            p
                a(href="/register") Register
                span  account
        InfoVue
        div.account-body
            form(id="account-form")
                div.form-group
                    TokenVue
                div.form-group-login(class="split")
                    UsernameVue(class="split-half") 
                    PasswordVue( class="split-half" :readyToSubmit="readyToSubmit"
                    :tag="'password'"
                    :placeholder="'Pass'"
                    :title="'Password is required'"
                    :label="'Password'")
                div.split
                    div.split-half-flush(class="split custom-control-input")
                        div.split-for-cb
                            input.rememeber(type="checkbox" ref="remember")
                        div.split-for-label Remember me
                    div.split-half-flush
                        a(href="forgot") Forgot Password
                div.form-group(class="submit")
                    button.form-control(type="submit" ref="submit") Login
        div.account-footer
            span.required-field * 
            br
            span.required-field - required

</template>

<script lang="ts">
import Vue from 'vue';
import '../assets/sass/account.scss';
import InfoVue from './kulfi/info.vue';
import TokenVue from './kulfi/token.vue';
import UsernameVue from './kulfi/username.vue';
import PasswordVue from './kulfi/password.vue';

export default Vue.extend({
    name: 'account-login',
    components: {
        InfoVue,
        TokenVue,
        UsernameVue,
        PasswordVue,
    }
});
</script>

