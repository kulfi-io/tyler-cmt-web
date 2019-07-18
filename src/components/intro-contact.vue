<template lang="pug">
    div.contact-vue
        div.content 
            img.heading(src="../assets/img/hear.png" alt="heading")
            div.split
                div.split-half-left
                    div.heading
                        span send us a note!
                    Note
                div.split-half-right
                    div.heading
                        span call us!
                    div.other-info
                        section
                            p.title Tyler Chamberlain, CMT
                            p 999 Sutter Street 
                            p San Francisco, CA 94109
                            p 415.275.0167

</template>

<script lang="ts">
import Vue from 'vue';
import Note from './note.vue';
export default Vue.extend({
    name: 'contact',
    components: {
        Note,
    }
});
</script>