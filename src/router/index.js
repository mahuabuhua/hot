import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    component: () => import("../views/index.vue"),
    name: "index",
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "home",
        component: HomeView,
      },
      {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) fo r this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
      },
    ],
  },
  {
    path: "/mobile",
    name: "mobile",
    component: () => import("../views/mobile.vue"),
    redirect: "/mobileindex",
    children: [{
        path: "/mobileindex",
        name: "mobileindex",
        component: () => import("../views/mobileindex.vue")
    }]
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
