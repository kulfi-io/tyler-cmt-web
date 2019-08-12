<template lang="pug">
    div.dashboard-vue
        div.header
            div.greeting
                div.solicitation
                    p Hello
        div.content
        div.footer
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'dashboard',
    props: ['library']

    
});
</script>