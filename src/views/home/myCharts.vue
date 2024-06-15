<template>
    <div class="all-charts" v-loading="isLoading" element-loading-text="正在拼命加载中...">
        <div class="serch">
            <el-row :gutter="20">
                <el-col :span="12" class="line-item">
                    <span>图表名称</span>
                    <el-input placeholder="请输入图表名" v-model="serchInput" clearable class="serch-content"
                        @clear="getAllCharts">
                    </el-input>
                </el-col>
                <el-col :span="12" class="line-item">
                    <span>时间范围</span>
                    <div class="block">
                        <el-date-picker v-model="value2" type="daterange" :picker-options="pickerOptions"
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                        </el-date-picker>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8" class="line-item">
                    <span>图表类型</span>
                    <el-select v-model="chartType" placeholder="请选择图表类型">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="折线图" value="折线图"></el-option>
                        <el-option label="柱状图" value="柱状图"></el-option>
                        <el-option label="饼图" value="饼图"></el-option>
                        <el-option label="散点图" value="散点图"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="7" :offset="3" class="line-item">
                    <span>排列顺序</span>
                    <el-radio-group v-model="sortOrder">
                        <el-radio-button label="descend">降序</el-radio-button>
                        <el-radio-button label="ascend">升序</el-radio-button>
                    </el-radio-group>
                </el-col>
                <el-col :span="2" :offset="3">
                    <el-button type="primary" icon="el-icon-search" @click="getAllCharts">搜索</el-button>
                </el-col>
            </el-row>

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
            userId: null,
            sortOrder: 'descend',
            chartType: '',
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            value2: ''
        }
    },
    methods: {
        async getAllCharts() {
            this.isEmpty = false
            const params = {
                current: this.currentPage,
                pageSize: this.pageSize,
                sortField: 'createTime',
                sortOrder: this.sortOrder,
                name: this.serchInput.trim(),
                chartType: this.chartType
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
            this.isLoading = false
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
        flex-wrap: nowrap;
        width: 100%;
        margin-bottom: 30px;

        span {
            color: #606266;
            white-space: nowrap;
            font-family: "Hiragino Sans GB";
            font-size: 14px;
            margin-right: 20px;
        }

        .line-item {
            display: flex;
            align-items: center;
        }

        .serch-content {
            width: 70%
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
