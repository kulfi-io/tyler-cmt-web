import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let routes = [
    { path: '/', name: 'home', title: 'home'},
]

export default new Router({
    routes: routes,
    mode: 'history',
    fallback: true
});
