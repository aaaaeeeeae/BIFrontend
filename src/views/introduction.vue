<template>
    <div class="">
        <el-container>
            <el-header>
                <topBar></topBar>
            </el-header>
            <el-container>
                <el-main class="main">
                    <mdContainer :content="content" class="child"></mdContainer>
                    <feedback class="child"></feedback>
                </el-main>
                <el-aside width="200px">
                    <mdCatalog :content="content"></mdCatalog>
                </el-aside>
            </el-container>

        </el-container>
    </div>
</template>

<script>
import topBar from '../components/topBar.vue';
import mdContainer from '../components/mdContainer.vue'
import feedback from '../components/feedback.vue'
import mdCatalog from '../components/mdCatalog.vue'
export default {
    name: '',
    data() {
        return {
            content: null,
            filePath: '../../md/智能DA平台.md'
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
    async created() {
        await this.getMdFile()
    },
    components: {
        topBar,
        mdContainer,
        feedback,
        mdCatalog
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
