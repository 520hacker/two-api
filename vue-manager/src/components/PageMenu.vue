<template>
    <div class="overlay" v-show="isOverlayShow" @click="hideSideMenu"></div>
    <div class="sub-nav py-3 flex items-center">
        <button class="reset-btn sidebar-button flex items-center" aria-expanded="false" v-on:click="showSideMenu">
            <i class="el-icon mr-2" style="font-size: 20px;">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="7" width="11" height="2" fill="#606266"></rect>
                    <rect x="2" y="11" width="14" height="2" fill="#606266"></rect>
                    <rect x="2" y="15" width="8" height="2" fill="#606266"></rect>
                    <rect x="2" y="3" width="16" height="2" fill="#606266"></rect>
                </svg>
            </i>
            <span class="leading-6">Menu</span>
        </button>
        <button @click="scrollToTop" :aria-disabled="!showButton" type="button"
            :class="showButton ? 'el-button is-link go-back-top height-5 show' : 'el-button is-link go-back-top height-5'">
            <span class=""> Back to top </span>
        </button>
    </div>
    <div :class="isShowSideMenu ? 'el-scrollbar sidebar open' : 'el-scrollbar sidebar'">
        <div class="el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
            <div class="el-scrollbar__view" style="">
                <aside>
                    <div class="sidebar-groups">
                        <section class="sidebar-group">
                            <p class="sidebar-group__title"><el-button :icon="MagicStick" class="menu-icon" /> 功能</p>
                            <router-link to="/channels" class="link" v-if="isAdmin">
                                <p class="link-text">
                                    <el-button :icon="Guide" class="menu-icon" />
                                    渠道
                                </p>
                            </router-link>
                            <router-link to="/tokens" class="link">
                                <p class="link-text">
                                    <el-button :icon="Key" class="menu-icon" /> 令牌
                                </p>
                            </router-link>
                            <!-- <router-link to="/vector/projects" class="link" v-if="isAdmin">
                                <p class="link-text">
                                    <el-button :icon="Ship" class="menu-icon" />
                                    知识库
                                </p>
                            </router-link> -->
                            <router-link to="/logs" class="link">
                                <p class="link-text">
                                    <el-button :icon="Memo" class="menu-icon" /> 日志
                                </p>
                            </router-link>
                            <router-link to="/users" class="link" v-if="isAdmin">
                                <p class="link-text">
                                    <el-button :icon="User" class="menu-icon" /> 用户
                                </p>
                            </router-link>
                            <router-link to="/redemptions" class="link" v-if="isAdmin">
                                <p class="link-text">
                                    <el-button :icon="Ticket" class="menu-icon" /> 兑换券
                                </p>
                            </router-link>
                        </section>
                        <section class="sidebar-group">
                            <p class="sidebar-group__title"><el-button :icon="Management" class="menu-icon" /> 个人</p>
                            <router-link to="/user/profile" class="link">
                                <p class="link-text"><el-button :icon="Wallet" class="menu-icon" /> 账户</p>
                            </router-link>
                        </section>
                        <section class="sidebar-group" v-if="isAdmin">
                            <p class="sidebar-group__title"><el-button :icon="Setting" class="menu-icon" /> 设定</p>
                            <router-link to="/option/TestPrompt" class="link">
                                <p class="link-text">
                                    <el-button :icon="Edit" class="menu-icon" /> 系统
                                </p>
                            </router-link>
                            <router-link to="/magic/SearchPlus" class="link">
                                <p class="link-text">
                                    <el-button :icon="Pointer" class="menu-icon" /> 运营
                                </p>
                            </router-link>
                            <router-link to="/content/edit" class="link">
                                <p class="link-text">
                                    <el-button :icon="ChatLineSquare" class="menu-icon" /> 内容
                                </p>
                            </router-link>
                        </section>
                    </div>
                </aside>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, inject, onMounted, onBeforeUnmount } from 'vue';
import {
    Guide,
    Wallet,
    Key,
    Memo,
    User,
    Ticket,
    Setting,
    Pointer,
    ChatLineSquare,
    Edit,
    Management,Ship,
    MagicStick
} from '@element-plus/icons-vue'

export default {
    name: 'PageMenu',
    setup() {
        const isShowSideMenu = ref(false);
        const showButton = ref(false);
        const isOverlayShow = ref(false);
        const isAdmin = ref(false)

        const onLoad = () => {
            setInterval(function () {
                let role = localStorage.getItem('Role')
                if (role && role == 1) {
                    isAdmin.value = true
                } else {
                    isAdmin.value = false
                }
            }, 500)
        }
        onLoad()

        const changeDisplayView = inject('changeDisplayView');
        const displaySideMenu = inject('displaySideMenu');
        const showSettingCard = () => {
            hideSideMenu();
            changeDisplayView.value = 'SettingCard';
        };


        const handleScroll = () => {
            showButton.value = window.scrollY > 30;
        };

        const showSideMenu = () => {
            displaySideMenu.vShow = true;
            isOverlayShow.value = true;
            isShowSideMenu.value = true;
        };

        const hideSideMenu = () => {
            displaySideMenu.vShow = false;
            isOverlayShow.value = false;
            isShowSideMenu.value = false;
        };

        const scrollToTop = () => {
            const duration = 1500;
            const start = window.scrollY;
            const startTime = 'now' in window.performance ? performance.now() : Date.now();

            const easeInOutQuad = (t, b, c, d) => {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            };

            const animateScroll = () => {
                const currentTime = 'now' in window.performance ? performance.now() : Date.now();
                const elapsed = currentTime - startTime;
                const scrollY = easeInOutQuad(elapsed, start, -start, duration);
                window.scrollTo(0, scrollY);
                if (elapsed < duration) {
                    requestAnimationFrame(animateScroll);
                }
            };

            animateScroll();
        };

        onMounted(() => {
            window.addEventListener('scroll', handleScroll);
        });

        onBeforeUnmount(() => {
            window.removeEventListener('scroll', handleScroll);
        });

        return {
            Guide,
            Key,
            Wallet,
            Memo,
            User,
            Ticket,
            Setting,
            Pointer,
            ChatLineSquare,
            Edit,Ship,
            Management,
            MagicStick,
            showSettingCard,
            changeDisplayView,
            showButton,
            scrollToTop,
            showSideMenu,
            hideSideMenu,
            isOverlayShow,
            isShowSideMenu,
            isAdmin
        };
    }
};
</script> 
<style>
.menu-icon {
    border: none;
    padding: 0;
    width: 1em;
    height: 1em;
    margin: -3px 0 0 0;
    background: none;
}

