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
import MarkDownIt from 'markdown-it'
export default {
    name: '',
    data() {
        return {

        }
    },
    methods: {

    },
    props: ['content'],
    computed: {
        compliedMarkdown() {
            const md = new MarkDownIt()
            return md.render(this.content)
        }
    }
}
</script>

<style lang="less" scoped>
.card{
    border-radius: 15px;
}
</style>
