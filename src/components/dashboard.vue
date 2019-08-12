<template lang="pug">
    div.dashboard-vue
        div.header
            div.greeting
                div.salutation
                    p.greet(ref="greet") Welcome back
                    p.today(ref="today")
        div.content
        div.footer
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'dashboard',
    props: ['library'],
    mounted: function() {
        const _today = <HTMLElement>this.$refs.today;
        const _greet = <HTMLElement>this.$refs.greet;
        
        _today.innerText = this.library.today;
        _greet.innerText += ` ${this.library.fullname}!`;
    },
    methods: {
    }
});
</script>