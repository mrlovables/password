import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/:group?",
        name: "home",
        component: () => import("@/pages/home/index.vue"), // 注意这里要带上 文件后缀.vue
        alias: "/home",
    },
    {
        path: "/add",
        name: "add",
        component: () => import("@/pages/home/add.vue"),
    },
    {
        path: "/setting",
        name: "setting",
        component: () => import("@/pages/home/setting.vue"),
    },
    {
        path: "/search",
        name: "search",
        component: () => import("@/pages/home/search.vue"),
    },
    // { path: '/home', redirect: '/' }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
