export default {
    path: "/patientManagment",
    redirect: "/patientManagment/index",
    meta: {
      title: "患者管理",
    },
    children: [
      {
        path: "/patientManagment/index",
        name: "patientManagmentList",
        component: () => import("@/views/patientManagment/index.vue"),
        meta: {
          title: "患者管理"
        }
      }
    ]
  } as RouteConfigsTable;
  