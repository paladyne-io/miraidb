// import Vue from 'vue';
// import Router from 'vue-router';

import routes1 from './blog_routes.js'
// import routes2 from './dashboard_routes.js'
import { createWebHistory, createMemoryHistory, createWebHashHistory, createRouter } from 'vue-router'

var allRoutes = []
const routes = allRoutes.concat(routes1)  // routes2

// Vue.use(Router);
// routes is an object  i.e routes: customRoutes
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router

/*
export default new Router({
  history: createWebHistory(),
  combinedRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
*/