<template>
    <div class="left-bar">
        <el-menu :default-active="defaultActive" :router="true">
            <el-menu-item index="/home/createChart">
                <i class="el-icon-s-data"></i>
                <span slot="title">分析数据</span>
            </el-menu-item>
            <el-menu-item index="/home/myCharts">
                <i class="el-icon-s-marketing"></i>
                <span slot="title">我的图表</span>
            </el-menu-item>
            <el-menu-item index="/home/prediction">
                <i class="el-icon-s-opportunity"></i>
                <span slot="title">数据预测</span>
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
    computed: {
        defaultActive() {
            const strs = this.$route.path.split('/')
            const path = `/${strs[1]}/${strs[2]}`
            const children = ['/home/detail', '/home/edit']
            return children.includes(path) ? '/home/myCharts' : path
        }
    }
}
</script>
  
<style scoped lang="less">
.left-bar ::v-deep {
    height: 100%;

    .el-menu {
        height: 100%;
    }
}
</style>