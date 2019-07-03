<template>
    <div>
        <b-row class="form-group">
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
                    <span class="input-group-text right">
                    <i id="fa-pwd" class="fas fa-lock fa-base" aria-hidden="true"></i>
                    </span>
                </b-input-group-addon>
                </b-input-group>
            </b-col>
            <b-col>
                <label :for="`verify-${tag}`" class="control-label">
                    Verify
                <span class="required-field">*</span>
                </label>
                <b-input-group>
                <b-input-group-addon>
                    <button class="btn shadow-none input-icon-btn" :id="`toggle-ver-${tag}`" :data-target="`verify-${tag}`" data-display="hidden">
                    <i id="fa-ver-eye" class="fas fa-eye fa-base" aria-hidden="true"></i>
                    </button>
                </b-input-group-addon>
                <b-input
                    type="password"
                    :id="`verify-${tag}`"
                    :ref="`verify-${tag}`"
                    :title="title"
                    v-b-popover.hover="'See password criteria below'"
                    :placeholder="placeholder"
                    required
                    pattern="[a-zA-Z0-9!@#$%]{8,15}"
                />
                <b-input-group-addon>
                    <span class="input-group-text left">
                    <i id="fa-ver" class="fas fa-lock fa-base" aria-hidden="true"></i>
                    </span>
                </b-input-group-addon>
                </b-input-group>
            </b-col>
        </b-row>
        <!--Instructions-->
        <b-row >
            <b-col>
            <div class="text-muted">
                <small id="pwd-length" class="form-text">At least 8 characters long (max of 15).</small>
            </div>
            </b-col>
            <b-col>
            <div class="text-muted">
                <small id="pwd-match" class="form-text">Password matches.</small>
            </div>
            </b-col>
        </b-row>
        <b-row class="form-group">
            <b-col>
                <div class="text-muted">
                <small id="pwd-upper" class="form-text">Contains at least 1 upper case.</small>
                <small id="pwd-lower" class="form-text">Contains at least 1 lower case.</small>
                <small id="pwd-number" class="form-text">Contains at least 1 number.</small>
                <small
                    id="pwd-special"
                    class="form-text"
                >Contains at least 1 special [!@#$%] character .</small>
                </div>
            </b-col>
        </b-row>
    </div>
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
    var _verify = this.$el.querySelector(`#verify-${this.tag}`);
    var _verPwdDisplay = this.$el.querySelector(`#toggle-ver-${this.tag}`);
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

    if (_verify) {
      _verify.addEventListener("keyup", function(e: Event) {
        _self.validateVerify(e.currentTarget as HTMLInputElement);
      });

      _verify.addEventListener("keypress", function(e: Event) {
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

    if (_verPwdDisplay) {
      _verPwdDisplay.addEventListener("click", function(e: Event) {
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
      var _verify = <HTMLInputElement>document.getElementById(`verify-${this.tag}`);

      var _passFa = document.getElementById("fa-pwd");
      var _verifyFa = document.getElementById("fa-ver");
      var _match = document.getElementById("pwd-match");

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

      if (_verify) {
        if (_value === _verify.value) {
          this.passed(_passFa);
          this.passed(_verifyFa);
          this.passed(_match);
        } else {
          this.muted(_passFa);
          this.muted(_verifyFa);
          this.muted(_match);
        }
      }

      this.readyToSubmit();
      return this.$parent.$data.matched;
    },
    validateVerify: function(elm: HTMLInputElement): boolean {
      var _match = this.$el.querySelector("#pwd-match");
      var _verifyFa = this.$el.querySelector("#fa-ver");
      var _passFa = this.$el.querySelector("#fa-pwd");
      var _pwd = <HTMLInputElement>this.$el.querySelector(`#${this.tag}`);
      var _value = elm.value;


      if (/[a-zA-Z0-9!@#$%]{8,15}/.test(_value)) {
        this.$parent.$data.matched = _value === _pwd.value;
        this.$parent.$data.matched ? this.passed(_verifyFa) : this.muted(_verifyFa);
        this.$parent.$data.matched ? this.passed(_passFa) : this.muted(_passFa);
        this.$parent.$data.matched ? this.passed(_match) : this.muted(_match);
      }

      this.readyToSubmit();
      return this.$parent.$data.matched;
    }
  }
});
</script>

