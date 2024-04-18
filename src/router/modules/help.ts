export default {
    path: "/help",
    redirect: "/help/index",
    meta: {
      title: "患者详情",
    },
    children: [
      {
        path: "/help/index",
        name: "helpList",
        component: () => import("@/views/help/index.vue"),
        meta: {
          title: "患者列表"
        }
      }
    ]
  } as RouteConfigsTable;