<template>
    <div class="layout">
        <el-row :gutter="20" class="row">
            <el-col :span="6" :offset="2" class="title">
                <slot name="title"></slot>
            </el-col>
            <el-col :span="12" :offset="1" class="content">
                <slot name="content"></slot>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
.layout {
    .row {
        margin: 30px 0px;
        line-height: 20px;

        .title {
            font-size: 13px;
            font-weight: 600;
        }

        .content {
            font-size: 13px;
        }

        .el-card__body,
        .el-row,
        .el-col {
            word-wrap: break-word;
            white-space: normal;
        }
    }

}
</style>
