<template>
    <div class="home-page">
        <el-container class="warrap">
            <el-header>
                <topBar></topBar>
            </el-header>
            <el-container>
                <el-aside width="240px">
                    <leftBar></leftBar>
                </el-aside>
                <el-main class="main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        <el-backtop target=".home-page" :right="60" :bottom="165"></el-backtop>
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
    overflow-y: scroll;

    .warrap {
        width: 100%;
        height: 100%;
    }

    &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background: #eae9e9;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
}
</style>