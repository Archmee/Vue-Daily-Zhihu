<template>
    <div>
        <transition name="fade" >
            <div class="menu theme-1" v-show="showMenu" >
                <header class="menu-header"></header>

                <ul class="menu-body hide-webkit-scrollbar">
                    <router-link to="/" tag="li">
                        首页
                        <span class="icon-wrapper"><i class="material-icons">home</i></span>
                    </router-link>
                    <li class="spliter"></li>
                    <router-link to="/todo" tag="li">
                        未读清单
                        <span class="small">（离线）</span>
                        <span class="icon-wrapper">
                            <!-- <i class="material-icons">storage</i> -->
                            <i class="material-icons">remove_red_eye</i>
                        </span>
                    </router-link>
                    <router-link to="/myfavo" tag="li">
                        我的收藏
                        <span class="icon-wrapper"><i class="material-icons">favorite_border</i></span>
                    </router-link>
                    <li class="spliter"></li>
                    <router-link v-for="(item, index) in menu" :key="index" :to="'/theme/'+item.id" tag="li">
                        <span class="icon-wrapper"><i class="material-icons">insert_link</i></span>
                        {{item.name}}
                    </router-link>
                </ul>

                <div class="menu-footer">
                    <span class="small">版权所有&copy; zhihu.com</span>
                </div>
            </div>
        </transition>
        <div v-show="showMenu"  @click="toggleMenu" class="cover theme-1"></div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import api from '../api';
import Vue from 'vue';

export default {
    computed: {
        ...mapState([
            'showMenu',
            'titleList'
        ])
    },
    data() {
        return {
            menu: []
        }
    },
    created() {
        this.$store.commit('SHOW_LOADING');
        api.getTopics().then((res) => {

            this.$store.commit('HIDE_LOADING');
            this.menu = res.data.others;

            for (var i = 0; i < this.menu.length; i++) {
                // this.titleList['/theme/' + this.menu[i].id] = this.menu[i].name; // not work well
                Vue.set(this.titleList, '/theme/' + this.menu[i].id, this.menu[i].name);
            }

        }).catch((err) => {

            this.$store.commit('HIDE_LOADING');
            this.$store.commit('SHOW_TOAST', err.toString());

        });
    },
    methods: {
        toggleMenu() {
            this.$store.commit('TOGGLE_SHOW_MENU');
        }
    }
}
</script>
<style lang="stylus" scoped>
ul
    padding-left: 0;
    list-style-type: none;

.cover, .menu
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100%;

.cover
    z-index: 9;
    width: 100%;

.menu
    z-index: 10;
    width: 260px;
    overflow: hidden;
    color: #FFF;


$header-height = 50px;

eq-height($h) {
    height: $h;
    line-height: $h;
}

.menu-header
    width: 100%;
    eq-height($header-height);
    text-align: center;
    font-size: 1.2rem;

.icon-wrapper
    float: right;
    height: 100%;

.material-icons
    color: #FFF;
    line-height: inherit;

.small
    color: #EEE;
    font-size: .8rem;

.menu-body
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: $header-height;
    width: 100%;
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    padding-top: $header-height;
    li
        cursor: pointer;
        padding: 0 20px;
        font-size: 1rem;
        eq-height(40px);

        &:hover
            background-color: rgba(0, 0, 0, .2);

.menu-body .spliter
    height: 0;
    padding: 0;
    margin: 0 20px;
    border-top: 1px inset #FFF;

.menu-footer
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    eq-height(50px);
    text-align center;

.router-link-exact-active.active .material-icons
    color: #FFA500;

// 菜单淡入淡出动画
.fade-enter-active, .fade-leave-active
    transition: all .3s ease;

.fade-enter, .fade-leave-to
    opacity: 0;
    transform: translateX(-100%);

</style>