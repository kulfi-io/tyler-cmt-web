<template lang="pug">
    main.intro-register-vue
        div.content
            div.register-banner
                img.salutation( src="../assets/img/register.png")
                div.register-vue
                    form(id="register-form")
                        div.heading
                            span please provide all necessary information
                        div.form-group(class="split")
                            Username(class="split-half-left") 
                            Email( class="split-half-right" :readyToSubmit="readyToSubmit"
                            :tag="'email'"
                            :placeholder="'email'"
                            :title="'email is required'"
                            :label="'email'")
                        div.form-group(class="split")
                            Name(class="split-half-left" :readyToSubmit="readyToSubmit"
                            :tag="'first'"
                            :placeholder="'firstname'"
                            :title="'firstname is required'")
                            Name(class="split-half-left" :readyToSubmit="readyToSubmit"
                            :tag="'last'"
                            :placeholder="'lastname'"
                            :title="'lastname is required'")
                        div.form-group
                            PasswordSet(:readyToSubmit="readyToSubmit"
                            :tag="'password'"
                            :placeholder="'Password'"
                            :title="'Password is required'"
                            :label="'Password'")                     
                        div.form-group(class="submit")
                            button.form-control(type="submit" ref="submit") Register
</template>

<script lang="ts">
import Vue from 'vue';
import Username from './kulfi/username.vue';
import PasswordSet from './kulfi/password-set.vue';
import Email from './kulfi/email.vue';
import Name from './kulfi/name.vue';

export default Vue.extend({
    name: 'intro-register',
    components: {
        Username,
        PasswordSet,
        Email,
        Name
    }
})
</script>
