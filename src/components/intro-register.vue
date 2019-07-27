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
                            Username(:account="account" class="split-half-left" ) 
                            Email( class="split-half-right" 
                            :tag="'register-email'"
                            :placeholder="'email'"
                            :title="'email is required'"
                            :label="'email'"
                            :account="account" :validKey="'email'")
                        div.form-group
                            NameSet
                        div.form-group
                            PasswordSet(
                            :tag="'password'"
                            :placeholder="'Password'"
                            :title="'Password is required'"
                            :label="'Password'"
                            )                     
                        div.form-group(class="submit")
                            button.form-control(id="register-account" class="submitter bg-muted" type="submit" ) Register
</template>

<script lang="ts">
import Vue from 'vue';
import Username from './kulfi/username.vue';
import PasswordSet from './kulfi/password-set.vue';
import Email from './kulfi/email.vue';
import NameSet from './kulfi/name-set.vue';
import Library from '../library/account';

export default Vue.extend({
    name: 'intro-register',
    computed: {
        initAccount: function() {
            const _submitter = <Element>document.querySelector('#register-account');
            const _account =  new Library(_submitter, 5);
            this.$data.account = _account;
        }

    },
    mounted: function(){
        this.initAccount;
    },
    data: function() {
        return {
            account: new Library()
        }
    },
    components: {
        Username,
        PasswordSet,
        Email,
        NameSet
    },

});
</script>
