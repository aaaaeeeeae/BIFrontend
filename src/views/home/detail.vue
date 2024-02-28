<template>
    <div class="detail">
        <goBack></goBack>
        <div class="content">
            <el-card class="res-card">
                <el-skeleton :rows="12" animated :loading="loading" />
                <layout v-for="(value, key) in resultData" :key="key">
                    <template slot="title">
                        <span>{{ key }}</span>
                    </template>
                    <template slot="content">
                        <span>{{ value }}</span>
                    </template>
                </layout>
            </el-card>
            <el-card class="req-card">
                <el-skeleton :rows="12" animated :loading="loading" />
                <layout v-for="(value, key) in queryData" :key="key">
                    <template slot="title">
                        <span>{{ key }}</span>
                    </template>
                    <template slot="content">
                        <span>{{ value }}</span>
                    </template>
                </layout>
                <layout>
                    <template slot="title">
                        <span>图表数据</span>
                    </template>
                    <template slot="content">
                        <el-table :data="tableData" style="width: 100%" max-height="250" border>
                            <el-table-column v-for="(column, index) in Object.keys(tableData[0])" :key="index"
                                :prop="column" :label="column">
                            </el-table-column>
                        </el-table>
                    </template>
                </layout>
            </el-card>
        </div>
        <div class="icon-but">
            <el-button type="primary" icon="el-icon-edit" circle @click="editChart"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteChart"></el-button>
        </div>
    </div>
</template>

<script>
import { deleteChart, getChartById } from '../../request/chartRequest'
import handleTable from '../../utils/hadleTableData.js'
import { mappingReq, mappingRes } from '../../utils/mapping.js'
import layout from '../../components/layout.vue'
import goBack from '../../components/goBack.vue'
export default {
    name: '',
    data() {
        return {
            loading: true,
            data: null,
            tableData: [],
            queryData: {},
            resultData: {}
        }
    },
    methods: {
        deleteChart() {
            const successAction = async () => {
                await deleteChart({ id: this.data.id })
            }
            const cancelAction = () => {
                this.$messageService.warnningMessage('已取消删除')
            }
            const config = {
                title: '',
                message: '此操作将永远删除你的图表哦，真的要删除吗？',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                showClose: false
            }
            this.$confirmService.confirm(successAction, cancelAction, config).then(() => {
                this.$messageService.successMessage('已成功删除')
                this.$router.replace('/home/myCharts')
            }).catch(err => {
                if (err !== undefined) {
                    this.$messageService.errorMessage(err)
                }
            })
        },
        editChart() {
            this.$router.push(`/home/edit?id=${this.chartId}`)
        },
        async init() {
            try {
                this.loading = true
                const data = await getChartById(this.chartId)
                this.loading = false
                this.data = JSON.parse(JSON.stringify(data))
                this.tableData = handleTable(this.data.chartData)
                this.queryData = mappingReq(this.data)
                this.resultData = mappingRes(this.data)
            } catch (error) {
                console.log(error);
            }
        }
    },
    components: {
        layout,
        goBack
    },
    created() {
        this.init()
    },
    computed: {
        chartId() {
            return this.$route.query.id
        }
    }
}
</script>

<style lang="less" scoped>
.detail {
    position: relative;
    margin: 10px;

    .content {
        margin-top: 20px;
    }

    .res-card {
        margin-bottom: 30px;
    }

    .icon-but {
        position: fixed;
        right: 60px;
        bottom: 65px;
        z-index: 1000;
        display: flex;
        flex-direction: column;

        .el-button {
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
        }

        .el-button+.el-button,
        .el-checkbox.is-bordered+.el-checkbox.is-bordered {
            margin-left: 0px;
            margin-top: 10px;
        }
    }
}
</style>
