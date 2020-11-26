import Vue from 'vue';
import Router from 'vue-router';
import Model from '@/views/Model.vue';
import Landing from '@/views/Landing.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/landing',
    },
    {
      path: '/landing',
      name: 'landing',
      component: Landing,
    },
    {
      path: '/model',
      name: 'model',
      component: Model,
    }
  ],
});
