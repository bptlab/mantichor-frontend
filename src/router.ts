import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';
import Model from './views/Model.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/model',
      // name: 'home',
      // component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/model',
      name: 'model',
      component: Model,
    },
  ],
});
