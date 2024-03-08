<template>
    <div class="">
        <el-container>
            <el-header>
                <topBar></topBar>
            </el-header>
            <el-main class="main">
                <mdContainer :content="content" class="child"></mdContainer>
                <feedback class="child"></feedback>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import topBar from '../components/topBar.vue';
import mdContainer from '../components/mdContainer.vue'
import feedback from '../components/feedback.vue'
export default {
    name: '',
    data() {
        return {
            content: null,
            filePath: '../../md/智能分析业务流程.md'
        }
    },
    methods: {
        getMdFile() {
            fetch(this.filePath)
                .then(res => res.text())
                .then(txt => {
                    this.content = txt
                }).catch(err => {
                    console.log(err);
                })
        }
    },
    created() {
        this.getMdFile()
    },
    components: {
        topBar,
        mdContainer,
        feedback
    }
}
</script>

<style lang="less" scoped>
.main {
    padding: 40px 80px;
    display: flex;
    flex-direction: column;

    .child {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }


}
</style>
