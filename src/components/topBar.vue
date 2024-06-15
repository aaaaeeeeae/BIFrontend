<template>
    <div class="top-bar">
        <el-menu :default-active="defaultActive" class="el-menu-demo" mode="horizontal" @select="handleSelect"
            :router="true">
            <div class="bar-content">
                <el-row :gutter="20">
                    <el-col :span="3" :offset="1">
                        <div class="logo">
                            <img src="../assets/weblogo.png" alt="" class="weblogo">
                            <img src="../assets/wenzi.png" alt="" class="wenzi">
                        </div>
                    </el-col>
                    <el-col :span="6" :offset="3">
                        <div class="middle-content">
                            <el-menu-item index="/introduction">产品概览</el-menu-item>
                            <el-menu-item index="/home">处理中心</el-menu-item>
                        </div>
                    </el-col>
                    <el-col :span="2" :offset="9">
                        <div class="profile">
                            <el-submenu index="4" class="hide-arrow">
                                <template slot="title">
                                    <el-avatar size="medium" :src='userUrl'></el-avatar>
                                </template>
                                <el-menu-item index="quit">
                                    <i class="el-icon-s-custom"></i>
                                    <span>个人主页</span>
                                </el-menu-item>
                                <el-menu-item index="quit">
                                    <i class="el-icon-bell"></i>
                                    <span>消息中心</span>
                                </el-menu-item>
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
            userUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        };
    },
    methods: {
        async handleSelect(key) {
            if (key === 'quit') {
                try {
                    await userLogout()
                    this.$messageService.successMessage('退出登录成功');
                    this.$router.replace('/login');
                } catch (error) {
                    console.log(error, 'error!');
                }
            }
        }
    },
    computed: {
        defaultActive() {
            return `/${this.$route.path.split('/')[1]}`;
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

    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 54px;

        .weblogo {
            display: block;
            width: 40px;
            height: 40px;
        }

        .wenzi {
            display: block;
            height: 30px;
            margin-left: 5px;
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