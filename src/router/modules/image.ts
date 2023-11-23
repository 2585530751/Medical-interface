export default {
    path: "/image",
    redirect: "/image/index",
    meta: {
      title: "医学影像",
    },
    children: [
      {
        path: "/image/index",
        name: "影像列表",
        component: () => import("@/views/image/index.vue"),
        meta: {
          title: "影像列表",
          roles: ['docter']
        }
      }
    ]
  } as RouteConfigsTable;