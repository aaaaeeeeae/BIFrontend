<template>
    <div class="top-bar">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <div class="bar-content">
                <el-row :gutter="20">
                    <el-col :span="8" :offset="4">
                        <div class="middle-content">
                            <el-menu-item index="1">处理中心</el-menu-item>
                            <el-submenu index="2">
                                <template slot="title">我的工作台</template>
                                <el-menu-item index="2-1">选项1</el-menu-item>
                                <el-menu-item index="2-2">选项2</el-menu-item>
                                <el-menu-item index="2-3">选项3</el-menu-item>
                                <el-submenu index="2-4">
                                    <template slot="title">选项4</template>
                                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                                </el-submenu>
                            </el-submenu>
                            <el-menu-item index="3">消息中心</el-menu-item>
                        </div>
                    </el-col>
                    <el-col :span="2" :offset="9">
                        <div class="profile">
                            <el-submenu index="4" class="hide-arrow">
                                <template slot="title">
                                    <el-avatar size="medium" :src='userUrl'></el-avatar>
                                </template>
                                <el-menu-item index="quit">
                                    <i class="el-icon-switch-button"></i>
                                    <span>退出登录</span>
                                </el-menu-item>
                            </el-submenu>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-menu>
    </div>
</template>


<script>
import { userLogout } from '../request/userRequest'
export default {
    data() {
        return {
            activeIndex: '1',
            userUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        };
    },
    methods: {
        async handleSelect(key) {
            if (key === 'quit') {
                try {
                    await userLogout()
                    this.$messageService.successMessage('退出登录成功');
                    this.$router.push('/login');
                } catch (error) {
                    console.log(error, 'error!');
                }
            }
        }
    }
}
</script>

<style scoped lang="less">
.bar-content {
    .middle-content ::v-deep {
        display: flex;
        padding: 0;

        .is-active {
            background-color: #409EFF;
            color: white;
        }
    }

    .profile {
        display: block;
        width: 75px;

        .hide-arrow ::v-deep i {
            visibility: hidden;
        }
    }


}
</style>