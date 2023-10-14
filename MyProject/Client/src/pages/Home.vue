<template>
  <div>
    <h1>Xin chào {{ user_name }} !!!</h1>
    <button class="btn btn-primary custom-btn" @click="logout">Đăng xuất</button>
    <!-- Nội dung và giao diện khác của trang home -->
  </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  name: "Home",
  data() {
    return {
      user_name: localStorage.getItem('username', this.user_name)
    };
  },
  methods: {
    logout() {
      Swal.fire({
        title: 'Xác nhận đăng xuất',
        text: 'Bạn có chắc chắn muốn đăng xuất?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Đăng xuất',
        cancelButtonText: 'Hủy',
      }).then((result) => {
        if (result.isConfirmed) {
          // Thực hiện quy trình đăng xuất ở đây
          // Sau khi đăng xuất thành công, chuyển hướng đến trang đăng nhập
          localStorage.removeItem('isLoggedIn'); 
          this.$router.push('/login');
        }
      });
    },
  },
};
</script>

<style>
.custom-btn {
  /* Các lớp Bootstrap */
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  /* Màu sắc và nền */
  color: #ffffff;
  background-color: #007bff;
  border-color: #007bff;
}
.custom-btn:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}
.custom-btn:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
}
</style>