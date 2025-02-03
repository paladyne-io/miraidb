const routes2 = [
  {
    path: '/dashboard',
    component: () => import('../dashboard-prj/dashboard/layouts/DashboardLayout.vue'),
    children: [
      /*
      {
        name: 'gg',
        path: 'gg/',
        component: () => import('/dashboard/pages/AdminDashboardPage.vue')
      },
      {
        name: 'aa',
        path: 'aa',
        component: () => import('../dashboard/pages/AdminBlogPage.vue')
      },
      */

      {
        name: 'dashboard',
        path: '/dashboard',
        component: () => import('../dashboard-prj/dashboard/pages/AdminDashboardPage.vue')
      },

      {
        name: 'admin-new-post',
        path: '/dashboard/new-post',
        component: () => import('../dashboard-prj/dashboard/pages/NewEditBlogPostPage.vue')
      },
      
      {
        name: 'admin-edit-post',
        path: '/dashboard/edit-post/:id',
        component: () => import('../dashboard-prj/dashboard/pages/NewEditBlogPostPage.vue')
      },
      {
        name: 'admin-view-post',
        path: '/dashboard/view-post/:id',
        component: () => import('../dashboard-prj/dashboard/pages/DetailedBlogPostPage.vue')
      },
      {
        name: 'category-manager',
        path: '/dashboard/category-manager',
        component: () => import('../dashboard-prj/dashboard/pages/CategoryManagerPage.vue')
      },
      {
        name: 'rag',
        path: '/dashboard/rag',
        component: () => import('../dashboard-prj/dashboard/pages/RagToolPage.vue')
      },
      {
        name: 'admin-blog',
        path: '/dashboard/admin-blog',
        component: () => import('../dashboard-prj/dashboard/pages/AdminBlogPage.vue')
      },
    
      {
        name: 'admin',
        path: '/dashboard/admin',
        component: () => import('../dashboard-prj/dashboard/pages/MainAdminDashboardPage.vue')
      },
      /*
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
        path: 'register',
        component: () => import('../pages/RegisterPage.vue')
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
        name: 'new-post',
        path: 'new-post',
        component: () => import('/dashboard/pages/NewEditBlogPostPage.vue')
      },
      {
        name: 'admin',
        path: 'admin',
        component: () => import('/dashboard/pages/AdminDashboardPage.vue')
      }
      */
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../dashboard-prj/dashboard/pages/ErrorNotFound.vue')
  }
]

/*
const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHashHistory(),
  routes
})
  */

export default routes2
