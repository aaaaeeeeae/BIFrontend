<template>
    <div class="">
        <el-card class="card">
            <p class="title">反馈与建议</p>
            <p class="sub-title">系统评分</p>
            <el-rate v-model="value" show-text>
            </el-rate>
            <el-divider></el-divider>
            <p class="sub-title">功能反馈</p>
            <p>如有问题/建议请填写在下面说明</p>
            <div class="recommend">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入内容" v-model="recommend"
                    class="recommend-text">
                </el-input>
                <div class="but-box">
                    <el-button icon="el-icon-s-promotion" size="medium">取消</el-button>
                    <el-button type="primary" icon="el-icon-s-promotion" size="medium">提交</el-button>
                </div>

            </div>

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
            recommend: '',
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
    font-size: larger;
    font-weight: bolder;
}

.sub-title {
    font-size: 17px;
    font-weight: bolder;
}

.recommend {

    .recommend-text {
        width: 70%;
    }

    .but-box {
        margin-top: 15px;
        width: 60%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
}
</style>
