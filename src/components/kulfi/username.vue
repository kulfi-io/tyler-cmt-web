<template lang="pug">
  div.kulfi-username
    label.control-label( for="username") username
      span.required-field *
    div.input-group( role="group")
      input.form-control(type="text" id="username" ref="username" 
      title="username is required" placeholder="username" 
      required 
      pattern="[a-zA-Z0-9-_]{5,15}\w+")
      div.input-group-prepend
        span.input-group-text( class="required-field") *
          font-awesome-icon.fa( class="fa-base" :icon="iconUser")
</template>

<script lang="ts">
import Vue from "vue";
import Library from '../../library/account';
import { faUser } from '@fortawesome/fontawesome-free-solid';

export default Vue.extend({
  name: "kulfi-username",
  props: ["readyToSubmit"],
  computed: {
    iconUser: function(){
      return faUser;
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
        var _return = _self.validateInput(e as KeyboardEvent);
        if (!_return) {
          e.preventDefault();
        }
      });
    }
  },
  methods: {
    validateInput: function(e: KeyboardEvent): boolean {
      this.$parent.$data.matched = false;
      let _return = true;

      if (
        !(e.which >= 64 && e.which <= 90) &&
        !(e.which >= 97 && e.which <= 122) &&
        !(e.which >= 48 && e.which <= 57) &&
        !(e.which == 45) &&
        !(e.which == 95)
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
      this.$parent.$data.matched
        ? Library.passed(_userFa)
        : Library.muted(_userFa);

      this.readyToSubmit();
      return this.$parent.$data.matched;
    }
  }
});
</script>

