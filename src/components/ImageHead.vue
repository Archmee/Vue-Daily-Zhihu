<template>
    <div class="img-cover" :style="customStyle">
        <h2 class="title">{{ topic.title || topic.description }}</h2>
        <div class="spliter"></div>
        <span v-if="topic.image_source" class="src-text">图片：{{ topic.image_source }}</span>
        <span v-else-if="topic.name" class="src-text">专题：{{ topic.name }}</span>
    </div>
</template>
<script>
    export default {
        props: {
            topic: {
                type: Object,
                default: {}
            },
            height: {
                type: String,
                default: '100%',
            }
        },
        computed: {
            customStyle() {
                return {
                    'height': this.height,
                    'background-image': 'url(' + (this.topic.image || this.topic.background) + ')'
                };
            }
        }
    }
</script>
<style lang="stylus" scoped>
.img-cover
    width: 100%;
    height: 100%;
    position: relative;
    background: #DDD 50% 40% / cover no-repeat;
    box-shadow: 0 0 260px 2px rgba(0, 0, 0, .6) inset;
    .title
        position: absolute;
        right: 20px;
        bottom: 3rem;
        width: 80%;
        margin: 20px 0;
        color: #FFF;
        line-height: 1.6;
        text-align: right;
    .spliter
        position: absolute;
        right: 20px;
        bottom: 3rem;
        height: 0;
        width: 10rem;
        border-bottom: 3px solid #ff0;
    .src-text
        position: absolute;
        bottom: 1rem;
        right: 20px;
        font-size: .7rem;
        color: #EEE;
</style>