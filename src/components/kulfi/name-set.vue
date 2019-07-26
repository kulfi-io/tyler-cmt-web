<template lang="pug">
    div.kulfi-name-set
        div.split
            div.split-half-left
                Name(:tag="`first`" :title="'firstname is required'" 
                :label="'first'" :placeholder="'firstname'"
                :account="account" :set="true")     
            div.split-half-right
                Name(:tag="`last`" :title="'lastname is required'" 
                :label="'last'" :placeholder="'lastname'"
                :account="account" :set="true")   
</template>

<script lang="ts">
import Vue from 'vue';
import Name from './name.vue';
import { validKeyPair } from '@/library/account';
export default Vue.extend({
    name: 'name-set',
    components: {
        Name
    },
    computed: {
        account: function()  {
            return this.$parent.$data.account;
        }
    },
    mounted: function(){
        const _self = this;
        const _last = <Element>document.querySelector(`#last-name`);
        const _first = <Element>document.querySelector(`#first-name`);

        _last.addEventListener("keyup", function(e: Event) {
            _self.validateName(e.currentTarget as HTMLInputElement, 'last');
        });

        _first.addEventListener("keyup", function(e: Event) {
            _self.validateName(e.currentTarget as HTMLInputElement, 'first');
        });
    },
    methods: {
          validateName: function(elm: HTMLInputElement, name: string) {
            const _library = this.$parent.$data.account;

            const _parent = <Element>elm.closest('main');
            var _nameFa = <Element>_parent.querySelector(`.fa-${name}`);
            var _value = elm.value;

            _library.matched = /[A-Za-z]{3,25}/.test(_value);
            _library.matched? _library.passed(_nameFa) : _library.muted(_nameFa);

            const _pair: validKeyPair = {
                name: elm.id,
                value: _library.matched,
            }

            _library.validateComplete(_pair);

        }
    }

    
})
</script>

