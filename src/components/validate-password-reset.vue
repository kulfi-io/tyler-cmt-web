<template lang="pug">
    main.reset-password-vue
        div.content
            div.reset-banner
                img.salutation( src="../assets/img/validate.png")
                div.reset-vue
                    form(id="validate-reset-form")
                        div.heading
                            span Reset password validation
                        div.token
                            Token
                        div.form-group(class="split")
                            Username(:account="account" class="split-half-left" ) 
                            Email( class="split-half-right" 
                            :tag="'email'"
                            :placeholder="'email'"
                            :title="'email is required'"
                            :label="'email'"
                            :account="account" :validKey="'email'")
                        div.form-group
                            PasswordSet(
                            :tag="'password'"
                            :placeholder="'New Password'"
                            :title="'Password is required'"
                            :label="'Password'" :account="account"
                            )   
                        div.split
                            div.split-half-flush(class="split custom-control-input")
                                div.split-for-cb(class="checkbox")
                                    input(type="checkbox" value="None" class="kulfi-cb" id="kulfi-cb" ref="remember")
                                    label(for="kulfi-cb")
                                div.split-for-label Remember me
                            div.split-half-flush
                        div.form-group(class="submit")
                            button.form-control(class="submitter bg-muted" type="submit" id="reset-account") validate
</template>

<script lang="ts">
import Vue from 'vue';
import Username from './kulfi/username.vue'
import PasswordSet from './kulfi/password-set.vue';
import Email from './kulfi/email.vue';
import Token from './kulfi/token.vue';
import '../assets/sass/validate.scss';
import Library from '../library/account';

export default Vue.extend({
    name: 'validate-reset-password',
    components: {
        Username,
        PasswordSet,
        Email,
        Token,
    },  
    computed: {
        initResetAccount: function() {
            const _submitter = <Element>document.querySelector('#reset-account');
            const _account = <Library>this.$data.account;
            _account.readyToSubmit.submitter = _submitter;
            _account.readyToSubmit.max = 3;

            _submitter.addEventListener('click', _account.resetUser);

            this.$data.account = _account;
        },
    },
    mounted: function(){
        this.initResetAccount;
    },
    data: function() {
        return {
            account: new Library(),
        }
    },
});
</script>
