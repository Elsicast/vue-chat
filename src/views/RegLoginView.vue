<template>
  <div>
    <div class="RegLoginBox">
      <div class="container">
        <div class="registercard slide-up" ref="register">
          <h2 class="register-title" @click="changeLogin">
            <span>没有账号,去</span>注册
          </h2>
          <form class="input-box">
            <input
              class="username"
              type="text"
              v-model="registerForm.username"
              placeholder="Username"
            />
            <input
              class="email"
              type="email"
              v-model="registerForm.email"
              placeholder="Email"
            />
            <input
              class="password"
              type="password"
              v-model="registerForm.password"
              placeholder="Password"
            />
            <input
              class="confirmedPassword"
              type="password"
              v-model="registerForm.confirmedPassword"
              placeholder="Confirm Password"
            />
          </form>
          <button type="button" @click="register">注册</button>
        </div>
        <div class="login-box" ref="login">
          <div class="center">
            <h2 class="login-title" @click="changeRegister">
              <span>已有账号，去</span>登录
            </h2>
            <div class="input-box">
              <input
                type="text"
                v-model="loginForm.username"
                placeholder="Username"
              />
              <input
                type="password"
                v-model="loginForm.password"
                placeholder="Password"
              />
            </div>
            <button @click="login">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createToaster } from "@meforma/vue-toaster";
import { registerRoute, loginRoute } from "../utils/APIRoutes";
import axios from "axios";

export default {
  created() {
    this.toaster = createToaster({});
    this.myOptions = {
      duration: 4000,
      position: "top",
    };
    if (localStorage.getItem("chat-user")) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      registerForm: {
        username: "admin",
        email: "123@11.com",
        password: "123456",
        confirmedPassword: "123456",
      },
      loginForm: {
        username: "admin",
        password: "123456",
      },
    };
  },
  methods: {
    changeLogin() {
      // if(this.$refs.register)
      if (this.$refs.register.classList.contains("slide-up")) {
        this.$refs.register.classList.remove("slide-up");
        this.$refs.login.classList.add("slide-up");
      }
    },
    changeRegister() {
      // if(this.$refs.register)
      if (this.$refs.login.classList.contains("slide-up")) {
        this.$refs.login.classList.remove("slide-up");
        this.$refs.register.classList.add("slide-up");
      }
    },
    handleRegisterValidation() {
      if (this.registerForm.password !== this.registerForm.confirmedPassword) {
        this.toaster.error("确认密码需要与密码相同！", this.myOptions);
        return false;
      } else if (this.registerForm.username.length < 3) {
        this.toaster.error("用户名长度要大于3！", this.myOptions);
        return false;
      } else if (this.registerForm.password.length < 6) {
        this.toaster.error("密码长度要大于8！", this.myOptions);
        return false;
      } else if (this.registerForm.email === "") {
        this.toaster.error("邮箱不能为空！", this.myOptions);
        return false;
      }
      return true;
    },
    handleLoginValidation() {
      if (this.loginForm.username === "") {
        this.toaster.error("请输入用户名！", this.myOptions);
        return false;
      } else if (this.loginForm.password === "") {
        this.toaster.error("请输入密码！", this.myOptions);
        return false;
      }
      return true;
    },
    async login() {
      if (this.handleLoginValidation()) {
        const username = this.loginForm.username;
        const password = this.loginForm.password;
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });
        // console.log(data);
        if (data.status === false) {
          this.toaster.error(data.msg, this.myOptions);
        }
        if (data.status === true) {
          // console.log(data);
          localStorage.setItem("chat-user", JSON.stringify(data.user));
          this.$router.push("/");
        }
      }
    },
    async register() {
      if (this.handleRegisterValidation()) {
        const username = this.registerForm.username;
        const email = this.registerForm.email;
        const password = this.registerForm.password;
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
        });
        console.log(data);
        if (data.status === false) {
          this.toaster.error(data.msg, this.myOptions);
        }
        if (data.status === true) {
          localStorage.setItem("chat-user", JSON.stringify(data.user));
          this.$router.push("/setAvatar");
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/login.scss";
.container::after {
  background-image: url(../assets/19.jpg);
}
</style>
