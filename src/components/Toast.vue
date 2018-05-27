<template>
    <div class="toast-wrapper anim" ref="animer">
        <span>{{text}}</span>
    </div>
</template>
<script>
    export default {
        props: ['text'],
        mounted() {
            var vue = this;
            //检测动画结束后要隐藏
            // animationstart // animationiteration // animationcancel // animationend
            this.$refs.animer.addEventListener("webkitAnimationEnd", function() {
                vue.$store.commit('HIDE_TOAST');
            }, false);
        }
    }
</script>
<style lang="stylus" scoped>
.toast-wrapper
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    opacity: 0;
    text-align: center;
    span
        color: #FFF;
        border-radius: 6px;
        padding: 8px 20px;
        background-color: rgba(0, 0, 0, .6);

.anim
    animation: fadeinout 3s linear;

@keyframes fadeinout {
    0% {
        opacity: 0;
        transform: translateY(0px);
    }
    10% {
        opacity: 1;
        transform: translateY(-250px);
    }
    14% {
        transform: translateY(-240px);
    }
    20% {
        transform: translateY(-250px);
    }
    95% {
        opacity: 1;
        transform: translateY(-250px);
    }
    100% {
        transform: translateY(-230px);
    }
}
</style>