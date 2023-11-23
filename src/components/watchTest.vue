<script lang="ts">
import { useUserStoreHook } from "@/store/modules/user";
import { onUnmounted, watch } from "vue";

export default {
//   setup() {
//     const userStore = useUserStoreHook();

//     // 监听 roles 的变化
//     watch(() => userStore.roles, (newRoles) => {
//       console.log("roles 发生变化：", newRoles);
//       // 在这里可以执行对应的逻辑
//     });
//     function test(){
//         userStore.roles=['admin']
//     }
//     return {
//       userStore,test
//     }
//   }
setup() {
    const userStore = useUserStoreHook();

    const unsubscribe = userStore.$subscribe((mutation,state) => {
        console.log(mutation, state)
    });

    // 在组件卸载时取消订阅，防止内存泄漏
    onUnmounted(() => {
      unsubscribe();
    });

    return {
      userStore
    };
  }
}
</script>

<template>
  <button @click="">sessionData</button>
</template>

<style lang="scss" scoped></style>
