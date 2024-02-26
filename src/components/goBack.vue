<template>
    <div class="goBack">
        <el-page-header @back="goBack">
        </el-page-header>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            
        }
    },
    methods:{
        goBack() {
            this.$router.back();
        }
    }
}
</script>

<style lang="less" scoped>
.goBack {
    margin-bottom: 20px;
}
</style>
