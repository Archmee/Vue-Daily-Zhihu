<template>
    <header class="header centernize theme-1 ">

            <div v-show="headerConfig.showMenu" class="icon-wrapper left" @click="toggleMenu"><i class="material-icons">menu</i></div>
            <div v-show="headerConfig.showBack" class="icon-wrapper left" @click="goback"><i class="material-icons">chevron_left</i></div>

            <div class="contentWrap">
                <transition name="fade" mode="out-in">
                    <h1  v-if="headerConfig.showTitle && !isSearching" class="title">{{ title }}</h1>
                    <div v-else-if="isSearching" class="search-box" >
                        <input type="text" autofocus="true" placeholder="关键词" :value="keyWords">
                    </div>
                </transition>
            </div>

            <div v-show="headerConfig.showSearch" class="icon-wrapper right" >
                <i v-if="!isSearching" class="material-icons" @click.stop="showSearchBox">search</i>
                <i v-else class="material-icons" @click.stop="hiddeSearchBox">close</i>
            </div>

            <div v-show="headerConfig.showFavo" class="icon-wrapper right" @click.stop="toggleFavo">
                <i v-if="!isFavo" class="material-icons">favorite_border</i>
                <i v-else class="material-icons" style="color: #F00;">favorite</i>
            </div>

            <div v-show="headerConfig.showTodo" class="icon-wrapper right"  @click.stop="toggleTodo">
                <i v-if="!isTodo" class="material-icons" >remove_red_eye</i>
                <i v-else class="material-icons" style="color: #FFA500">remove_red_eye</i>
            </div>

            <div v-show="headerConfig.showPlay" class="icon-wrapper right" @click.stop="togglePlay">
                <i v-if="!isPlaying" class="material-icons">volume_mute</i>
                <i v-else  class="material-icons" >volume_up</i>
            </div>

    </header>
</template>
<script>
import { mapState, mapGetters } from 'vuex';

export default {

    data() {
        return {
            keyWords: '',
            isPlaying: false,
            isSearching: false,
        }
    },
    computed: {
        title() {
            return this.titleList[this.$route.path];
        },
        ...mapState([
            'showMenu',
            'titleList',
            'headerConfig'
        ]),
        ...mapGetters([
            'isFavo',
            'isTodo'
        ])
    },
    methods: {
        showSearchBox() {
            this.isSearching = true;
        },
        hiddeSearchBox() {
            this.keyWords = '';
            this.isSearching = false;
        },
        toggleMenu() {
            this.$store.commit('TOGGLE_SHOW_MENU');
        },
        togglePlay() {
            this.isPlaying = !this.isPlaying;
            if (this.isPlaying) {
                this.$store.commit('SHOW_TOAST', '暂未接入语音SDK');
            }
        },
        toggleFavo() {
            this.$store.commit('TOGGLE_FAVO');
            if (this.isFavo) {
                this.$store.commit('SHOW_TOAST', '收藏成功，请在"我的收藏"中查看');
            } else {
                this.$store.commit('SHOW_TOAST', '已取消收藏');
            }
        },
        toggleTodo() {
            this.$store.commit('TOGGLE_TODO');
            if (this.isTodo) {
                this.$store.commit('SHOW_TOAST', '离线成功，请在"未读清单"中查看');
            } else {
                this.$store.commit('SHOW_TOAST', '已删除该离线内容');
            }
        },
        goback() {
            this.$router.push('/');
        }
    },
    watch: {
        $route (to) {
            this.isSearching = false;
        }
    },

}
</script>
<style lang="stylus" scoped>

$height = 50px;

.icon-wrapper
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

.header
    position: fixed;
    z-index: 8;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: $height;
    line-height: $height;
    font-size: 1.5rem;
    color: #FFF;
    text-align: center;
    overflow: hidden;

    .title
        display: inline-block;
        margin: 0;
        font-size: 24px;
        font-weight: normal;
        text-align: center;

.contentWrap
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;

.search-box
    display: inline-block;
    width: 70%;
    input[type="text"]
        margin: 0 auto;
        width: 100%;
        height: 30px;
        line-height: 30px;
        outline: 0;
        border: 0px solid #CCC;
        border-radius: 20px;
        font-size: 1.1rem;
        color: #444;
        text-align: center;


.icon-wrapper
    display: inline-block;
    width: $height;
    height: $height;
    line-height: $height;
    text-align: center;
    cursor: pointer;

.left
    float: left;

.right
    float: right;

.material-icons
    font-size: 1.8rem;
    width: 100%;
    height: 100%;
    line-height: inherit;

// 搜索框淡入淡出动画
.fade-enter-active, .fade-leave-active
    transition: all .3s ease;

.fade-enter, .fade-leave-to
    opacity: 0;
    transform: translateY(-100%);

</style>
