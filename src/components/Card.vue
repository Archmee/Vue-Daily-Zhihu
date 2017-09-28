<template>
    <a class="card">
        <div class="img-wrap" :class="{blur: !img}">
            <img :src="img">
        </div>
        <h3 v-show="title" class="title">{{title}}</h3>
    </a>
</template>
<script>
    export default {
        props: [
            'img',
            'title'
        ]
    }
</script>
<style lang="stylus" scoped>
.card
    display: flex;
    align-items: center;
    overflow: hidden;
    height: 7rem; //120px
    margin: 30px 20px;
    cursor: pointer;

.title
    margin: 0;
    margin-left: 15px;
    line-height: 1.6;

.img-wrap
    width: 7rem;
    height: 100%;
    border: 0;
    border-radius: 10px;
    background: linear-gradient( to bottom right, #009DD7, #FFF);

.blur
    -webkit-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(2px);

img
    width: 7rem;
    height: 100%;
    border-radius: 5px;

a
    text-decoration: none;

a:link
    color: #444;
a:visited
    color: #BBB;

</style>