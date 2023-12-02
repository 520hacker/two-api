import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/public/HomePage.vue';
import BaseChat from '../views/chat/BaseChat.vue'; 
import WebSummary from '../views/chat/WebSummary.vue'; 
import GoPage from '../views/public/GoPage.vue'; 

const routes = [
  { path: '/', component: Home },
  { path: '/chat/base/:id/:mid/:skey', component: BaseChat },
  { path: '/chat/base/:id/:mid', component: BaseChat },
  { path: '/chat/base/:id', component: BaseChat },
  { path: '/chat/base', component: BaseChat }, 
  { path: '/chat/summary/:id/:mid', component: WebSummary },
  { path: '/chat/summary/:id', component: WebSummary },
  { path: '/chat/summary', component: WebSummary }, 
  { path: '/go/:gid', component: GoPage }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;