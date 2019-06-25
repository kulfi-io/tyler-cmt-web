import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home.vue';
import Privacy from './views/Privacy.vue';

Vue.use(Router);

let routes = [
    { path: '/', name: 'home', title: 'home', component: Home},
    { path: '/privacy', name: 'privacy', title: 'privacy', component: Privacy}
]

export default new Router({
    routes: routes,
    mode: 'history',
    fallback: true
});
