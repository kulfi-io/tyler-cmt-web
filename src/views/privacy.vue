<template lang="pug">
    div.privacy
        HeaderVue
        FullPage
            div(class="section page")
                PrivacyVue
        FooterVue
</template>


<script lang="ts">
import Vue from 'vue';
import PrivacyVue from '../components/privacy-vue.vue';
import FullPage from "vue-fullpage.js/src/FullPage.vue";
import HeaderVue from '../components/header-vue.vue';
import FooterVue from '../components/footer-vue.vue';


export default Vue.extend({
    name: 'privacy',
    components: {
        HeaderVue,
        FullPage,
        PrivacyVue,
        FooterVue,
    },
    data() {
        return {
            options: {
                scrollOverflow: false,
                scrollBar: true,
                menu: "#menu",
                navigation: true,
                anchors: ["privacy"],
                sectionsColor: ["#fff"],
                licenseKey: "002D6FD2-0EC343D4-9403ACA4-CB7CDBFB"
            }
        }
    },
    mounted: function(){
        //this.aliignToTop();

    },
    methods: {
        // aliignToTop: function(){
        //     const _intro = document.querySelector('.intro');
            
        //     if(_intro) {
        //         const _cell = <HTMLDivElement>_intro.querySelector('.fp-tableCell');
        //         if(_cell) {
        //             _cell.classList.replace('fp-tableCell', 'intro-top')
        //         }
        //     }
        // },
    }

})
</script>
