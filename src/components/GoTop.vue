<template>
    <div class="go-top anim" @click.stop="goTop">
        <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1446"><path d="M512 64.709791c-247.031233 0-447.289186 200.257953-447.289186 447.289186 0 247.031233 200.257953 447.289186 447.289186 447.289186 247.031233 0 447.289186-200.258976 447.289186-447.289186C959.289186 264.967744 759.03021 64.709791 512 64.709791zM750.353596 644.714627 510.298242 383.188262 271.188422 644.680858l-53.648874 0.033769 292.726971-322.458109 296.193933 322.458109L750.353596 644.714627z" fill="#999" p-id="1447"></path></svg>
    </div>
</template>
<script>
    export default {
        methods: {
            goTop() { //点击返回顶部按钮触发事件，然后通知父组件
                this.$emit('go-top');
            }
        }
    }
</script>
<style lang="stylus" scoped>
.go-top
    position: absolute;
    z-index: 8;
    bottom: 2rem;
    right: 2rem;
    width: 36px;
    height: 36px;
    font-size: 36px;
    cursor: pointer;

.anim
    animation: fadein 1s ease;

@keyframes fadein {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

</style>
