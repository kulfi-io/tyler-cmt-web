<template lang="pug">
    main.intro-contact-vue
        div.content 
            div.contact-banner
                img.salutation( src="../assets/img/hear.png")
            Note
</template>

<script lang="ts">

import Vue from 'vue';
import Note from './intro-note.vue';

export default Vue.extend({
    name: 'contact',
    components: {
        Note,
    },
    
});
</script>