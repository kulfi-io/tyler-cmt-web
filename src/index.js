import Vue from 'vue';
import App from './App.vue';
import router from './routes';
import 'normalize.css';
import './assets/sass/base.scss';
import './assets/sass/media.scss';
import 'fullpage.js/dist/fullpage.css';
import 'fullpage.js/vendors/scrolloverflow';
import bootstrap from 'bootstrap-vue';
import VueFullPage from 'vue-fullpage.js/dist/vue-fullpage';
import animate from 'animate.css';

import 'bootstrap-vue/dist/bootstrap-vue.min.css';




Vue.config.productionTip = false;
Vue.use(VueFullPage);
Vue.use(animate);
Vue.use(bootstrap);

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
    watch: {
        '$route' (to, from) {}
    },
});
