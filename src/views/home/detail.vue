<template>
    <div class="">
        <el-page-header @back="goBack">
        </el-page-header>
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

    </div>
</template>

<script>
import request from '../../request/http.js'
import handleTable from '../../utils/hadleTableData.js'
import { mappingReq, mappingRes } from '../../utils/mapping.js'
import layout from '../../components/layout.vue'
export default {
    name: '',
    data() {
        return {
            loading: true,
            data: {},
            tableData: [],
            queryData: {},
            resultData: {}
        }
    },
    methods: {
        goBack() {
            this.$router.back();
        }

    },
    components: {
        layout
    },
    created() {
        request({
            url: `chart/get?id=${this.$route.query.id}`,
            method: 'get',
            headers: {
                'Content-Type': 'x-www-form-urlencoded'
            }
        }).then(res => {
            this.loading = false
            this.data = JSON.parse(JSON.stringify(res.data))
            this.tableData = handleTable(this.data.chartData)
            this.queryData = mappingReq(this.data)
            this.resultData = mappingRes(this.data)
        }).catch(err => {
            console.log(err);
        })
    }
}
</script>

<style lang="less" scoped>
.content {
    margin-top: 20px;
}

.res-card {
    margin-bottom: 30px;
}
</style>
