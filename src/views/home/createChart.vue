<template>
    <div class="create-chart" v-loading="loading" element-loading-text="正在分析中...">
        <chartForm :nextStep="analyseData"></chartForm>
    </div>
</template>

<script>
import chartForm from '../../components/chartForm.vue'
// import { genChartWithRetry } from '../../request/chartRequest.js'
import { getLoginUserId } from '../../request/userRequest.js'
export default {
    name: '',
    data() {
        return {
            loading: false,
            userId: null
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
                    // await genChartWithRetry(this.userId, formData)
                    setTimeout(() => {
                        this.loading = false
                        this.$messageService.successMessage('分析成功')
                    }, 2000)
                } catch (error) {
                    this.loading = false;
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
    },
    async created() {
        const res = await getLoginUserId()
        this.userId = res.id
    }
}
</script>

<style lang="less" scoped>
.create-chart {
    margin: 30px;
    width: 60vw;
}
</style>
