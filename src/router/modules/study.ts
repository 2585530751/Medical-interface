export default {
    path: "/study",
    redirect: "/study/index",
    meta: {
      title: "检查详情",
    },
    children: [
      {
        path: "/study/index",
        name: "studyList",
        component: () => import("@/views/study/index.vue"),
        meta: {
          title: "检查列表"
        }
      }
    ]
  } as RouteConfigsTable;