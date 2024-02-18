<template>
    <div class="home-page">
        <el-container style="height: 100vh;">
            <el-header>
                <topBar></topBar>
            </el-header>
            <el-container>
                <el-aside width="240px">
                    <leftBar></leftBar>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
  
<script>
import topBar from '../../components/topBar.vue';
import leftBar from '../../components/leftBar.vue';
export default {
    name: 'home',
    components: {
        topBar,
        leftBar
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>
  
<style scoped lang="less">
.home-page {
    position: absolute;
    height: 100vh;
    width: 100vw;
}
</style>