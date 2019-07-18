<template lang="pug">
    div.note-vue
        form(id="note-form")
            div.form-group
                Email( :readyToSubmit="readyToSubmit"
                    :tag="'email'"
                    :placeholder="'email'"
                    :title="'email is required'"
                    :label="'email'")
            div.form-group
                Name(:readyToSubmit="readyToSubmit"
                    :tag="'first'"
                    :placeholder="'firstname'"
                    :title="'firstname is required'")
            div.form-group
                Name(:readyToSubmit="readyToSubmit"
                    :tag="'last'"
                    :placeholder="'lastname'"
                    :title="'lastname is required'")
            div.form-group
                Area(:readyToSubmit="readyToSubmit"
                    :tag="'Note'"
                    :placeholder="'Note'"
                    :title="'Note is required'" :required="true")
        div.form-group(class="submit")
                button.form-control(type="submit" ref="submit") Send
</template>

<script lang="ts">
import Vue from 'vue';
import Email from '../components/kulfi/email.vue';
import Name from '../components/kulfi/name.vue';
import Area from '../components/kulfi/large-text-area.vue';
export default Vue.extend({
    name: 'note',
    components: {
        Email,
        Name,
        Area,
    }
});
</script>
