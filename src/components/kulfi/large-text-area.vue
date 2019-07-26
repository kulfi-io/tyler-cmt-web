<template lang="pug">
    div.kulfi-text-area
        label.control-label( :for="`${tag}`") {{tag}}
            span.required-field(v-if="required") *
        div.input-group
            div.text-area(class="form-control" contenteditable="true"
            :id="`${tag}`" data-text="Note"
            )
            div.input-group-prepend
                span.input-group-text(v-if="required" class="required-field") *
                    font-awesome-icon.fa( class="text-muted" :icon="iconCheck")
</template>
<script lang="ts">
import Vue from 'vue';
import { IconDefinition } from '@fortawesome/fontawesome-free-solid';

export default Vue.extend({
    name: 'kulfi-name',
    props: ["tag", "title", "placeholder",  "required", "account"],
    computed: {
        iconCheck: function(): IconDefinition {
            return this.account.displayCheckIcon();
        }
    },
    mounted: function(){
        const _self = this;
        const _name = <HTMLInputElement>document.querySelector(`#${this.tag}-name`);
        

        // _name.addEventListener("keypress", function(e: Event) {
        //     var _elm = <HTMLInputElement>_name;

        //     if(_elm.value.length > 300) {
        //         e.preventDefault();
        //     }
        //     var _return = _self.validateInput(e as KeyboardEvent);
        //     if (!_return) {
        //         e.preventDefault();
        //     }
        // });

        // _name.addEventListener("keyup", function(e: Event) {
        //     const _isPartOfSet = _name.getAttribute('data-is-set');
        //     if(!_isPartOfSet) {
        //         _self.validateName(e.currentTarget as HTMLInputElement);
        //     }
        // });
    }
});
</script>
