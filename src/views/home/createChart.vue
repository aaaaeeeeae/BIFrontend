<template>
    <div class="create-chart">
        <chartForm :nextStep="analyseData"></chartForm>
    </div>
</template>

<script>
import request from '../../request/http.js'
import chartForm from '../../components/chartForm.vue'
export default {
    name: '',
    data() {
        return {}
    },
    methods: {
        analyseData() {
            const successAction = async () => {
                const formData = new FormData();
                for (let key in this.form) {
                    formData.append(key, this.form[key]);
                }
                formData.append('file', this.$refs.upload.uploadFiles[0].raw);
                await request({
                    url: '/chart/gen',
                    method: 'post',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            }

            this.$confirmService.confirm(successAction, this.cancelAction).then(() => {
                this.$messageService.successMessage('提交成功')
            }).catch(err => {
                if (err !== undefined) {
                    this.$messageService.errorMessage(err)
                }
            })
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
