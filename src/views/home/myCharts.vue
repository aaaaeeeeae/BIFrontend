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
                <el-row v-for="(row, index) in splitCharts" :key="index" :gutter="20">
                    <el-col :span="12" v-for="(item, index) in row" :key="index">
                        <chartCard :data="item" :getAllCharts="getAllCharts"></chartCard>
                    </el-col>
                </el-row>
            </div>
            <div class="pagenation">
                <el-pagination background layout="prev, pager, next" :total="total" :current-page.sync="currentPage"
                    :page-size="pageSize">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import chartCard from '../../components/chartCard.vue'
import { getChartByPage } from '../../request/chartRequest.js'
import { getLoginUserId } from '../../request/userRequest.js'
export default {
    name: '',
    data() {
        return {
            total: 100,
            isEmpty: false,
            isLoading: true,
            input: '',
            currentPage: 1,
            pageSize: 4,
            charts: [],
            columnCount: 2,
            interval: null,
            userId: null
        }
    },
    methods: {
        async getAllCharts() {
            this.isLoading = true
            const params = {
                current: this.currentPage,
                pageSize: this.pageSize,
                sortField: 'createTime',
                sortOrder: 'desc'
            }
            try {
                const data = await getChartByPage(params)
                this.isLoading = false
                this.total = Number(data.total)
                if (Number(data.total) === 0) {
                    this.isEmpty = true
                }
                this.charts = JSON.parse(JSON.stringify(data.records))
            } catch (error) {
                this.$messageService.errorMessage(error);
            }
        },
        startPolling() {
            // 8s轮询一次
            this.interval = setInterval(this.getAllCharts, 60000)
        },
        stopPolling() {
            clearInterval(this.interval)
        },
        async getCurrentUserid() {
            try {
                const res = await getLoginUserId();
                this.userId = res.id
                console.log(this.userId);
            } catch (error) {
                console.log(error);
            }
        }

    },
    components: {
        chartCard
    },
    created() {
        // this.getCurrentUserid()
        // 初始先执行一次请求，后续每8s一次轮询
        this.getAllCharts()
        this.startPolling()
    },
    computed: {
        splitCharts() {
            const res = []
            // 有多少行
            const rowCount = Math.ceil(this.pageSize / this.columnCount)
            for (let i = 0; i < rowCount; i++) {
                const start = i * this.columnCount;
                const end = start + this.columnCount;
                res.push(this.charts.slice(start, end))
            }
            return res
        },
        isdetail() {
            return this.$route.query.id === undefined
        }
    },
    beforeDestroy() {
        this.stopPolling()
    },
    watch: {
        currentPage(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.getAllCharts()
            }
        }
    }
}
</script>

<style lang="less" scoped>
.all-charts {
    margin: 30px;
    width: 70vw;

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

    .content {
        overflow: hidden;
    }
}
</style>
