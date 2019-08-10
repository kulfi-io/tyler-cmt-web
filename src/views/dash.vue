<template lang="pug">
    HeaderVue
    div.dash-vue
        FullPage(:options: options)
    //- div.dash-vue
    //-     div.header
    //-         div.greeting 
    //-             p {{ today }}
    //-             p Wecome {{fullname}},
        //- div.content
        //-     div.account
        //-         div.split
        //-             div.split-half-left
        //-                 username: {{username}}
        //-             div.split-half-right
        //-                 fullname: {{fullname}}
        //-         div.split
        //-             div.split-half-left
        //-                 email: {{email}}
        //-             div.split-half-right
        //-                 created: {{createdate}}
        //-     div.appointment
        //-         div.split
        //-             div.split-half-left
        //-                 last: {{last-appointment}}
        //-             div.split-half-right
        //-                 next: {{next-apointment}}
        //- div.footer
            div.split
                div.split-half-left
                    a.note() Note
                div.split-half-right
                    a.schedule() Schedule | Re-schedule | Cancel an appointment
            div.split
                div.split-half-left
                    a.note() Reset password
                div.split-half-right
                    a.schedule() Update account info
    FooterVue
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderVue from '../components/header.vue';
import FooterVue from '../components/footer.vue';
import FullPage from "vue-fullpage.js/src/FullPage.vue";


export default Vue.extend({
    name: 'main',
    components: {
        HeaderVue,
        FooterVue,
        FullPage,
    }
});
</script>



