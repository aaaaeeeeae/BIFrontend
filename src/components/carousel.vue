<template>
    <div class="carousel-box">
        <el-carousel :interval="4000" type="card" height="250px">
            <el-carousel-item v-for="(item, index) in photos" :key="index">
                <img :src="item" alt="#" class="photo">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            photos: [
                require('@/assets/main.png'),
                require('@/assets/visual.png'),
                require('@/assets/sub.png'),
                require('@/assets/effciency.png')
            ]
        }
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
.photo {
    height: 250px;
}

.carousel-box ::v-deep {
    .el-carousel__item {
        display: flex;
        justify-content: center;
        align-items: center
    }  
}
</style>
