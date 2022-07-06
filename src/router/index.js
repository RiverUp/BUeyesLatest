import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
// import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/:categoryId(\\d+)",
    name: "newsSort",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/News/:id",
    name: "news",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ContentView.vue"),
  },
  { path: "/Login", name: "login", component: LoginView },
  /*   {
    path: "/Register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  }, */
  {
    path: "/Ocr",
    name: "ocr",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/OcrView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
/* router.beforeEach(async (to) => {
  if (
    // 检查用户是否已登录
    store.state.token === "" &&
    // ❗️ 避免无限重定向
    to.name === "home"
  ) {
    // 将用户重定向到登录页面
    return { name: "login" };
  }
}); */

export default router;
