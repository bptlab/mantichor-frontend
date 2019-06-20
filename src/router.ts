import Vue from 'vue';
import Router from 'vue-router';
import Model from '@/views/Model.vue';
import Execution from '@/views/Execution.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/model',
    },
    {
      path: '/execution',
      name: 'execution',
      component: Execution,
    },
    {
      path: '/model',
      name: 'model',
      component: Model,
    },
  ],
});
