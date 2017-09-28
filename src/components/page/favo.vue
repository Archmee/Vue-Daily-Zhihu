<template>
    <div style="padding-top: 50px;" @scroll="$emit('page-scroll', $event)">
        <z-list v-if="list.length > 0" :list="list"></z-list>
    </div>
</template>
<script>

import { mapGetters } from 'vuex'
import zList from '../List.vue'

export default {
    computed: {
        ...mapGetters({
            list: 'getFavoList',
        }),
    },
    components: {
        zList
    },
    activated() {
        // 切换头部工具栏
        this.$store.commit('CONFIG_HEADER', [
            'showBack', 'showTitle'
        ]);
    }
}
</script>
<style>

</style>