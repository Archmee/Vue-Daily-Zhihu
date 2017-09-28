<template>
    <div class="theme" @scroll="$emit('page-scroll', $event)">
        <image-head :topic="topic" :height="'50%'"></image-head>
        <z-list :list="list"></z-list>
    </div>
</template>
<script>
import api from '../../api'
import zList from '../List.vue'
import ImageHead from '../ImageHead.vue'

export default {
    data() {
        return {
            'lastId': '',
            'topic': {}
        }
    },
    computed: {
        list() {
            return this.topic.stories;
        }
    },
    components: {
        zList,
        ImageHead
    },
    activated() {
        this.$store.commit('CONFIG_HEADER', [
            'showBack', 'showTitle'
        ]);
        var newId = this.$route.params.id
        if (newId === this.lastId) { //防止重复请求
            return ;
        }

        this.lastId = newId;
        this.$store.commit('SHOW_LOADING');

        api.getTopicsById(newId).then(({data}) => {
            this.topic = data;
            this.$store.commit('HIDE_LOADING');
        }).catch((err) => {
            this.$store.commit('HIDE_LOADING');
            this.$store.commit('SHOW_TOAST', err.toString());
        });
    }
}
</script>
<style lang="stylus" scoped>
</style>