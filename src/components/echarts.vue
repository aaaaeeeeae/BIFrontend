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
            loading: false
        }
    },
    methods: {
        initChart() {
            const div = this.$refs.chart
            this.chartInstance = echarts.init(div)
            this.updateCharts()
        },
        updateCharts() {
            if (this.chartInstance) {
                this.chartInstance.setOption(this.option)
            }
        }
    },
    props: ['option'],
    watch: {
        option: {
            deep: true,
            immediate: true,
            handler(newVal) {
                this.option = newVal
                console.log(this.option);
                this.updateCharts()
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
