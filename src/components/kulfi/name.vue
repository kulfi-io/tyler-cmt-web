<template lang="pug">
    div.kulfi.name
        label.control-label( :for="`${tag}-name`") {{tag}}-name
            span.required-field *
        div.input-group
            input.form-control(type="text" pattern="[A-Za-z]{3,25}" required 
            :placeholder="placeholder" :title="title" 
            :id="`${tag}-name`" :ref="`${tag}-name`")
            div.input-group-prepend
                span.input-group-text(class="required-field") *
                    font-awesome-icon.fa( class="fa-base" :icon="iconCheck")
</template>

<script lang="ts">
import Vue from 'vue';
import { faCheck } from '@fortawesome/fontawesome-free-solid';

export default Vue.extend({
    name: 'kulfi-name',
    props: ["tag", "title", "placeholder", "readyToSubmit"],
    computed: {
        iconCheck: function(){
        return faCheck;
        }
    },
});
</script>

