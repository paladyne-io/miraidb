// import { createRouter, createWebHashHistory } from 'vue-router'

const routes1 = [
    {
      path: '/blog',
      component: () => import('../blog/layouts/MainLayout.vue'),
      children: [
       /* { path: '', redirect: 'blog' }, */
        {
          name: 'blog',
          path: '/blog',
          component: () => import('../blog/pages/BlogPage.vue')
        },
        /*
        {
          name: 'dashboard',
          path: '/dashboard',
          component: () => import('../dashboard/pages/AdminDashboardPage.vue')
        },
        */
        {
          name: 'view-post',
          path: '/post/:id',
          component: () => import('../blog/pages/DetailedBlogPostPage.vue')
        },
        {
          name: 'post',
          path: '/post',
          component: () => import('../blog/pages/DetailedBlogPostPage.vue')
        },
        { name: 'profile',
          path: '/profile',
          component: () => import('../blog/pages/ProfilePage.vue')
        },
        {
          path: 'account',
          component: () => import('../blog/pages/ProfilePage.vue')
        },
        {
          name: 'signin',
          path: '/signin',
          component: () => import('../blog/pages/SignInPage.vue')
        },
        /*
        {
          name: 'login',
          path: '/login',
          component: () => import('../blog/pages/SignInPage.vue')
        }
        */

         /*
        {
          name: 'edit-post',
          path: 'edit-post/:id',
          component: () => import('/app/pages/NewBlogPostPage.vue')
        },
  
        {
          path: '/register',
          component: () => import('../blog/pages/RegisterPage.vue')
        },
        {
          name: 'new-post',
          path: '/new-post',
          component: () => import('../blog/pages/NewBlogPostPage.vue')
        },
        {
          name: 'admin',
          path: 'admin',
          component: () => import('../blog/pages/AdminDashboardPage.vue')
        },
        */
      ]
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('../blog/pages/ErrorNotFound.vue')
    }
  ]

  export default routes1