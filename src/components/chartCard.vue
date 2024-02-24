<template>
    <div class="warrap" @click.stop="showDetail">
        <el-card class="box-card">
            <div class="more-icon" @click.stop="showMore">
                <i class="el-icon-more"></i>
            </div>
            <div v-if="drawerShow" class="overlay" @click.stop="handleOverlayClick"></div>
            <el-drawer :visible.sync="drawerShow" :with-header="false" direction="btt" size="40%" :modal="false"
                class="card-float">
                <div class="float-content">
                    <el-button type="primary" icon="el-icon-edit" circle @click.stop="editChart"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click.stop="deleteChart"></el-button>
                </div>
            </el-drawer>
            <div class="chart">图表.....</div>
            <div class="chart-name">{{ data.name }}</div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            drawerShow: false
        }
    },
    methods: {
        showMore() {
            this.drawerShow = true;
        },
        showDetail() {
            this.$router.push({
                path: '/home/detail',
                query: {
                    id: this.data.id
                }
            })
        },
        editChart() {
            this.drawerShow = false
        },
        deleteChart() {
            this.drawerShow = false
        },
        handleOverlayClick() {
            this.drawerShow = false
        }
    },
    props: ['data']
}
</script>

<style lang="less" scoped>
.warrap {
    margin: 10px;

    .box-card {
        position: relative;
        cursor: pointer;

        .more-icon {
            position: absolute;
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            right: 10px;
            top: 10px;
            cursor: pointer;
            border-radius: 30px;

            &:hover {
                background-color: #f4f4f5;
            }
        }

        .card-float {
            position: absolute;
            z-index: 11;

            .float-content {
                display: flex;
                height: 100%;
                justify-content: space-around;
                align-items: center;
            }
        }

        .chart-name {
            font-size: 11px;
            font-weight: 600;
            text-align: center;
        }

        .chart {}

        &:hover {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.219);
        }

        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10;
        }
    }
}
</style>
