<template>
    <div class="warrap" @click.stop="showDetail">
        <el-card class="box-card">
            <div class="more-icon" @click.stop="showMore">
                <i class="el-icon-more"></i>
            </div>
            <div v-if="drawerShow" class="overlay" @click.stop="handleOverlayClick"></div>
            <el-drawer :visible.sync="drawerShow" :with-header="false" direction="btt" size="40%" :modal="false"
                class="card-float">
                <div class="float-content">
                    <el-button type="primary" icon="el-icon-edit" circle @click.stop="editChart"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click.stop="deleteChart"></el-button>
                </div>
            </el-drawer>
            <div class="chart-warrap">
                <echarts :option="chart"></echarts>
            </div>
            <div class="chart-name">{{ data.name }}</div>
        </el-card>
    </div>
</template>

<script>
import { deleteChart } from '../request/chartRequest.js'
import echarts from './echarts.vue';
import { convertToObj } from '../utils/handleMarked'
export default {
    name: '',
    data() {
        return {
            drawerShow: false,
            chart: null
        }
    },
    methods: {
        showMore() {
            this.drawerShow = true;
        },
        showDetail() {
            this.$router.push({
                path: '/home/detail',
                query: {
                    id: this.data.id
                }
            })
        },
        editChart() {
            this.drawerShow = false
            this.$router.push(`/home/edit?id=${this.data.id}`)
        },
        deleteChart() {
            this.drawerShow = false
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
                this.getAllCharts()
            }).catch(err => {
                if (err !== undefined) {
                    this.$messageService.errorMessage(err)
                }
            })
        },
        handleOverlayClick() {
            this.drawerShow = false
        }
    },
    props: ['data', 'getAllCharts'],
    components: {
        echarts
    },
    watch: {
        data: {
            deep: true,
            immediate: true,
            handler(newValue) {
                this.data = newValue
                this.chart = convertToObj(this.data.genChart)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.warrap {
    margin: 10px;

    .box-card {
        position: relative;
        cursor: pointer;

        .more-icon {
            position: absolute;
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            right: 10px;
            top: 10px;
            cursor: pointer;
            border-radius: 30px;

            &:hover {
                background-color: #f4f4f5;
            }
        }

        .card-float {
            position: absolute;
            z-index: 11;

            .float-content {
                display: flex;
                height: 100%;
                justify-content: space-around;
                align-items: center;
            }
        }

        .chart-warrap {
            position: relative;
            width: 100%;
            height: 200px;
            margin-top: 15px;
            margin-bottom: 10px;
        }

        .chart-name {
            font-size: 11px;
            font-weight: 600;
            text-align: center;
        }

        &:hover {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.219);
        }

        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10;
        }
    }
}
</style>
