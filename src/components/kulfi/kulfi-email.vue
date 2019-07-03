<template>
    <b-col>
        <label for="email" class="control-label">
            Email
            <span class="required-field">*</span>
        </label>
        <b-input-group>
            <b-input
            type="text"
            id="email"
            ref="email"
            title="Email is required"
            v-b-popover.hover="'valid email format(ie: user@user.com)'"
            placeholder="Email"
            required
            pattern="[\S-]+@([\S-]+\.)+[\S-]+"
            />
            <b-input-group-addon>
            <span class="input-group-text left">
                <i id="fa-email" class="fas fa-envelope fa-base" aria-hidden="true"></i>
            </span>
            </b-input-group-addon>
        </b-input-group>
    </b-col>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "kulfi-email",
    props: ['passed', 'muted', 'readyToSubmit'],
    mounted: function() {
        var _self = this;
        var _email = this.$el.querySelector("#email");

        if (_email) {
            _email.addEventListener("keyup", function(e: Event) {
                _self.validateEmail(e.currentTarget as HTMLInputElement);
            });

            _email.addEventListener("keypress", function(e: Event) {
                var _return = _self.allowValidEmailCharacters(e as KeyboardEvent);
                if (!_return) {
                    e.preventDefault();
                }
            });
        }

    },
    methods: {
        allowValidEmailCharacters: function(event: KeyboardEvent): boolean {
            this.$parent.$data.matched = false;
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
        validateEmail: function(elm: HTMLInputElement): boolean {
            var _emailFa = document.getElementById("fa-email");
            var _value = elm.value;

            this.$parent.$data.matched = /[\S-]+@([\S-]+\.)+[\S-]+/.test(_value);
            this.$parent.$data.matched ? this.passed(_emailFa) : this.muted(_emailFa);

            this.readyToSubmit();
            return this.$parent.$data.matched;
        }
    }
})
</script>

