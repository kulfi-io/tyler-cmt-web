<template>
    <b-col>
    <label :for="tag" class="control-label">
        {{ placeholder }}
        <span class="required-field">*</span>
    </label>
    <b-input-group>
        <b-input
        :id="tag"
        :ref="tag"
        type="text"
        :title="title"
        v-b-popover.hover="'At least 3 alpha characters are needed'"
        :placeholder="placeholder"
        required
        pattern="[A-Za-z]{3,25}"
        />
        <b-input-group-addon>
        <span class="input-group-text left">
            <i :id="`fa-${tag}`" class="fas fa-check fa-base" aria-hidden="true"></i>
        </span>
        </b-input-group-addon>
    </b-input-group>
    </b-col>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "kulfi-name",
    props: ['tag', 'title', 'placeholder', 'passed', 'muted', 'readyToSubmit'
    ],
    mounted: function() {
        var _self = this;
        var _input = this.$el.querySelector(`#${this.tag}`);
        
        if(_input) {
            _input.addEventListener("keyup", function(e: Event) {
                _self.validateName(e.currentTarget as HTMLInputElement);
            });

            _input.addEventListener("keypress", function(e: Event) {
                var _elm = <HTMLInputElement>e.currentTarget;
                if(_elm.value.length > 25) {
                    e.preventDefault();
                }
                var _return = _self.allowValidNameCharacters(e as KeyboardEvent);
                if (!_return) {
                 e.preventDefault();
                }
            });
        }
    },
    methods: {
        allowValidNameCharacters: function(event: KeyboardEvent): boolean {
            this.$parent.$data.matched = false;
            let _return = true;
            if (
                !(event.which >= 65 && event.which <= 90) &&
                !(event.which >= 97 && event.which <= 122)
            ) {
                _return = false;
            }

            return _return;
        },
         validateName: function(elm: HTMLInputElement): boolean {
            var _nameFa = document.querySelector(`#fa-${this.tag}`);
            var _value = elm.value;
            
            this.$parent.$data.matched = /[A-Za-z]{3,25}/.test(_value);
            this.$parent.$data.matched ? this.passed(_nameFa) : this.muted(_nameFa);

            this.readyToSubmit();
            return this.$parent.$data.matched;
        },
    }


})
</script>

