<template>
    <div class="article" @scroll="$emit('page-scroll', $event)">
        <image-head :topic="article" :height="'50%'"></image-head>
        <div class="main-content" v-html="article.body" @click.prevent="toNewTap"></div>
    </div>
</template>
<script>
import axios from 'axios'
import api from '../../api'
import { mapState } from 'vuex'

import ImageHead from '../ImageHead.vue'

import { TODO_LIST } from '../../store.js'
import localStore from '../../api/store.js'

export default {
    computed: {
        ...mapState([
            'isLoading',
            'article',
            'currentId',
        ]),
    },
    components: {
        ImageHead
    },
    activated() {

        // 切换头部工具栏
        this.$store.commit('CONFIG_HEADER', [
            'showBack', 'showPlay', 'showFavo', 'showTodo'
        ]);

        this.updateData();
    },
    deactivated() {},
    methods: {
        updateData() {
            // 判断文章内容还在内存中 并且刚才打开过，是的话不用重新加载
            if (this.$store.state.article && this.currentId === this.$route.params.id) {
                return ;
            }
            // 否则清空缓存数据，重新请求数据
            this.$store.state.article = {};
            this.$store.state.currentId = this.$route.params.id;

            // 从localStorage中找到数据直接使用
            var data = localStore.data(TODO_LIST + '_' + this.currentId);
            if (data) {
                this.$store.state.article = data;
                return ;
            }

            this.$store.commit('SHOW_LOADING');

            api.getNewsById(this.currentId).then((res) => {
                this.$store.commit('HIDE_LOADING');
                this.$store.state.article = res.data;
            }).catch((err) => {
                this.$store.commit('HIDE_LOADING');
                this.$store.commit('SHOW_TOAST', err.toString());
            })
        },
        toNewTap(ev) { //在新标签打开点击链接
            var url = ev.target.href;
            if (url) {
                window.open(url);
            }
        }
    },
    watch: {
        $route (to) {
            if (/^\/article/.test(to.path)) {
                this.updateData();
            }

        }
    }
}
</script>
<style lang="stylus" scoped>
@import "../../assets/css/news_qa.auto.css"

.main-content
    padding: 10px 1%;

</style>