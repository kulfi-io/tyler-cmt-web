import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home.vue';
import Privacy from './views/privacy.vue';
import About from './views/about.vue';
import Login from './views/login.vue';
import Validate from './views/validate.vue';
import Reset from './views/validate-reset.vue';
import Dash from './views/dash.vue';
import Register from './views/register.vue';
import Schedule from './views/Schedule.vue';

Vue.use(Router);

let routes = [
    { path: '/', name: 'home', title: 'home', component: Home},
    { path: '/privacy', name: 'privacy', title: 'privacy', component: Privacy},
    { path: '/about', name: 'about', title: 'about', component: About},
    { path: '/login', name: 'login', title: 'login', component: Login},
    { path: '/validate/:id', name: 'validate', title: 'validate', component: Validate},
    { path: '/reset/:id', name: 'reset', title: 'reset', component: Reset},
    // { path: '/dash', name: 'dash', title: 'dash', component: Dash},
    
    // { path: '/register', name: 'register', title: 'register', component: Register},
    // { path: '/schedule', name: 'schedule', title: 'schedule', component: Schedule}

]

export default new Router({
    routes: routes,
    mode: 'history',
    fallback: true
});
