import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoadView from '../views/LoadView.vue'
import GameView from '../views/GameView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path:'/load',
      name:'load',
      component:LoadView,
    },
     {
      path:'/game',
      name:'load',
      component:GameView,
    }
  ],
})

export default router
