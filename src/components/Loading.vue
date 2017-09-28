<template>
    <div class="loading-component"></div>
</template>
<script>
export default {

}
</script>
<style lang="stylus" scoped>
.loading-component
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 50px;
    height: 50px;
    border-radius: 5px;
    background: url(../assets/ajax-loader.gif) no-repeat 50% 50%;
</style>