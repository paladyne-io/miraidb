const routes = [
  {
    path: '/dashboard',
    component: () => import('../layouts/DashboardLayout.vue'),

    children: [
      {
        name: 'dashboard',
        path: '', // Updated to be relative to the parent route
        component: () => import('../pages/AdminDashboardPage.vue')
        /* component: () => import('../pages/AdminDashboardPage.vue') */
      },
      {
        name: 'rag',
        path: 'rag', // Updated to be relative to the parent route
        component: () => import('../pages/RagToolPage.vue')
      },
      {
        name: 'category-manager',
        path: 'category-manager', // Updated to be relative to the parent route
        component: () => import('../pages/CategoryManagerPage.vue')
      },
      {
        name: 'admin-blog',
        path: 'admin-blog', // Updated to be relative to the parent route
        component: () => import('../pages/AdminBlogPage.vue')
      },
      {
        name: 'admin-edit-post',
        path: 'admin-edit-post/:id', // Updated to be relative to the parent route
        component: () => import('../pages/NewEditBlogPostPage.vue')
      },
      {
        name: 'admin-view-post',
        path: 'admin-view-post/:id', // Updated to be relative to the parent route
        component: () => import('../pages/DetailedBlogPostPage.vue')
      },
      {
        name: 'admin-new-post',
        path: 'admin-new-post', // Updated to be relative to the parent route
        component: () => import('../pages/NewEditBlogPostPage.vue')
        // component: () => import('../pages/DetailedBlogPostPage.vue')
      },
      {
        name: 'admin',
        path: 'admin', // Updated to be relative to the parent route
        component: () => import('../pages/AdminDashboardPage.vue')
      },
      {
        name: 'admin-profile',
        path: 'admin-profile', // Updated to be relative to the parent route
        // component: () => import('../pages/NewEditBlogPostPage.vue')
        component: () => import('../pages/ProfilePage.vue')
      },
      {
        name: 'admin-signin',
        path: 'admin-signin', // Updated to be relative to the parent route
        component: () => import('../pages/SignInPage.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue')
  }
]

export default routes
