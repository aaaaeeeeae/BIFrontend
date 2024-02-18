<template>
    <div class="all-charts" v-loading="isLoading" element-loading-text="正在拼命加载中...">
        <div class="is-empty" v-if="isEmpty">
            <el-empty description="暂无图表，快去创建吧~"></el-empty>
        </div>
        <div v-else>
            <div class="serch">
                <el-input placeholder="请输入内容" v-model="input" clearable class="serch-content">
                </el-input>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </div>
            <div class="content">
                <el-row v-for="(item, index) in 2" :key="index" :gutter="20">
                    <el-col :span="12">
                        <chartCard></chartCard>
                    </el-col>
                    <el-col :span="12">
                        <chartCard></chartCard>
                    </el-col>
                </el-row>
            </div>
            <div class="pagenation">
                <el-pagination background layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import chartCard from '../../components/chartCard.vue'
export default {
    name: '',
    data() {
        return {
            total: 3,
            isEmpty: false,
            isLoading: false,
            input: ''
        }
    },
    methods: {

    },
    components: {
        chartCard
    }
}
</script>

<style lang="less" scoped>
.all-charts {
    margin: 30px;
    width: 70vw;
    height: 70vh;

    .serch {
        width: 100%;
        display: flex;
        margin-bottom: 30px;
        justify-content: space-around;

        .serch-content {
            width: 75%;
        }
    }

    .pagenation {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .el-row {
        margin-bottom: 20px;
    }
}</style>
