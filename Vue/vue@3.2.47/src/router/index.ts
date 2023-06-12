import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/step1',
      name: 'step1',
      component: () => import('@/views/VueCompositionApi/Step1.vue')
    },
    {
      path: '/step2',
      name: 'step2',
      component: () => import('@/views/VueCompositionApi/Step2.vue')
    },
    {
      path: '/step3',
      name: 'step3',
      component: () => import('@/views/VueCompositionApi/Step3.vue')
    },
    {
      path: '/step4',
      name: 'step4',
      component: () => import('@/views/VueCompositionApi/Step4.vue')
    },
    {
      path: '/step5',
      name: 'step5',
      component: () => import('@/views/VueCompositionApi/Step5.vue')
    },
    {
      path: '/step6',
      name: 'step6',
      component: () => import('@/views/VueCompositionApi/Step6.vue')
    },
    {
      path: '/step7',
      name: 'step7',
      component: () => import('@/views/VueCompositionApi/Step7.vue')
    }
  ]
})

export default router
