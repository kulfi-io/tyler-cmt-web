<template>
    <b-col>
        <label for="token" class="control-label">
            token
            <span class="required-field"></span>
        </label>
        <b-input
        type="text"
        id="token"
        ref="token"
        disabled
        />
            
    </b-col>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "kulfi-token",
    mounted: function() {
        var _token = <HTMLInputElement>this.$el.querySelector("#token");
        var _wrapper = _token.parentElement;
        if(_token) {
            if(this.$route.params.id) {
                _token.value = this.$route.params.id;
            } else {
                if(_wrapper) {
                    _wrapper.style.display = 'none';
                }
            }
        } 
    }
})
</script>

