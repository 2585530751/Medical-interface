import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { formatTwoStageRoutes,formatFlatteningRoutes } from './utils'
import { buildHierarchyTree } from "@/utils/tree";
import remainingRouter from './modules/remaining'

const modules: Record<string, any> = import.meta.glob(
  ["./modules/**/*.ts", "!./modules/**/remaining.ts"],
  {
    eager: true
  }
);

/** 原始静态路由（未做任何处理） */
const routes:Array<RouteRecordRaw> = [];

Object.keys(modules).forEach(key => {
  routes.push(modules[key].default);
  console.log(routes)
  console.log(routes.flat(Infinity))
});

/** 导出处理后的静态路由（三级及以上的路由全部拍成二级） */
export const constantRoutes: Array<RouteRecordRaw> = formatTwoStageRoutes(
  formatFlatteningRoutes(buildHierarchyTree(routes.flat(Infinity)))
);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:constantRoutes.concat(...(remainingRouter as any)),
})

export default router
