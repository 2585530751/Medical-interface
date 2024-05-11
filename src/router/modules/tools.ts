export default {
    path: "/tools",
    redirect: "/tools/index",
    meta: {
      title: "工具箱",
    },
    children: [
      {
        path: "/tools/index",
        name: "tools",
        component: () => import("@/views/tools/index.vue"),
        meta: {
          title: "工具箱"
        }
      },
      {
        path: "/tools/tools",
        name: "tools1",
        component: () => import("@/views/tools/tools.vue"),
        meta: {
          title: "具体工具"
        }
      },
      {
        path: "/tools/dataEditing",
        name: "tools2",
        component: () => import("@/views/tools/dataEditing.vue"),
        meta: {
          title: "数据编辑"
        }
      }
    ]
  } as RouteConfigsTable;
  