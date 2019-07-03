<template>
    <b-col>
        <label :for="tag" class="control-label">
        {{ label }}
        <span class="required-field">*</span>
        </label>
        <b-input-group>
        <b-input-group-addon>
            <button class="btn shadow-none input-icon-btn" :id="`toggle-${tag}`" :data-target="tag" data-display="hidden">
            <i id="fa-pwd-eye" class="fas fa-eye fa-base" aria-hidden="true"></i>
            </button>
        </b-input-group-addon>
        <b-input
            type="password"
            :id="tag"
            :ref="tag"
            :title="title"
            v-b-popover.hover="'See password criteria below'"
            :placeholder="placeholder"
            required
            pattern="[a-zA-Z0-9!@#$%]{8,15}"
        />
        <b-input-group-addon>
            <span class="input-group-text left">
            <i id="fa-pwd" class="fas fa-lock fa-base" aria-hidden="true"></i>
            </span>
        </b-input-group-addon>
        </b-input-group>
    </b-col>
           
       
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "kulfi-password-set",
  props: ["tag", "title", "placeholder", "passed"
  , "muted", "readyToSubmit", "label"],
  mounted: function() {
    var _self = this;
    var _pwd = this.$el.querySelector(`#${this.tag}`);
    var _pwdDisplay = this.$el.querySelector(`#toggle-${this.tag}`);

    if (_pwd) {
      _pwd.addEventListener("keyup", function(e: Event) {
        _self.validatePassword(e.currentTarget as HTMLInputElement);
      });

      _pwd.addEventListener("keypress", function(e: Event) {
        var _return = _self.allowValidPwdCharacters(e as KeyboardEvent);
        if (!_return) {
          e.preventDefault();
        }
      });
    }

    if (_pwdDisplay) {
      _pwdDisplay.addEventListener("click", function(e: Event) {
        e.preventDefault();
        _self.togglePwdDisplay(e.currentTarget as HTMLButtonElement);
      });
    }
    
  },
  methods: {
    getLowerAlpha: function(criteria: string): string {
      var _result = criteria.replace(/[A-Z0-9!@#$%]/g, "");
      return _result;
    },
    getUpperAlpha: function(criteria: string): string {
      var _result = criteria.replace(/[a-z0-9!@#$%]/g, "");
      return _result;
    },
    getDigit: function(criteria: string): string {
      var _result = criteria.replace(/[a-zA-Z!@#$%]/g, "");
      return _result;
    },
    getSpecial: function(criteria: string): string {
      var _result = criteria.replace(/[a-zA-Z0-9]/g, "");
      return _result;
    },
    validateLowerAlpha: function(criteria: string): boolean {
      var _parsed = this.getLowerAlpha(criteria);
      this.$parent.$data.matched = /[a-z]/.exec(_parsed);
      return this.$parent.$data.matched;
    },
    validateUpperAlpha: function(criteria: string): boolean {
      var _parsed = this.getUpperAlpha(criteria);
      this.$parent.$data.matched = /[A-Z]/.test(_parsed);
      return this.$parent.$data.matched;
    },
    validateDigit: function(criteria: string): boolean {
      var _parsed = this.getDigit(criteria);
      this.$parent.$data.matched = /\d/.test(_parsed);
      return this.$parent.$data.matched;
    },
    validateSpecial: function(criteria: string): boolean {
      var _parsed = this.getSpecial(criteria);
      this.$parent.$data.matched = /[!@#$%]/.test(_parsed);
      return this.$parent.$data.matched;
    },
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
    togglePwdDisplay: function(elm: HTMLButtonElement) {
      var _visibleState = elm.getAttribute("data-display");
      if (_visibleState) {
        if (_visibleState === "hidden") {
          this.showPassword(elm);
          elm.setAttribute("data-display", "display");
        } else {
          this.hidePassword(elm);
          elm.setAttribute("data-display", "hidden");
        }
      }
    },
    showPassword: function(elm: HTMLButtonElement) {
      var _targetName = elm.getAttribute("data-target");
      var _faItem = elm.querySelector(".fa-eye");
      if (_targetName) {
        var _target = <HTMLInputElement>document.getElementById(_targetName);
        if (_target) {
          _target.setAttribute("type", "text");
          if (_faItem) {
            var _classes = _faItem.className.match(/\S+/g) || [];
            var _item = _classes.indexOf("fa-eye");
            if (_item >= 0) {
              _classes.splice(_item, 1);
              _classes.push("fa-eye-slash");

              _faItem.className = _classes.join(" ");
            }
          }
        }
      }
    },
    hidePassword: function(elm: HTMLButtonElement) {
      var _targetName = elm.getAttribute("data-target");
      var _faItem = elm.querySelector(".fa-eye-slash");
      if (_targetName) {
        var _target = <HTMLInputElement>document.getElementById(_targetName);
        if (_target) {
          _target.setAttribute("type", "password");
          if (_faItem) {
            var _classes = _faItem.className.match(/\S+/g) || [];
            var _item = _classes.indexOf("fa-eye-slash");
            if (_item >= 0) {
              _classes.splice(_item, 1);
              _classes.push("fa-eye");

              _faItem.className = _classes.join(" ");
            }
          }
        }
      }
    },
    validatePassword: function(elm: HTMLInputElement): boolean {
      var _length = document.getElementById("pwd-length");
      var _upper = document.getElementById("pwd-upper");
      var _lower = document.getElementById("pwd-lower");
      var _number = document.getElementById("pwd-number");
      var _special = document.getElementById("pwd-special");

      var _passFa = document.getElementById("fa-pwd");

      var _value = elm.value;
      if (_value.length > 15) return false;

      _value.length >= 8 ? this.passed(_length) : this.muted(_length);
      this.validateLowerAlpha(_value)
        ? this.passed(_lower)
        : this.muted(_lower);
      this.validateUpperAlpha(_value)
        ? this.passed(_upper)
        : this.muted(_upper);
      this.validateDigit(_value) ? this.passed(_number) : this.muted(_number);
      this.validateSpecial(_value)
        ? this.passed(_special)
        : this.muted(_special);

      this.readyToSubmit();
      this.$parent.$data.matched ? this.passed(_passFa) : this.muted(_passFa);
      return this.$parent.$data.matched;
    }
  }
});
</script>

