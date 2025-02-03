// import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/blog'
      },
      {
        name: 'blog',
        path: '/blog',
        component: () => import('../pages/BlogPage.vue')
      },
      {
        name: 'edit-post',
        path: 'edit-post/:id',
        component: () => import('../pages/NewBlogPostPage.vue')
      },
      {
        name: 'view-post',
        path: 'post/:id',
        component: () => import('../pages/DetailedBlogPostPage.vue')
      },
      {
        name: 'post',
        path: 'post',
        component: () => import('../pages/DetailedBlogPostPage.vue')
      },
      { name: 'profile',
        path: '/profile',
        component: () => import('../pages/ProfilePage.vue')
      },
      {
        path: 'account',
        component: () => import('../pages/ProfilePage.vue')
      },
      {
        name: 'signin',
        path: 'signin',
        component: () => import('../pages/SignInPage.vue')
      },
      {
        name: 'login',
        path: 'login',
        component: () => import('../pages/SignInPage.vue')
      },
      {
        path: 'register',
        component: () => import('../pages/RegisterPage.vue')
      },
      {
        name: 'new-post',
        path: 'new-post',
        component: () => import('../pages/NewBlogPostPage.vue')
      },
      {
        name: 'admin',
        path: 'admin',
        component: () => import('../pages/AdminDashboardPage.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue')
  }
]

/*
const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHashHistory(),
  routes
})
  */

export default routes
