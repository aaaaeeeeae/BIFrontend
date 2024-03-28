<template>
    <div class="warrap">
        <div class="chart" ref="chart" v-if="option">
        </div>
        <div v-else v-loading="loading" class="loading"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: 'echarts',
    data() {
        return {
            chartInstance: null,
            loading: true
        }
    },
    methods: {
        initChart() {
            const div = this.$refs.chart
            this.chartInstance = echarts.init(div)
            this.updateCharts(this.option)
        },
        updateCharts(option) {
            if (this.chartInstance) {
                this.chartInstance.setOption(option)
            }
        }
    },
    props: ['option'],
    watch: {
        option: {
            deep: true,
            handler(newVal) {
                this.updateCharts(newVal)
            }
        }
    },
    mounted() {
        this.initChart()
    }
}
</script>

<style lang="less" scoped>
.warrap {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .chart {
        height: 100%;
        width: 100%;
    }

    .loading {
        height: 100%;
        width: 100%;
    }
}
</style>
