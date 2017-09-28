<template>
    <ul class="card-list" >
        <router-link v-for="(article, index) in list" :key="index" :to="'/article/'+article.id" tag="li">
            <card :img="article.images && article.images[0]" :title="article.title" :href="'#/article/'+article.id"></card>
        </router-link>
    </ul>
</template>
<script>
    import card from './Card.vue'

    export default {
        props: {
            list: {
                type: Array,
                default: Array
            }
        },
        components: {
            card
        }
    }
</script>
<style lang="stylus" scoped>
ul
    margin: 0;
    padding-left: 0;
    list-style-type: none;

</style>