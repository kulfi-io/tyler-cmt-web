<template lang="pug">
    div.kulfi-password-set
        div.split
            div.split-half-left
                PasswordVue(:tag="tag" :title="title" 
                :label="label" :placeholder="placeholder"
                :readyToSubmit="readyToSubmit")     
            div.split-half-right
                PasswordVue(:tag="`verify-${tag}`" :title="title"
                :label="'verify'" :placeholder="placeholder"
                :readyToSubmit="readyToSubmit")
        div.instructions
            div.split
                div.text-muted( class="split-left")
                    small.form-text(class="form-text" id="pwd-length") At least 8 characters long (max of 15).
                div.text-muted( class="split-right")
                    small.form-text(class="form-text" id="pwd-match") Password matches.
            div.full    
                div.text-muted
                    small.form-text(class="form-text" id="pwd-upper") Contains at least 1 upper case.
                    small.form-text(class="form-text" id="pwd-lower") Contains at least 1 lower case.
                    small.form-text(class="form-text" id="pwd-number") Contains at least 1 number.
                    small.form-text(class="form-text" id="pwd-special") Contains at least 1 special [!@#$%] character.
</template>

<script lang="ts">
import Vue from 'vue';
import Library from '../../library/account';
import PasswordVue from '../kulfi/password.vue';
export default Vue.extend({
    name: 'kulfi-password-set',
    props: ["tag", "title", "placeholder", "readyToSubmit", "label"],
    components: {
        PasswordVue,
    }
});
</script>
