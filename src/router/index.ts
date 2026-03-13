import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoadView from '../views/LoadView.vue'
import GameView from '../views/GameView.vue'
import AIChatView from '../views/AIChatView.vue'
import Voice from '@/components/AIChat/Audio/Recorder.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/load',
      name: 'load',
      component: LoadView,
    },
    {
      path: '/game',
      name: 'game',
      component: GameView,
    },
    {
      path: '/ai_chat',
      name: 'ai_chat',
      component: AIChatView,
    },
    {
      path: '/Recirder',
      name: 'Recirder',
      component: Voice,
    },
    {
      path: '/vosk_websocket',
      name: 'vosk_websocket',
      component: () => import('@/views/VoskWebsocket.vue'),
    }
  ],
})

export default router
