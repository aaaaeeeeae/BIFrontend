<template>
    <div>
        <el-container class="warrap">
            <el-header style="width:100%">
                <topBar></topBar>
            </el-header>
            <div class="carousel">
                <carousel></carousel>
            </div>
            <el-container>
                <el-main class="main">
                    <mdContainer :content="content" class="child"></mdContainer>
                    <feedback class="child"></feedback>
                </el-main>
                <el-aside width="200px">
                    <div class="catalog" v-show="isShowCatalog">
                        <mdCatalog :content="content"></mdCatalog>
                    </div>
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
import carousel from '../components/carousel.vue'
export default {
    name: '',
    data() {
        return {
            content: null,
            filePath: '../../md/智能DA平台.md',
            isShowCatalog: false,
            scrollThreshold: 250,
            scrollThresholdEnd: 3750
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
        },
        handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > this.scrollThreshold && scrollTop < this.scrollThresholdEnd) {
                this.isShowCatalog = true;
            } else {
                this.isShowCatalog = false;
            }
        }
    },
    async created() {
        await this.getMdFile()
    },
    components: {
        topBar,
        mdContainer,
        feedback,
        mdCatalog,
        carousel
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },

    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
}
</script>

<style lang="less" scoped>
.warrap {
    display: flex;
    justify-content: center;
    align-items: center;
}

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

.carousel {
    width: 90%;
    margin-top: 30px;
}


</style>
