<template>
    <div class="content-wrap">
        <div class="aside-l">
            <slot name='left'></slot>
        </div>
        <div class="content">
            <slot name='content'></slot>
        </div>
        <div class="aside-r">
            <slot name='right'></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name:'content'
    }
</script>

<style scoped>
.content-wrap{
    display: flex;
    justify-content: center;
}
.content{
    width: 1040px;
    padding: 20px 30px;
    border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.aside-r,.aside-l{
    width: 150px;
}
</style>