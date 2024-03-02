<script setup lang="ts">
import type { TableInstance } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import editPen from '@iconify-icons/ep/edit-pen'
import deleteUser from '@iconify-icons/ep/delete'
import IonEllipsisHorizontal from '@/assets/svg/IonEllipsisHorizontal.svg?component'
import { getImagePageByDoctorId, deleteSingleImageById } from '@/api/image'
import router from '@/router'
import { imageUrl } from '@/api/utils'
import { useImageStateStore } from '@/store/imageState'

defineProps<{
  tableSize: string
}>()

const imageStateStore = useImageStateStore()
imageStateStore.getImagesListData()
const tableRef = ref<TableInstance>()

onMounted(async () => {
  
})
function imageOperation(imageList: Object, imagesList: Object) {
  imageStateStore.bindImageList(imageList)
  imageStateStore.bindImagesList(imagesList)
  imageStateStore.checkSingleImage = true
  router.push('/imageOperation')
}

function imagesOperation(imagesList: Object) {
  imageStateStore.bindImagesList(imagesList)
  imageStateStore.bindImageList((imagesList as { singleImageList: any }).singleImageList[0])
  imageStateStore.checkSingleImage = false
  router.push('/imageOperation')
}

async function singleImageDelete(imageRow: object, singleImageId: number) {
  const params = { singleImageId: singleImageId }
  const imageId = (imageRow as { imageId: number }).imageId;
  await deleteSingleImageById(params)
    .then((data) => {
      let index = 0
      // 遍历数组
      while (index < imageStateStore.tableData.length) {
        const currentObject = imageStateStore.tableData[index]
        // 如果 imageId 等于 imageId，则使用 splice 方法删除该对象
        if (currentObject.imageId === imageId) {
          const currentSingleImageList = currentObject.singleImageList!.filter(
            (object) => object.singleImageId !== singleImageId
          )
          imageStateStore.tableData[index].singleImageList = currentSingleImageList
          console.log(imageStateStore.tableData[index].singleImageList)
          break
          // imageStateStore.tableData.splice(index, imageId)
        } else {
          // 如果不需要删除，则移动到下一个元素
          index++
        }
      }
      //imageStateStore.tableData[imagesIndex].singleImageList!.splice(imageIndex,1)
      console.log(data)
      
    })
    .catch((error) => {
      console.log(error)
    })
    setTimeout(() => {
      tableRef.value!.toggleRowExpansion(imageRow, true)
    }, 100);
}

function imageDelete(imageId: number) {
  let index = 0
  // 遍历数组
  while (index < imageStateStore.tableData.length) {
    const currentObject = imageStateStore.tableData[index]
    // 如果 imageId 等于 imageId，则使用 splice 方法删除该对象
    if (currentObject.imageId === imageId) {
      imageStateStore.tableData.splice(index, 1)
      break
    } else {
      // 如果不需要删除，则移动到下一个元素
      index++
    }
  }
}

</script>

<template>
  <el-card class="box-card">
    <el-table
      ref="tableRef"
      :data="imageStateStore.tableData"
      style="width: 100%"
      :default-sort="{ prop: 'imageCheckTime', order: 'descending' }"
      :size="tableSize"
    >
      <el-table-column type="expand">
        <template #default="props">
          <el-button type="primary">基础阅片</el-button>
          <el-button type="primary">显微镜</el-button>
          <div m="4">
            <h3>随访记录</h3>
            <el-table :data="props.row.singleImageList">
              <el-table-column label="图片" width="150px">
                <template #default="scope">
                  <el-image
                    :src="imageUrl + scope.row.singleImagePath"
                    :crossorigin="'anonymous'"
                  />
                </template>
              </el-table-column>
              <el-table-column label="图像ID" prop="imageId" />
              <el-table-column label="图像名称" prop="singleImageName" />
              <el-table-column fixed="right" label="操作" width="200">
                <template #default="scope">
                  <el-button
                    link
                    type="primary"
                    size="small"
                    @click="imageOperation(scope.row, props.row)"
                    ><template #icon>
                      <IconifyIconOffline :icon="editPen"></IconifyIconOffline>
                    </template>
                    编辑</el-button
                  >
                  <el-popconfirm
                    title="你确定要删除他吗?"
                    @confirm="singleImageDelete(props.row, scope.row.singleImageId)"
                  >
                    <template #reference>
                      <el-button link type="primary" size="small">
                        <template #icon>
                          <IconifyIconOffline :icon="deleteUser"></IconifyIconOffline>
                        </template>
                        删除</el-button
                      >
                    </template>
                  </el-popconfirm>

                  <el-button :icon="IonEllipsisHorizontal" link type="primary" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="检查时间" prop="imageCheckTime" sortable />
      <el-table-column label="患者姓名" prop="patientName" />
      <el-table-column label="检查部位" prop="imageCheckPart" />
      <el-table-column label="成像设备" prop="imageEquipment" />
      <el-table-column label="图像描述" prop="imageDesc" />
      <el-table-column label="序列数量" prop="imageCount" />
      <el-table-column label="上传医生" prop="creatorName" />
      <el-table-column label="上传时间" prop="createTime" />
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="imagesOperation(scope.row)"
            ><template #icon>
              <IconifyIconOffline :icon="editPen"></IconifyIconOffline>
            </template>
            修改</el-button
          >
          <el-popconfirm title="你确定要删除他吗?" @confirm.prevent="imageDelete(scope.row.imageId)">
            <template #reference>
              <el-button link type="primary" size="small">
                <template #icon>
                  <IconifyIconOffline :icon="deleteUser"></IconifyIconOffline>
                </template>
                删除</el-button
              >
            </template>
          </el-popconfirm>
          <el-button :icon="IonEllipsisHorizontal" link type="primary" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style lang="scss" scoped></style>
