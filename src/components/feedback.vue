<template>
    <div class="">
        <el-card class="card">
            <p class="title">反馈与建议</p>
            <el-rate v-model="value" show-text>
            </el-rate>
            <p>真诚感谢您的反馈~</p>
        </el-card>

    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            value: null,
            iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3']
        }
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>
.card {
    border-radius: 15px;
}

.title {
    font-size: large;
    font-weight: bolder;
    padding-bottom: 10px;
}
</style>
