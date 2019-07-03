<template>
    <b-col>
        <label for="username" class="control-label">
            Username
            <span class="required-field">*</span>
        </label>
        <b-input-group>
            <b-input
            type="text"
            id="username"
            ref="username"
            title="Username is required"
            v-b-popover.hover="'enter at least 6 alpha numeric characters allowed characters ( _- )'"
            placeholder="Username"
            required
            pattern="[a-zA-Z0-9-_]{5,15}\w+"
            />
            <b-input-group-addon>
            <span class="input-group-text left">
                <i id="fa-user" class="fas fa-user fa-base" aria-hidden="true"></i>
            </span>
            </b-input-group-addon>
        </b-input-group>
    </b-col>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "kulfi-username",
    props: ['passed', 'muted', 'readyToSubmit'],
    methods: {
        allowValidUsernameCharacters: function(event: KeyboardEvent): boolean {
            this.$parent.$data.matched = false;
            let _return = true;
            if (
                !(event.which >= 64 && event.which <= 90) &&
                !(event.which >= 97 && event.which <= 122) &&
                !(event.which >= 48 && event.which <= 57) &&
                !(event.which == 45) &&
                !(event.which == 95)
            ) {
                _return = false;
            }

            return _return;
        },
        validateUsername: function(elm: HTMLInputElement): boolean {
            var _userFa = document.getElementById("fa-user");
            var _value = elm.value;
            if (_value.length > 15) return false;

            this.$parent.$data.matched = _value.length >= 5;
            this.$parent.$data.matched ? this.passed(_userFa) : this.muted(_userFa);

            
            this.readyToSubmit();
            return this.$parent.$data.matched;
        }
    },
    mounted: function() {
        var _self = this;
        var _username = this.$el.querySelector("#username");

         if (_username) {
            _username.addEventListener("keyup", function(e: Event) {
                _self.validateUsername(e.currentTarget as HTMLInputElement);
            });

            _username.addEventListener("keypress", function(e: Event) {
                var _return = _self.allowValidUsernameCharacters(e as KeyboardEvent);
                if (!_return) {
                    e.preventDefault();
                }
            });
        }

    }
})
</script>

