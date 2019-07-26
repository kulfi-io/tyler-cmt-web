<template lang="pug">
    div.Kulfi-email
        label.control-label( for="email") Email
            span.required-field *
        div.input-group(role="group")
            input.form-control( type="text" :id="tag" 
            ref="email" title="Email is required" 
            placeholder="email" required pattern="[\S-]+@([\S-]+\.)+[\S-]+")
            div.input-group-prepend
                span.input-group-text(class="required-field") *
                    font-awesome-icon.fa-email( class="fa text-muted" :icon="iconEnvelope")
</template>

<script lang="ts">
import Vue from 'vue';
import { validKeyPair } from '../../library/account';
import { IconDefinition } from '@fortawesome/fontawesome-free-solid';

export default Vue.extend({
    name: 'kulfi-email',
    props: ['tag', 'account'],
    computed: {
        iconEnvelope: function(): IconDefinition {
            return this.account.displayEnvelopIcon();
        }
    },
    mounted: function() {
        const _self = this;
        const _email = <Element>this.$refs.email;
        
        _email.addEventListener("keyup", function(e: Event) {
            _self.validateEmail(e.currentTarget as HTMLInputElement);
        });

        _email.addEventListener("keypress", function(e: Event) {
            var _return = _self.validateInput(e as KeyboardEvent);
            if (!_return) {
                e.preventDefault();
            }
        });

    },
    methods: {

        validateInput: function(event: KeyboardEvent): boolean {
            let _return = true;
            if (
                !(event.which >= 64 && event.which <= 90) &&
                !(event.which >= 97 && event.which <= 122) &&
                !(event.which >= 48 && event.which <= 57) &&
                !(event.which == 64) &&
                !(event.which == 46)
            ) {
                _return = false;
            }

            return _return;
        },
        validateEmail: function(elm: HTMLInputElement) {
            const _library = this.account;
            const _parent = <Element>elm.closest('main');
            const _emailFa = <Element>_parent.querySelector(".fa-email");
            const _value = elm.value;
            const _pattern = elm.getAttribute('pattern');


            _library.matched = /[\S-]+@([\S-]+\.)+[\S-]+/.test(_value);
            _library.matched ? _library.passed(_emailFa) : _library.muted(_emailFa);

            const _pair: validKeyPair = {
                name: `${this.tag}`,
                value: _library.matched
            }

            _library.validateComplete(_pair);

            
        }
    } 

})
</script>
