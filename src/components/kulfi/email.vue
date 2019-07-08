<template lang="pug">
    div.Kulfi-email
        label.control-label( for="email") Email
            span.required-field *
        div.input-group(role="group")
            input.form-control( type="text" id="email" 
            ref="email" title="Email is required" 
            placeholder="email" required pattern="[\S-]+@([\S-]+\.)+[\S-]+")
            div.input-group-prepend
                span.input-group-text(class="left")
                    font-awesome-icon.fa( class="fa-base" :icon="iconEnvelope")
</template>

<script lang="ts">
import Vue from 'vue';
import Library from '../../library/account';
import { faEnvelope } from '@fortawesome/fontawesome-free-solid';

export default Vue.extend({
    name: 'kulfi-email',
    props: ['readyToSubmit'],
    computed: {
        iconEnvelope: function() {
            return faEnvelope
        }
    }
})
</script>
