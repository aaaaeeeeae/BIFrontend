<template>
  <div class="login" v-loading="loading" element-loading-text="正在拼命加载中...">
    <div class="bck-photo"></div>
    <div class="card">
      <el-card shadow="always">
        <div class="card-content">
          <el-tabs v-model="tableName">
            <el-tab-pane label="登录" name="login" type="card">
              <div class="table-content">
                <div class="form">
                  <el-form label-position="right" label-width="80px" :model="loginForm" status-icon :rules="loginRules"
                    ref="loginForm">
                    <el-form-item label="账号" prop="userAccount">
                      <el-input v-model="loginForm.userAccount" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="userPassword">
                      <el-input type="password" v-model="loginForm.userPassword" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <el-button type="primary" class="btn-width" @click="submitForm('loginForm')">登录</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="注册" name="register">
              <div class="register">
                <div class="table-content">
                  <div class="form">
                    <el-form label-position="right" label-width="70px" :model="registerForm" status-icon
                      ref="registerForm" :rules="registerRules">
                      <el-form-item label="账号" prop="userAccount">
                        <el-input v-model="registerForm.userAccount"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" prop="userPassword">
                        <el-input v-model="registerForm.userPassword" type="password"></el-input>
                      </el-form-item>
                      <el-form-item label="确认密码" prop="checkPassword">
                        <el-input v-model="registerForm.checkPassword" type="password"></el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                  <el-button type="primary" :loading="false" class="btn-width"
                    @click="submitForm('registerForm')">注册</el-button>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

      </el-card>

    </div>

  </div>
</template>

<script>
import { userLogin, userRegister } from '../request/userRequest.js';
export default {
  name: 'login',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码~'));
      } else if (value.length < 8) {
        callback(new Error('密码不能少于8位~'));
      } else {
        callback();
      }
    }
    var isNull = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('账号不能为空~'));
      } else {
        callback();
      }
    }
    var validatePassAgain = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码~'));
      } else if (value.length < 8) {
        callback(new Error('密码不能少于8位~'));
      } else if (value !== this.registerForm.userPassword) {
        callback(new Error('两次输入的密码不一致~'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      tableName: 'login',
      loginForm: {
        userAccount: '',
        userPassword: '',
      },
      registerForm: {
        userAccount: '',
        userPassword: '',
        checkPassword: ''
      },
      loginRules: {
        userAccount: [{
          validator: isNull,
          trigger: 'blur'
        }],
        userPassword: [{
          validator: validatePass,
          trigger: 'blur'
        }]
      },
      registerRules: {
        userAccount: [{
          validator: isNull,
          trigger: 'blur'
        }],
        userPassword: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        checkPassword: [{
          validator: validatePassAgain,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true
          if (formName === 'loginForm') {
            try {
              await userLogin(JSON.stringify(this.loginForm))
              this.loading = false
              this.$messageService.successMessage('登录成功');
              this.$router.push('/introduction');
            } catch (error) {
              this.loading = false
              this.loginForm.userPassword = ""
              console.log(error);
            }
          } else if (formName === 'registerForm') {
            try {
              await userRegister(JSON.stringify(this.registerForm))
              this.loading = false
              this.$messageService.successMessage('注册成功');
              this.tableName = 'login'
              this.resetRegisterForm()
            } catch (error) {
              this.loading = false
              console.log(error);
            }
          }
        } else {
          this.$messageService.errorMessage('提交失败，请检查你的输入！')
          return false;
        }
      });
    },
    resetRegisterForm() {
      this.$refs.registerForm.resetFields();
    }
  }
}
</script>

<style scoped lang="less">
.login {
  position: relative;
  height: 100vh;
  width: 100vw;

  .form ::v-deep {
    .el-form-item__label {
      text-align: center;
    }
  }



  .bck-photo {
    height: 100%;
    width: 100%;
    background-image: url('../photos/fengjin.png');
    background-repeat: no-repeat;
    background-size: cover;
    // filter: blur(1.5px);
    display: flex;
  }

  .card ::v-deep {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .el-tabs__header {
      .is-top {
        font-size: large;
      }

      .is-active {
        font-weight: 600;
        color: black;
      }
    }

    .table-content {
      width: 350px;
      display: flex;
      position: relative;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 15px 15px 15px 0px;

      .form {
        margin: 10px 0px;
        width: 100%;
      }

      .btn-width {
        margin-left: 15px;
        width: 300px !important;
      }
    }
  }
}
</style>