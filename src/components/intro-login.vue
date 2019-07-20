<template lang="pug">
    main.intro-login-vue
        div.content
            div.login-banner
                img.salutation( src="../assets/img/login.png")
            div.split
                div.login-vue(class='split-60')
                    form(id="login-form")
                        div.heading
                            span login
                        div.split
                            div.split-half-left
                                Username
                            div.split-half-right
                                Password(:readyToSubmit="readyToSubmit"
                                :tag="'password'"
                                :placeholder="'Password'"
                                :title="'Password is required'"
                                :label="'Password'")
                        div-split
                            div.split-half-flush(class="split custom-control-input")
                                div.split-for-cb
                                    input.rememeber(type="checkbox" ref="remember")
                                div.split-for-label Remember me
                            div.split-half-flush
                        div.form-group(class="submit")
                            button.form-control(type="submit" ref="submit") Login
                div.reset-vue(class='split-flex-1')
                    form(id="reset-password-form")
                        div.heading
                            span reset password
                        div.split
                            div.parallel
                                Email( :readyToSubmit="readyToSubmit"
                                :tag="'email'"
                                :placeholder="'email'"
                                :title="'email is required'"
                                :label="'email'")
                        div-split
                            div.split-half-flush(class="split custom-control-input")
                            div.split-flex-1
                        div.form-group(class="submit")
                            button.form-control(type="submit" ref="submit") Send password reset email
</template>

<script lang="ts">
import Vue from 'vue';
import Username from './kulfi/username.vue';
import Password from './kulfi/password.vue';
import Email from './kulfi/email.vue';
export default Vue.extend({
    name: 'intro-login',
    components: {
        Username,
        Password,
        Email
    }
});
</script>
