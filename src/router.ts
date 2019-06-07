import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';
import Model from './views/Model.vue';
import Execution from './views/Execution.vue';

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
      path: '/execution',
      name: 'execution',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Execution,
    },
    {
      path: '/model',
      name: 'model',
      component: Model,
    },
  ],
});
