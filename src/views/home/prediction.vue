<template>
    <div class="" v-loading="loading" element-loading-text="正在拼命加载中...">
        <el-card class="result" v-if="result">
            <div v-html="result"></div>
        </el-card>
        <el-card class="form">
            <predictForm :nextStep="analyseData"></predictForm>
        </el-card>
    </div>
</template>

<script>
import { predictChart } from '../../request/chartRequest.js';
import predictForm from '../../components/predictForm.vue';
import { parseMarkdownForHtml } from '../../utils/markdownParser'
export default {
    name: '',
    data() {
        return {
            result: '',
            loading: false
        }
    },
    methods: {
        analyseData(form, rawData, weight) {
            const successAction = async () => {
                const data = {
                    ...form,
                    chartData: rawData,
                    weight: weight.toString()
                }
                try {
                    console.log(data);
                    this.loading = true
                    const res = await predictChart(data)
                    this.result = parseMarkdownForHtml(res)
                    this.loading = false
                } catch (error) {
                    this.loading = false
                    return Promise.reject(error)
                }
            }

            this.$confirmService.confirm(successAction, this.cancelAction).then(() => {
                this.$messageService.successMessage('提交成功')
            }).catch(err => {
                this.loading = false
                if (err !== undefined) {
                    this.$messageService.errorMessage(err)
                }
            })
        }
    },
    components: {
        predictForm,
    }
}
</script>

<style lang="less" scoped>
.result {
    margin-bottom: 20px;
}
</style>
