<template>
  <div class="login">
    <div class="bck-photo"></div>
    <div class="card">
      <el-card shadow="always">
        <div class="card-content">
          <el-tabs v-model="tableName">
            <el-tab-pane label="登录" name="login" type="card">
              <div class="table-content">
                <div class="form">
                  <el-form label-position="right" label-width="80px" :model="formLabelAlign">
                    <el-form-item label="账号">
                      <el-input v-model="loginForm.userAccount"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                      <el-input v-model="loginForm.userPassword"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <el-button type="primary" :loading="false" class="btn-width">登录</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="注册" name="register">
              <div class="register">
                <div class="table-content">
                  <div class="form">
                    <el-form label-position="right" label-width="80px" :model="formLabelAlign">
                      <el-form-item label="账号">
                        <el-input v-model="registerForm.userAccount"></el-input>
                      </el-form-item>
                      <el-form-item label="密码">
                        <el-input v-model="registerForm.userPassword"></el-input>
                      </el-form-item>
                      <el-form-item label="确认密码">
                        <el-input v-model="registerForm.checkPassword"></el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                  <el-button type="primary" :loading="false" class="btn-width">注册</el-button>
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
export default {
  name: 'login',
  data() {
    return {
      tableName: 'login',
      loginForm: {
        userAccount: '',
        userPassword: '',
      },
      registerForm: {
        userAccount: '',
        userPassword: '',
        checkPassword: ''
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.login {
  position: relative;
  height: 100vh;
  width: 100vw;

  .bck-photo {
    height: 100%;
    width: 100%;
    background-image: url('../photos/shu.png');
    filter: blur(1.5px);
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
        margin-left: 10px;
        width: 300px !important;
      }
    }
  }
}
</style>