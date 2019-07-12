<template lang="pug">
    div.schedule-header
        div.schedule-navigation
            div.navigation(class="split")
                div.split-half-left
                    button.form-control(ref="previous") prev
                div.split-half-right
                    button.form-control( ref="next") next
            div.title
                div.heading {{ title }}
            div.view(class="split")
                div.split-half-left
                    button.form-control(ref="month" class="active") month
                div.split-half-right
                    button.form-control( ref="week") week
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'schedule-header',
    props: [ 'title'],
})
</script>