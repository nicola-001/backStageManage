import {createRouter, createWebHistory} from 'vue-router'
import {constentRoute} from "@/router/routers";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: constentRoute
})
export default router
