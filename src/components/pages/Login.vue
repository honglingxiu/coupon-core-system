<template>
  <div class="login">
    <div class="login-box">
      <h1 class="login-title">卡券雷锋管理平台</h1>
      <div class="login-form flex-center">
        <el-form :model="loginForm" ref="loginForm" label-width="70px" class='loginForm'>
          <el-form-item label="用户名：">
            <el-input size="medium" v-model="loginForm.userName" class='w280'></el-input>
          </el-form-item>
          <el-form-item label="密 码：">
            <el-input size="medium" type='passWord' v-model="loginForm.passWord" class='w280'></el-input>
          </el-form-item>
          <el-form-item label="验证码：">
            <el-input size="medium" v-model="loginForm.verificationCode" class='w280'
                      @keyup.enter.native='handleLogin'></el-input>
            <img :src="imgUrl" alt="验证码" class="pic" @click='handleGetVCode'>
          </el-form-item>
          <el-form-item class='flex-center mR20'>
            <el-button type="primary" size="medium" @click='handleLogin'>登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loginForm: {
          userName: '',
          passWord: '',
          verificationCode: '',
        },
        imgUrl: this.URL_PREFIX + this.URL.Login.getVerificationCode
      }
    },

    created() {
      this.handleGetVCode();
    },

    methods: {
      /*===获取验证码===*/
      handleGetVCode() {
        this.imgUrl = this.URL_PREFIX + this.URL.Login.getVerificationCode + '?' + Math.random();
      },

      /*===登录处理===*/
      handleLogin() {
        const that = this;
        if (process.env.NODE_ENV === 'development') {
          that.$router.push('/VipCard');
        } else {
          if (that.loginForm.userName === '' || that.loginForm.passWord === '' || that.loginForm.verificationCode === '') {
            that.$message.error('必填信息不能为空');
            return;
          } else {
            let obj = {...that.loginForm}
            that.$loading({fullscreen: true});
            $.ajax({
              url: that.URL_PREFIX + that.URL.Login.login,
              type: "POST",
              dataType: "json",
              xhrFields: {withCredentials: true},
              crossDomain: true,
              data: 'param=' + JSON.stringify(obj),
              success: (res) => {
                that.$loading().close();
                if (res.code == '0') {
                  let obj = {
                    userSessionTime: res.userSessionTime,
                    userName: res.userName
                  };
                  sessionStorage.setItem('Coupon_Login', JSON.stringify(obj));
                  that.$router.push('/VipCard');
                } else {
                  that.$message.error(res.msg);
                  that.loginForm.verificationCode = '';
                  that.handleGetVCode();
                }
              },
              error: (ex) => {
                that.$loading().close();
                console.log(ex);
                that.$message.error('服务器错误，错误信息：' + ex + '请稍后重试！');
              }
            });
          }
        }
      }
    }
  }
</script>

<style scoped>
  .login {
    width: 100%;
    height: 100%;
    background: #3b485b;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-box {
    color: #fff;
    width: 600px;
    height: 350px;
  }

  .login-title {
    text-align: center;
  }

  .pic {
    float: right;
    margin-top: 8px;
    margin-left: 10px;
    cursor: pointer;
  }

  .flex-center {
    display: flex;
    justify-content: center;
  }

  .w280 {
    width: 200px;
  }

  .w120 {
    width: 120px;
  }
</style>
