<template>
  <div class="login">
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
      <el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
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
      htis.loginForm.password = "";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>