.toc-wrapper .toc-content .toc-items .toc-item {
    margin-top: 10px;
    font-size: 11px;
    color: var(--text-color-lighter);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: inherit;
}

.toc-item a {
    display: inline-block;
    position: relative;
    color: var(--text-color-lighter);
    transition: color var(--el-transition-duration);
}

.router-link-active {
    background-color: var(--link-active-bg-color);
}

.toc-item a.router-link-active {
    background-color: transparent;
}

.sidebar-groups .link {
    cursor: pointer;
    display: block;
    padding: 10px 10px;
    line-height: 1.5;
    font-size: .9rem;
    border-radius: 8px;
}

.sidebar-groups .link-text {
    line-height: 20px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-color-light);
    transition: color .5s;
    margin: 0;
}

.sub-nav {
    border-bottom: 1px solid var(--border-color);
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: border-color var(--el-transition-duration), background-color var(--el-transition-duration-fast);
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    padding: 0 32px;
    justify-content: space-between;
    z-index: var(--sub-nav-z-index);
    overflow: hidden;
}

::-webkit-scrollbar {
    width: 6px
}

::-webkit-scrollbar:horizontal {
    height: 6px
}

::-webkit-scrollbar-track {
    border-radius: 10px
}

::-webkit-scrollbar-thumb {
    background-color: #0003;
    border-radius: 10px;
    transition: all .2s ease-in-out
}

::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
    background-color: #0000004d
}

.dark ::-webkit-scrollbar-thumb {
    background-color: #fff3
}

.dark ::-webkit-scrollbar-thumb:hover {
    background-color: #fff6
}

.sub-nav {
    border-bottom: 1px solid var(--border-color);
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: border-color var(--el-transition-duration), background-color var(--el-transition-duration-fast);
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    padding: 0 32px;
    justify-content: space-between;
    z-index: var(--sub-nav-z-index);
    overflow: hidden
}

@media (max-width: 767px) {
    .sub-nav {
        padding: 0 24px
    }
}

.sub-nav .go-back-top {
    transform: translateY(100%);
    opacity: 0
}

.sub-nav .go-back-top.show {
    transform: translateY(0);
    opacity: 1
}

@media screen and (min-width: 960px) {
    .sub-nav {
        display: none !important
    }
}

.overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .6);
    transition: opacity .5s;
    z-index: var(--overlay-z-index)
}

.sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sidebar-z-index);
    width: var(--sidebar-width-xs);
    background-color: var(--bg-color);
    padding: 48px 32px 0;
    overflow-y: auto;
    transform: translate(-100%);
    transition: background-color var(--el-transition-duration-fast), opacity .25s, transform .5s cubic-bezier(.19, 1, .22, 1)
}

.sidebar.open {
    transform: translate(0)
}

.sidebar .sidebar-groups {
    padding: 0 0 5rem
}

.sidebar .sidebar-groups .sidebar-group__title {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 8px;
    line-height: 24px
}

.sidebar .sidebar-groups .sidebar-group+.sidebar-group {
    padding-top: 24px
}

@media (max-width: 767px) {
    .sidebar {
        width: calc(var(--vp-sidebar-width-mobile) - 14px)
    }
}

@media screen and (min-width: 768px) {
    .sidebar {
        width: calc(var(--vp-sidebar-width-small))
    }
}

@media screen and (min-width: 960px) {
    .sidebar {
        top: var(--header-height);
        transform: translate(0)
    }
}

@media screen and (min-width: 1440px) {
    .sidebar {
        padding: 48px 32px 96px calc((100vw - var(--vp-screen-max-width)) / 2);
        width: calc((100vw - var(--vp-screen-max-width)) / 2 + var(--vp-sidebar-width-small))
    }
}

@media screen and (min-width: 1680px) { 
    .sidebar {
        padding: 0px 48px 96px calc((100vw - var(--vp-screen-max-width)) / 2);
        width: calc((100vw - var(--vp-screen-max-width)) / 2 + var(--vp-sidebar-width-small));
        margin-top: 48px;
    }
}

.py-3 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
}

.items-center {
    align-items: center;
}

.flex {
    display: flex;
}

button.reset-btn {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
}

.leading-6 {
    line-height: 1.5rem;
}

.mr-2 {
    margin-right: 0.5rem;
}

.sub-nav .go-back-top.show {
    transform: translateY(0);
    opacity: 1;
}</style>