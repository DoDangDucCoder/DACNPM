<style src="./Css/Login.css"></style>

<template>
  <div id="app">
    <div id="login-form">
      <div class="login-form-header">
        <span class="title-header">Đăng nhập</span>
        <span style="position: absolute; top: 19px; right: 19px">X</span>
      </div>
      <div id="login-body">
        <div class="label-input">Tên đăng nhập</div>
        <input type="text" v-model="user_name" />
        <div style="
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
            width: 462px;
          ">
          <span class="label-input">Mật khẩu</span><span><a href="google.com" id="forgot-password">Quên mật
              khẩu?</a></span>
        </div>
        <input type="password" v-model="password" />
        <div class="login-button" @click="login()" :style="this.user_name && this.password
          ? {}
          : { color: '#E5E6EC', background: '#BDBDBD' }
          ">
          Đăng nhập
        </div>
        <p class="login-with">hoặc đăng nhập bằng</p>
        <div style="
            display: flex;
            justify-content: space-around;
            padding-top: 10px;
          ">
          <span class="otherway"><i class="fa fa-brands fa-facebook"
              style="font-size: 16px; padding-right: 5px"></i>Facebook</span>
          <span class="otherway"><i class="fa fa-brands fa-google"
              style="font-size: 16px; padding-right: 5px"></i>Google</span>
        </div>
        <p class="footer">
          Bạn chưa có tài khoản?
          <router-link to="/register">Đăng ký ngay!</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { Post } from "../utils/api.js";
export default {
  name: "App",
  data() {
    return {
      user_name: "",
      password: "",
    };
  },
  methods: {
    async login() {
      if (this.user_name && this.password) {
        let response = await Post("login", {
          user_name: this.user_name,
          password: this.password,
        });
        if (response && response.success) {
          // Sau khi xác thực đăng nhập thành công
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', this.user_name);
          this.$router.push("/");
        } else {
          Swal.fire({
            title: 'Lỗi',
            text: 'Sai tài khoản hoặc mật khẩu!',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    },
  },
};
</script>
