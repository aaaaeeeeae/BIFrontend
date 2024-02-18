<template>
    <div class="left-bar">
        <el-menu default-active="/home/createChart" :router="true">
            <el-menu-item index="/home/createChart">
                <i class="el-icon-s-data"></i>
                <span slot="title">分析数据</span>
            </el-menu-item>
            <el-menu-item index="/home/myCharts">
                <i class="el-icon-s-marketing"></i>
                <span slot="title">我的图表</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
  
<script>

export default {
    components: {

    },
    data() {
        return {
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>
  
<style scoped lang="less">
.left-bar ::v-deep{
    height: 100%;
    .el-menu {
        height: 100%;
    }
}
</style>