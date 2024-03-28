<template>
    <div class="all-charts" v-loading="isLoading" element-loading-text="正在拼命加载中...">
        <div class="serch">
            <el-input placeholder="请输入图表名" v-model="serchInput" clearable class="serch-content" @clear="getAllCharts">
            </el-input>
            <el-button type="primary" icon="el-icon-search" @click="getAllCharts">搜索</el-button>
        </div>
        <div class="is-empty" v-if="isEmpty">
            <el-empty description="暂无图表，快去创建吧~"></el-empty>
        </div>
        <div v-else>
            <div class="content">
                <el-row v-for="(row, index) in splitCharts" :key="index" :gutter="20">
                    <el-col :span="12" v-for="item in row" :key="item.id">
                        <chartCard :data="item" :getAllCharts="getAllCharts" :userId="userId"></chartCard>
                    </el-col>
                </el-row>
            </div>
            <div class="pagenation">
                <el-pagination background layout="prev, pager, next" :total="total" :current-page="currentPage"
                    :page-size="pageSize" @current-change="handlePageChange">
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
            serchInput: '',
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
            this.isEmpty = false
            const params = {
                current: this.currentPage,
                pageSize: this.pageSize,
                sortField: 'createTime',
                sortOrder: 'desc',
                name: this.serchInput.trim(),
            }
            try {
                const data = await getChartByPage(params)
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
            // 1min轮询一次
            this.interval = setInterval(this.getAllCharts, 60000)
        },
        stopPolling() {
            clearInterval(this.interval)
        },
        async getCurrentUserid() {
            try {
                const res = await getLoginUserId();
                this.userId = res.id
            } catch (error) {
                console.log(error);
            }
        },
        handlePageChange(newVal) {
            sessionStorage.setItem(`currentPage-${this.userId}`, newVal)
            this.currentPage = newVal
            this.getAllCharts()
        }
    },
    components: {
        chartCard
    },
    async created() {
        // 初始先执行一次请求，后续每8s一次轮询
        try {
            this.isLoading = true
            await this.getCurrentUserid()
            this.currentPage = parseInt(sessionStorage.getItem(`currentPage-${this.userId}`)) || 1
            await this.getAllCharts()
            this.isLoading = false
            this.startPolling()
        } catch (error) {
            console.log(error);
        }
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
