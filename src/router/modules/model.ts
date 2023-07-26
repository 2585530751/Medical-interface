export default {
    path: "/model",
    redirect: "/model/index",
    meta: {
        title: "算法模型",
    },
    children: [
        {
            path: "/model/index",
            name: "模型卡片",
            component: () => import("@/views/model/index.vue"),
            meta: {
                title: "模型卡片"
            }
        },
        {
            path: "/model/modelDescription",
            name: "modeldescription",
            component: () => import('@/layouts/components/model/modelDescription.vue'),
            meta: {
                title: "modeldescription"
            }

        }
    ]
} as RouteConfigsTable;