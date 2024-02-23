import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/public/HomePage.vue';
import About from '../views/public/AboutUs.vue';
import Contact from '../views/public/ContactUs.vue';
import HowToUse from '../views/public/HowToUse.vue';

import OptionEdit from '../views/admin/OptionEdit.vue';
import ContentEdit from '../views/admin/ContentEdit.vue';
import ChannelList from '../views/admin/ChannelList.vue';
import ModelList from '../views/admin/ModelList.vue';
import ChannelAdd from '../views/admin/ChannelAdd.vue';
import ChannelEdit from '../views/admin/ChannelEdit.vue';
import UserList from '../views/admin/UserList.vue';
import UserEdit from '../views/admin/UserEdit.vue';
import TokenList from '../views/admin/TokenList.vue';
import TokenAdd from '../views/admin/TokenAdd.vue';
import TokenEdit from '../views/admin/TokenEdit.vue';

import RedemptionList from '../views/admin/RedemptionList.vue';
import RedemptionAdd from '../views/admin/RedemptionAdd.vue';
import RedemptionEdit from '../views/admin/RedemptionEdit.vue';

import InstallOrUpgrade from '../views/admin/InstallOrUpgrade.vue';
 
import LogList from '../views/admin/LogList.vue';
import LogDetail from '../views/admin/LogDetail.vue';
import LoginView from '../views/public/LoginView.vue';
import RegisterView from '../views/public/RegisterView.vue';

import UserProfile from '../views/admin/UserProfile.vue';
import UserRedeem from '../views/admin/UserRedeem.vue';
import MagicEdit from '../views/admin/MagicEdit.vue';

import VectorProjectList from '../views/admin/VectorProjectList.vue';
import VectorProjectNew from '../views/admin/VectorProjectNew.vue';
import VectorProjectEdit from '../views/admin/VectorProjectEdit.vue';

import VectorFileList from '../views/admin/VectorFileList.vue';
import VectorFileNew from '../views/admin/VectorFileNew.vue';
import VectorFileEdit from '../views/admin/VectorFileEdit.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/howtouse', component: HowToUse },
  { path: '/contact', component: Contact },
  { path: '/option', component: OptionEdit },
  { path: '/content/edit', component: ContentEdit },
  { path: '/content/edit/:key', component: ContentEdit },
  { path: '/magic', component: MagicEdit },
  { path: '/magic/:key', component: MagicEdit },
  { path: '/option/:key', component: OptionEdit },
  { path: '/channels', component: ChannelList },
  { path: '/models', component: ModelList },
  { path: '/channels/:id', component: ChannelEdit },
  { path: '/channel/new', component: ChannelAdd },
  { path: '/users', component: UserList },
  { path: '/users/:id', component: UserEdit },
  { path: '/tokens', component: TokenList },
  { path: '/tokens/:id', component: TokenEdit },
  { path: '/tokens/new', component: TokenAdd },
  { path: '/redemptions', component: RedemptionList },
  { path: '/redemptions/:id', component: RedemptionEdit },
  { path: '/redemptions/new', component: RedemptionAdd },
  { path: '/logs', component: LogList },
  { path: '/logs/:id', component: LogDetail },
  { path: '/install', component: InstallOrUpgrade },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/user/profile', component: UserProfile },
  { path: '/user/redeem', component: UserRedeem },
  { path: '/vector/projects', component: VectorProjectList },
  { path: '/vector/project/new', component: VectorProjectNew },
  { path: '/vector/projects/:id', component: VectorProjectEdit },
  { path: '/vector/files', component: VectorFileList },
  { path: '/vector/file/new', component: VectorFileNew },
  { path: '/vector/files/:id', component: VectorFileEdit }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;