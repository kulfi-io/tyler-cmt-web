<template lang="pug">
  div.kulfi-password
    label.control-label( :for="tag") {{ label }}
      span.required-field *
    div.input-group
      div.input-group-prepend
        span.input-group-text( class="input-icon-btn" :id="`toggle-${tag}`"
        :data-target="tag" data-display="hidden")
          font-awesome-icon.fa( id="fa-pwd-eye" class="fa-eye fa-base" :icon="iconEye" aria-hidden="true")
      input.form-control(type="password" :id="tag" 
      :ref="tag" :title="title" :placeholder="placeholder" 
      required pattern="[a-zA-Z0-9!@#$%]{8,15}")
      div.input-group-prepend
        span.input-group-text(class="required-field") *
          font-awesome-icon.fa( class="fa-pwd fa-base" :icon="iconLock" aria-hidden="true")
</template>


<script lang="ts">
import Vue from "vue";
import Library from "../../library/account";
import { faLock, faEye } from "@fortawesome/fontawesome-free-solid";

export default Vue.extend({
  name: "kulfi-password",
  props: ["tag", "title", "placeholder", "readyToSubmit", "label"],
  computed: {
    iconLock: function() {
      return faLock;
    },
    iconEye: function() {
      return faEye;
    }
  },
  methods: {
    allowValidPwdCharacters: function(event: KeyboardEvent): boolean {
      this.$parent.$data.matched = false;
      let _return = true;

      if (
        !(event.which >= 64 && event.which <= 90) &&
        !(event.which >= 97 && event.which <= 122) &&
        !(event.which == 33) &&
        !(event.which >= 35 && event.which <= 37) &&
        !(event.which >= 48 && event.which <= 57)
      ) {
        _return = false;
      }

      return _return;
    },
    setMatched: function(matched: boolean, target: HTMLElement): void {
      const _matched = this.$parent.$data.matched;
      matched ? Library.passed(target) : Library.muted(target);

      if (_matched == null || _matched) {
        this.$parent.$data.matched = matched;
      }
    },
    validatePassword: function(elm: HTMLInputElement): boolean {
      var _length = <HTMLElement>document.getElementById("pwd-length");
      var _upper = <HTMLElement>document.getElementById("pwd-upper");
      var _lower = <HTMLElement>document.getElementById("pwd-lower");
      var _number = <HTMLElement>document.getElementById("pwd-number");
      var _special = <HTMLElement>document.getElementById("pwd-special");

      var _passFa = document.getElementById("fa-pwd");

      var _value = elm.value;
      if (_value.length > 15) return false;

      this.setMatched(_value.length >= 8, _length);
      this.setMatched(Library.validateLowerAlpha(_value), _lower);
      this.setMatched(Library.validateUpperAlpha(_value), _upper);
      this.setMatched(Library.validateDigit(_value), _number);
      this.setMatched(Library.validateSpecial(_value), _special);

      this.readyToSubmit();

      this.$parent.$data.matched
        ? Library.passed(_passFa)
        : Library.muted(_passFa);

      return this.$parent.$data.matched;
    }
  }
});
</script>
