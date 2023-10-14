<style src="./Css/Register.css"></style>

<template>
  <div id="app">
    <div id="register-form">

      <div class="register-form-header">
        <span class="title-register-header">Đăng ký tài khoản mới miễn phí</span>
      </div>

      <div id="register-form-body">

        <div class="label-input">
          <strong>Họ và tên</strong>
          <input v-model="fullName" type="text" placeholder="Nhập họ và tên của bạn">
        </div>

        <div class="label-input">
          <strong>Tên đăng nhập</strong>
          <input v-model="user_name" type="text" placeholder="Nhập tên đăng nhập của bạn">
        </div>

        <div class="label-input">
          <strong>Mật khẩu</strong>
          <input v-model="password" type="password" placeholder="">
        </div>

        <div class="label-input">
          <strong>Nhập lại mật khẩu</strong>
          <input v-model="confirmPassword" type="password" placeholder="">
        </div>

        <div class="label-input">
          <strong>Email</strong>
          <input v-model="email" type="text" placeholder="Nhập email của bạn">
        </div>

        <div class="checkbox">
          <input type="checkbox" style="width: 18px; height: 18px;">
          <label>Tôi đồng ý với các <router-link to="/register">điều kiện và điều khoản</router-link></label>
        </div>

        <div>
          <div class="register-button" @click="register()" :style="this.fullName && this.user_name && this.password && this.confirmPassword && this.email
            ? {}
            : { color: '#E5E6EC', background: '#BDBDBD' }
            ">
            Đăng ký
          </div>

          <p class="login-with">Hoặc</p>

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
            <router-link to="/login">Đăng nhập!</router-link>
          </p>

        </div>
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
      fullName: "",
      user_name: "",
      password: "",
      confirmPassword: "",
      email: "",
    };
  },
  methods: {
    async register() {
      if (
        this.fullName &&
        this.user_name &&
        this.password &&
        this.confirmPassword &&
        this.email
      ) {
        if (this.password !== this.confirmPassword) {
          // Hiển thị thông báo lỗi khi hai mật khẩu không khớp
          Swal.fire({
            title: 'Lỗi',
            text: 'Hai mật khẩu không khớp!',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          return; // Dừng quá trình tạo tài khoản
        }

        let response = await Post("register", {
          fullName: this.fullName,
          user_name: this.user_name,
          password: this.password,
          confirmPassword: this.confirmPassword,
          email: this.email,
        });

        if (response && response.success) {
          // Hiển thị thông báo thành công khi tài khoản đã được tạo thành công
          Swal.fire({
            title: 'Thành công',
            text: 'Tài khoản đã được tạo thành công!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          
          // Chuyển hướng sang trang đăng nhập
          this.$router.push('/login');
        }
      }
    }
  },
};
</script>

