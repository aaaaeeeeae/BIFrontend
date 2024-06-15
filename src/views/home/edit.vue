<template>
    <div class="edit" v-loading="loading">
        <goBack></goBack>
        <chartForm :oldData="oldData" :nextStep="handleAfter"></chartForm>
    </div>
</template>

<script>
import goBack from '../../components/goBack.vue';
import { getChartById, editChart } from '../../request/chartRequest.js'
import chartForm from '../../components/chartForm.vue';
export default {
    name: '',
    data() {
        return {
            loading: false,
            oldData: {}
        }
    },
    methods: {
        async getOldData() {
            try {
                this.loading = true
                const data = await getChartById(this.chartId)
                this.loading = false
                this.oldData = JSON.parse(JSON.stringify(data))
            } catch (error) {
                this.loading = false
                console.log(error);
            }
        },
        handleAfter(data) {
            const successAction = async () => {
                try {
                    this.loading = true
                    await editChart(JSON.stringify(data))
                    this.loading = false
                } catch (error) {
                    return Promise.reject(error)
                }
            }
            const cancelAction = () => {
                this.$messageService.warnningMessage('已取消更改')
            }
            this.$confirmService.confirm(successAction, cancelAction).then(() => {
                this.$messageService.successMessage('更改成功')
                this.$router.replace('myCharts')
            }).catch(err => {
                this.loading = false
                if (err !== undefined) {
                    this.$messageService.errorMessage(err)
                }
            })
        }
    },
    components: {
        goBack,
        chartForm
    },
    created() {
        this.getOldData();
    },
    computed: {
        chartId() {
            return this.$route.query.chartId
        }
    }
}
</script>

<style lang="less" scoped>
.edit {
    margin: 10px;
    position: relative;
}
</style>
