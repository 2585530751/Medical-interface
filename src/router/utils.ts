import type { RouteRecordRaw, RouteComponent } from 'vue-router'
import { buildHierarchyTree } from '@/utils/tree'
import { isString,cloneDeep, intersection, storageSession,isIncludeAllChildren } from '@pureadmin/utils'
import { sessionKey, type DataInfo } from '@/utils/auth'
import { router } from "./index";
function formatTwoStageRoutes(routesList: RouteRecordRaw[]) {
  if (routesList.length === 0) return routesList
  const newRoutesList: RouteRecordRaw[] = []
  routesList.forEach((v: RouteRecordRaw) => {
    if (v.path === '/') {
      newRoutesList.push({
        component: v.component,
        name: v.name,
        path: v.path,
        redirect: v.redirect,
        meta: v.meta,
        children: []
      })
    } else {
      newRoutesList[0]?.children?.push({ ...v })
    }
  })
  return newRoutesList
}

/**
 * 将多级嵌套路由处理成一维数组
 * @param routesList 传入路由
 * @returns 返回处理后的一维路由
 */
function formatFlatteningRoutes(routesList: RouteRecordRaw[]) {
  if (routesList.length === 0) return routesList
  let hierarchyList = buildHierarchyTree(routesList)
  for (let i = 0; i < hierarchyList.length; i++) {
    if (hierarchyList[i].children) {
      hierarchyList = hierarchyList
        .slice(0, i + 1)
        .concat(hierarchyList[i].children, hierarchyList.slice(i + 1))
    }
  }
  return hierarchyList
}

/** 过滤meta中showLink为false的菜单 */
function filterTree(data: RouteComponent[]) {
  const newTree = cloneDeep(data).filter(
    (v: { meta: { showLink: boolean } }) => v.meta?.showLink !== false
  )
  newTree.forEach(
    (v: { children: RouteComponent[] }) => v.children && (v.children = filterTree(v.children))
  )
  return newTree
}

export { formatTwoStageRoutes, formatFlatteningRoutes, filterTree }
