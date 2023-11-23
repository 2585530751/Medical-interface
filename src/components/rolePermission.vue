<script setup lang="ts">
import { storageSession } from '@pureadmin/utils'
import { type DataInfo, sessionKey } from '@/utils/auth'
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useUserStoreHook } from '@/store/modules/user'
defineOptions({
  name: ''
})
const userRoles = ref(getUserRoles());
const props = defineProps<{
  value: Array<string>
}>()
const userStore = useUserStoreHook()
const unsubscribe = userStore.$subscribe((mutation,state) => {
      userRoles.value = userStore.roles;
      hasPermission();
        console.log(mutation, state)
    });
// 在组件卸载时取消订阅，防止内存泄漏
onUnmounted(() => {
      unsubscribe();
    });


// 判断是否有权限显示
const hasPermission = () => {
  console.log(props.value.some((role) => userStore.roles?.includes(role)));
  return props.value.some((role) => userStore.roles?.includes(role));
};

function getUserRoles() {
  const userInfo = storageSession().getItem<DataInfo<number>>(sessionKey);
  if (userInfo) {
    console.log(userInfo.roles);
    return userInfo.roles;
  } else {
    return [];
  }
}


</script>

<template>
  <div v-if="hasPermission()">
    <!-- 使用v-slot插槽包裹的内容 -->
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>
