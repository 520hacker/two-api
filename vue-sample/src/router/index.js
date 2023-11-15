import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/public/HomePage.vue';
import BaseChat from '../views/chat/BaseChat.vue'; 
import GoPage from '../views/public/GoPage.vue'; 

const routes = [
  { path: '/', component: Home },
  { path: '/chat/base/:id/:mid', component: BaseChat },
  { path: '/chat/base/:id', component: BaseChat },
  { path: '/chat/base', component: BaseChat }, 
  { path: '/go/:gid', component: GoPage }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;