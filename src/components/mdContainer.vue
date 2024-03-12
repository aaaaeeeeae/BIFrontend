<template>
    <div class="">
        <el-card class="card">
            <div class="content" v-html="compliedMarkdown" v-if="content">
            </div>
            <div v-else>
                <el-skeleton :rows="6" animated />
            </div>
        </el-card>
    </div>
</template>

<script>
import { parseMarkdownForHtml } from '../utils/markdownParser'
export default {
    name: '',
    data() {
        return {
            toc: []
        }
    },
    props: ['content'],
    created() {
        this.$bus.$on('getCatalog', this.getCatalog)
    },
    beforeDestroy(){
        this.$bus.$off('getCatalog')
    },
    computed: {
        compliedMarkdown() {
            const html = parseMarkdownForHtml(this.content)
            return html
        }
    }
}
</script>

<style lang="less" scoped>
.card {
    border-radius: 15px;
}
</style>
