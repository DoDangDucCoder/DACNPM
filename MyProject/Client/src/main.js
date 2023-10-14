import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import Home from "./pages/Home.vue";
let isLogin = false;
const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/", name: "Home", component: Home, meta: { requiresAuth: true }},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
createApp(App).use(router).mount("#app");

// Đăng ký lifecycle hook
router.beforeEach((to, from, next) => {
    const isLoggedIn = checkLoginStatus(); // Gọi hàm kiểm tra trạng thái đăng nhập
    
    // Kiểm tra xem route hiện tại cần xác thực đăng nhập hay không
    if (to.meta.requiresAuth && !isLoggedIn) {
      // Người dùng chưa đăng nhập, chuyển hướng về màn hình đăng nhập
      next('/login');
    } else {
      // Người dùng đã đăng nhập hoặc route không yêu cầu xác thực đăng nhập, cho phép truy cập
      next();
    }
  });
  
  // Hàm kiểm tra trạng thái đăng nhập
  function checkLoginStatus() {
    // Thực hiện logic kiểm tra đăng nhập, ví dụ:
    const isLoggedIn = localStorage.getItem('isLoggedIn'); // Giả sử trạng thái đăng nhập được lưu trữ trong localStorage
    
    return isLoggedIn === 'true'; // Trả về true nếu đã đăng nhập, ngược lại trả về false
  }
  export default router;

