<template>
    <div class="toast-wrapper anim">
        <span>{{text}}</span>
    </div>
</template>
<script>
    export default {
        props: ['text']
    }
</script>
<style lang="stylus" scoped>
.toast-wrapper
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px 20px;
    line-height: 1.4;
    box-sizing: border-box;
    transform: translateY(-250px);
    text-align: center;
    // background-color: rgba(0, 0, 0, .6);


.anim
    animation: fadeinout .3s 1;

@keyframes fadeinout {
    0% {
        opacity: 0;
        transform: translateY(0px);
    }
    80% {
        transform: translateY(-260px);
    }
    95% {
        transform: translateY(-240px);
    }
    100% {
        opacity: 1;
        transform: translateY(-250px);
    }
}
</style>