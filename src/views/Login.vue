<template>
  <!-- <div class="login">
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-loginForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password" class="passwordInput">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" style="margin-top: 20px">
          提交
        </el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div> -->
  <div class="store-login">
    <div class="bg-login">
      <li v-for="bgimg in bgImages" :key="bgimg">
        <img :src="bgimg" />
      </li>
    </div>
    <div class="login-s">
      <!-- 登录表单 -->
      <el-form
        :model="loginForm"
        status-icon
        ref="loginForm"
        :rules="rules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-key"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Qs from "qs";
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
    };
    let checkUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
    };
    return {
      bgImages: [
        require("@/assets/images/bg1.jpg"),
        require("@/assets/images/bg2.jpg"),
      ],
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
      isLoginSuccess: false,
    };
  },

  methods: {
    ...mapMutations(["changeLogin"]),
    submitForm() {
      let _this = this;
      if (this.loginForm.username === "" || this.loginForm.password === "") {
        alert("账号或密码不能为空");
      } else {
        this.$axios({
          url: "users/login",
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          data: Qs.stringify(_this.loginForm),
        })
          .then((res) => {
            let data_ = res.data;
            // 将用户token保存到vuex中
            localStorage.setItem("access-user", JSON.stringify(data_.data));
            this.$store.commit("setUserId");
            _this.$router.push("/main");
            this.$message({
              message: "登陆成功",
              type: "success",
            });
          })
          .catch((error) => {
            // alert("账号或密码错误");
            console.log(error);
          });
      }
    },
    resetForm() {
      this.loginForm.username = "";
      this.loginForm.password = "";
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.store-login {
  background-color: white;
  height: 100%;
  position: relative;
}

.bg-login {
  /*background: url("../../public/img/3Dbg01.jpg") no-repeat;*/
  /*background-size: 100% 100%;*/
  position: relative;
  height: 100%;
  opacity: 0.8;
  z-index: 1;
}

.bg-login > li {
  list-style: none;
  /*display: none;*/
  position: relative;
  width: 100%;
  height: 100%;
  position: absolute;
}

.bg-login > li > img {
  width: 100%;
  height: 100%;
  opacity: 0.9;
  transition: ease 0.5s;
}
.login-s {
  position: absolute;
  width: 350px;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.3);
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  z-index: 2;
  box-shadow: 10px 10px 20px 0px rgba(0, 0, 0, 0.7);
  text-align: center;
  opacity: 0.8;
}

.login_form {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 30px;
}
</style>