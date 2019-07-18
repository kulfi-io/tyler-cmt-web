<template lang="pug">
    div.kulfi-text-area
        label.control-label( :for="`${tag}`") {{tag}}
            span.required-field(v-if="required") *
        div.input-group
            textarea.form-control(:required="required"
            :placeholder="placeholder" :title="title" 
            :id="`${tag}`" :ref="`${tag}`")
            div.input-group-prepend
                span.input-group-text(v-if="required" class="required-field") *
                    font-awesome-icon.fa( class="fa-base" :icon="iconCheck")
</template>

<script lang="ts">
import Vue from 'vue';
import { faCheck } from '@fortawesome/fontawesome-free-solid';

export default Vue.extend({
    name: 'kulfi-name',
    props: ["tag", "title", "placeholder", "readyToSubmit", "required"],
    computed: {
        iconCheck: function(){
            return faCheck;
        }
    },
});
</script>
