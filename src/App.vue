<template>
    <div id="app" class="centernize">
        <z-menu></z-menu>
        <z-header :class="{isShowMenu: showMenu}"></z-header>

        <transition name="fade">
            <keep-alive>
                <router-view class="page" :class="{isShowMenu: showMenu}" @page-scroll="record" ref="page"></router-view>
            </keep-alive>
        </transition>

        <loading v-show="isLoading"></loading>
        <toast v-show="showToast" :text="toastText"></toast>
        <go-top v-show="showGoTop" :class="{isShowMenu: showMenu}" @go-top="goTop"></go-top>
    </div>
</template>

<script>
import zHeader from './components/Header.vue'
import zMenu from './components/Menu.vue'
import loading from './components/Loading.vue'
import toast from './components/Toast.vue'
import goTop from './components/GoTop.vue'

import { mapState } from 'vuex'

import api from './api'

export default {
    name:'app',
    data() {
        return {
            scrollY: 0,
        };
    },
    computed: {
        ...mapState([
            'isLoading',
            'toastText',
            'showToast',
            'showMenu',
        ]),
        showGoTop() {
            if (this.scrollY > 0) {
                return true;
            }
            return false;
        }
    },
    components: {
        zHeader,
        zMenu,
        loading,
        toast,
        goTop,
    },
    methods: {
        record(ev) { //记录滚动事件
            this.scrollY = ev.target.scrollTop;
        },
        goTop() { //接收回到顶部事件，动画
            var el = this.$refs.page.$el;
            var yPos = this.scrollY;

            var timer = window.setInterval(function() {
                if (yPos <= 0) {
                    window.clearInterval(timer);
                } else {
                    yPos = parseInt(yPos / 2);
                    el.scrollTop = yPos;
                }
            }, 30);
        }
    },
    watch: {
        $route (to, from) {
            this.scrollY = 0;
            this.$store.commit('HIDE_MENU');
            this.$store.commit('HIDE_TOAST');
            this.$store.commit('HIDE_LOADING');
        }
    }
}
</script>

<style lang="stylus" scoped>
#app
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    box-shadow: 0 50px 100px 10px #AAA;

.isShowMenu
    transition: all .3s ease;
    // left: 260px !important;
    -webkit-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(3px);

.page
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(246, 244, 244) !important;
.fullPage
    width: 100%;
    height: 100%;

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
    width: 10px;
    background-color: #F5F5F5;

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
    -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
    background-color: #F5F5F5;

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
    border-radius: 10px;
    -webkit-box-shadow:inset 0 0 10px rgba(0,0,0, .5);
    background-color: #DDD;

// 页面切换动画
.fade-enter-active, .fade-leave-active
    transition: all 1s ease;

.fade-enter, .fade-leave-to
    opacity: 0;

</style>