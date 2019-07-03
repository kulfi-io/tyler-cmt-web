<template>
  <div id="toggle">
    <span class="switch">
      <input type="checkbox" class="switch form-control" data-value="" id="switch-id">
      <label id="switch-id-label" for="switch-id"></label>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Toggle from '../../models/toggle';

export default Vue.extend({
  name: "kulfi-toggle",
  props: {
      toggle: {
          type: Toggle,
          required: true
      }
  },
  mounted: function(){

      var _self = this;
      var _switch = this.$el.querySelector('#switch-id');

      if(_switch) {
          _switch.addEventListener('change', function(e: Event) {
              var _chk = e.currentTarget;
              _self.switch(_chk as HTMLInputElement);
          });
      }

      this.switch(_switch as HTMLInputElement);
  },
  methods: {
        switch: function(elm: HTMLInputElement) {
            var _label = <HTMLLabelElement>document.querySelector('#switch-id-label');
          
            elm.checked ? _label.innerText = this.toggle.on 
                : _label.innerText = this.toggle.off;
            
            elm.checked ? elm.setAttribute('data-value', this.toggle.on) 
                : elm.setAttribute('data-value', this.toggle.off);
        
        }
  }
});
</script>

<style lang="scss" scoped>
//
$font-size-base: 1rem;
$font-size-lg: ($font-size-base * 1.25);
$font-size-sm: ($font-size-base * 0.875);
$input-height: 2.375rem;
$input-height-sm: 1.9375rem;
$input-height-lg: 3rem;
$input-btn-focus-width: 0.2rem;
$custom-control-indicator-bg: #80a0c4; //#a3c1a0; // #dee2e6;
$custom-control-indicator-disabled-bg: #e9ecef;
$custom-control-description-disabled-color: #868e96;
$white: white;
$theme-colors: (
  "primary": #0B2747//#5e7c6f
);

//
// These variables can be used to customize the switch component.
//
$switch-height: calc(#{$input-height} * 0.8) !default;
$switch-height-sm: calc(#{$input-height-sm} * 0.8) !default;
$switch-height-lg: calc(#{$input-height-lg} * 0.8) !default;
$switch-border-radius: $switch-height !default;
$switch-bg: $custom-control-indicator-bg !default;
$switch-checked-bg: map-get($theme-colors, "primary") !default;
$switch-disabled-bg: $custom-control-indicator-disabled-bg !default;
$switch-disabled-color: $custom-control-description-disabled-color !default;
$switch-thumb-bg: $white !default;
$switch-thumb-border-radius: 50% !default;
$switch-thumb-padding: 2px !default;
$switch-focus-box-shadow: 0 0 0 $input-btn-focus-width
  rgba(map-get($theme-colors, "primary"), 0.25);
$switch-transition: 0.2s all !default;

.switch {
  font-size: $font-size-base;
  position: relative;

  input {
    position: absolute;
    height: 1px;
    width: 1px;
    background: none;
    border: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    overflow: hidden;
    padding: 0;

    + label {
      position: relative;
      min-width: calc(#{$switch-height} * 2);
      border-radius: $switch-border-radius;
      height: $switch-height;
      line-height: $switch-height;
      display: inline-block;
      cursor: pointer;
      outline: none;
      user-select: none;
      vertical-align: middle;
      text-indent: calc(calc(#{$switch-height} * 2) + 0.5rem);
    }

    + label::before,
    + label::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: calc(#{$switch-height} * 2);
      bottom: 0;
      display: block;
    }

    + label::before {
      right: 0;
      background-color: $switch-bg;
      border-radius: $switch-border-radius;
      transition: $switch-transition;
    }

    + label::after {
      top: $switch-thumb-padding;
      left: $switch-thumb-padding;
      width: calc(#{$switch-height} - calc(#{$switch-thumb-padding} * 2));
      height: calc(#{$switch-height} - calc(#{$switch-thumb-padding} * 2));
      border-radius: $switch-thumb-border-radius;
      background-color: $switch-thumb-bg;
      transition: $switch-transition;
    }

    &:checked + label::before {
      background-color: $switch-checked-bg;
    }

    &:checked + label::after {
      margin-left: $switch-height;
    }

    &:focus + label::before {
      outline: none;
      box-shadow: $switch-focus-box-shadow;
    }

    &:disabled + label {
      color: $switch-disabled-color;
      cursor: not-allowed;
    }

    &:disabled + label::before {
      background-color: $switch-disabled-bg;
    }
  }

  // Small variation
  &.switch-sm {
    font-size: $font-size-sm;

    input {
      + label {
        min-width: calc(#{$switch-height-sm} * 2);
        height: $switch-height-sm;
        line-height: $switch-height-sm;
        text-indent: calc(calc(#{$switch-height-sm} * 2) + 0.5rem);
      }

      + label::before {
        width: calc(#{$switch-height-sm} * 2);
      }

      + label::after {
        width: calc(#{$switch-height-sm} - calc(#{$switch-thumb-padding} * 2));
        height: calc(#{$switch-height-sm} - calc(#{$switch-thumb-padding} * 2));
      }

      &:checked + label::after {
        margin-left: $switch-height-sm;
      }
    }
  }

  // Large variation
  &.switch-lg {
    font-size: $font-size-lg;

    input {
      + label {
        min-width: calc(#{$switch-height-lg} * 2);
        height: $switch-height-lg;
        line-height: $switch-height-lg;
        text-indent: calc(calc(#{$switch-height-lg} * 2) + 0.5rem);
      }

      + label::before {
        width: calc(#{$switch-height-lg} * 2);
      }

      + label::after {
        width: calc(#{$switch-height-lg} - calc(#{$switch-thumb-padding} * 2));
        height: calc(#{$switch-height-lg} - calc(#{$switch-thumb-padding} * 2));
      }

      &:checked + label::after {
        margin-left: $switch-height-lg;
      }
    }
  }

  + .switch {
    margin-left: 1rem;
  }
}

.dropdown-menu {
  margin-top: 0.75rem;
}
</style>


   
