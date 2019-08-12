import Vue from 'vue';
import App from './App.vue';
import router from './routes';
import 'normalize.css';
import './assets/sass/base.scss';
import 'fullpage.js/dist/fullpage.css';
import 'fullpage.js/vendors/scrolloverflow';
import animate from 'animate.css';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
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
