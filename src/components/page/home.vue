<template>
    <div class="home" ref="scroller" @scroll="scrollY = $event.target.scrollTop; $emit('page-scroll', $event)">
        <mt-swipe :auto="4000" class="swipe">
            <mt-swipe-item v-for="(item, index) in top" :key="index">
                <router-link :to="'/article/'+item.id" >
                    <image-head :topic="item"></image-head>
                </router-link>
            </mt-swipe-item>
        </mt-swipe>
        <div class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <div class="date-list" v-for="(date, index) in dateList" :key="index">
                <div class="date-spliter">
                    <span>{{ date | formatDate }}</span>
                </div>

                <z-list v-if="list[date]" :list="list[date]"></z-list>
                <div v-else style="text-align: center;">
                    没有更多了...
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../../api'
    import zList from '../List.vue'
    import ImageHead from '../ImageHead.vue'

    export default {
        data() {
            return {
                top: [],
                dateList: [],
                list: {},
                busy: true, //禁用首次无用加载
                scrollY: 0,
            }
        },
        activated() {
            // 切换头部工具栏
            this.$store.commit('CONFIG_HEADER', [
                'showMenu', 'showTitle', 'showSearch'
            ]);

            // 页面激活 恢复滚动条位置
            this.$refs.scroller.scrollTop = this.scrollY;
        },
        deactivated() {},
        mounted() {
            this.$store.commit('SHOW_LOADING');

            // 滚动时候保存滚动位置，方便从其他页面返回时跳转到顶部
            // var _this = this;
            // this.$refs.scroller.onscroll = function(ev) {
            //     _this.scrollY = ev.target.scrollTop;
            // }

            api.getNews().then(({data}) => {
                this.$store.commit('HIDE_LOADING');
                this.dateList.push(data.date);
                this.list[data.date] = data.stories;
                this.top = data.top_stories;
                this.busy = false; //启动无限滚动
            }).catch((err) => {
                this.$store.commit('HIDE_LOADING');
                this.$store.commit('SHOW_TOAST', err.toString());
            });
        },
        methods: {
            loadMore() { //下拉获取更多数据
                this.$store.commit('SHOW_LOADING');
                this.busy = true;

                var dateString = this.dateList[this.dateList.length-1]; //获取上一次加载到的日期

                api.getNewsByDate(dateString).then(({data}) => { //getNewsByDate是返回指定日期前一天的数据
                    this.$store.commit('HIDE_LOADING');
                    this.dateList.push(data.date);
                    this.list[data.date] = data.stories;
                    this.busy = false;
                }).catch((err) => {
                    this.$store.commit('HIDE_LOADING');
                    this.$store.commit('SHOW_TOAST', err.toString());
                });

            }
        },
        components: {
            zList,
            ImageHead
        },
        filters: {
            formatDate(date) {
                var res = date.match(/(\d{4})(\d{2})(\d{2})/);
                res.shift();
                return res.join('.');
            }
        }
    }
</script>
<style lang="stylus" scoped>

.swipe
    width: 100%;
    height: 100%;

.date-spliter
    height: 15px;
    width: 60%;
    margin: 0 auto;
    margin-top: 10px
    margin-bottom: 25px;
    text-align: center;
    border-bottom: 1px inset #DDD;
    span
        display: inline-block;
        padding: 0 20px;
        line-height: 30px;
        color: #BBB;
        font-size: .9rem;
        background-color: rgb(246, 244, 244);

</style>