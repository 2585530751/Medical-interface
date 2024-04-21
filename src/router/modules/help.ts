export default {
    path: "/help",
    redirect: "/help/index",
    meta: {
      title: "帮助",
    },
    children: [
      {
        path: "/help/index",
        name: "helpList",
        component: () => import("@/views/help/index.vue"),
        meta: {
          title: "帮助"
        }
      }
    ]
  } as RouteConfigsTable;
  
