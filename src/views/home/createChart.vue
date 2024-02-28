<template>
    <div class="create-chart" v-loading="loading" element-loading-text="正在分析中...">
        <chartForm :nextStep="analyseData"></chartForm>
    </div>
</template>

<script>
import chartForm from '../../components/chartForm.vue'
import { genChart } from '../../request/chartRequest.js'
export default {
    name: '',
    data() {
        return {
            loading: false
        }
    },
    methods: {
        analyseData(form) {
            const successAction = async () => {
                const formData = new FormData();
                for (let key in form) {
                    formData.append(key, form[key]);
                }
                try {
                    this.loading = true
                    await genChart(formData)
                    this.loading = false
                } catch (error) {
                    return Promise.reject(error)
                }
            }

            this.$confirmService.confirm(successAction, this.cancelAction).then(() => {
                this.$messageService.successMessage('提交成功')
                this.$bus.$emit('clearnForm')
            }).catch(err => {
                this.loading = false
                if (err !== undefined) {
                    this.$messageService.errorMessage(err)
                }
            })
        },
        cancelAction() {
            this.$messageService.warnningMessage('已取消提交')
        }
    },
    components: {
        chartForm
    }
}
</script>

<style lang="less" scoped>
.create-chart {
    margin: 30px;
    width: 60vw;
}
</style>
