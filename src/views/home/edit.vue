<template>
    <div class="edit">
        <goBack></goBack>
        <el-skeleton :rows="12" animated :loading="loading" />
        <chartForm></chartForm>
    </div>
</template>

<script>
import goBack from '../../components/goBack.vue';
import request from '../../request/http.js'
import handleTable from '../../utils/hadleTableData.js'
import chartForm from '../../components/chartForm.vue';
export default {
    name: '',
    data() {
        return {
            loading: true,
            oldData: {}
        }
    },
    methods: {

    },
    components: {
        goBack,
        chartForm
    },
    created() {
        this.loading = true
        request({
            url: `chart/get?id=${this.chartId}`,
            method: 'get',
            headers: {
                'Content-Type': 'x-www-form-urlencoded'
            }
        }).then(res => {
            this.loading = false
            this.oldData = JSON.parse(JSON.stringify(res.data))
            this.tableData = handleTable(this.data.chartData)
        }).catch(err => {
            console.log(err);
        })
    },
    computed: {
        chartId() {
            return this.$route.query.id
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
