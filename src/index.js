import Vue from 'vue';
import App from './App.vue';
import router from './routes';
import 'normalize.css';
import animate from 'animate.css';
import './assets/css/_base.css';
import './assets/css/media.css';
import 'fullpage.js/dist/fullpage.css';
// import 'fullpage.js/vendors/scrolloverflow';
import VueFullPage from 'vue-fullpage.js/dist/vue-fullpage';

Vue.config.productionTip = false;
Vue.use(VueFullPage);
Vue.use(animate);

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
    watch: {
        '$route' (to, from) {}
    },
});
