import { ref, reactive, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import * as cornerstoneTools from '@cornerstonejs/tools'
import type { IToolGroup } from '@cornerstonejs/tools/src/types'
import { getImagePageByDoctorId, deleteSingleImageById } from '@/api/image'
import { message } from '@/utils/message'
import { storageSession } from '@pureadmin/utils'
import {
  imagesListsSession,
  imagesListWindowsSession,
  imagesModelsListsSession,
  pushimagesModelsListsSession
} from '@/composables/image/utils'

import {
  RenderingEngine,
  Enums,
  imageLoader,
  metaData,
  getRenderingEngine,
  volumeLoader,
  BaseVolumeViewport,
  VideoViewport,
  StackViewport,
  VolumeViewport
} from '@cornerstonejs/core'
import type { Types } from '@cornerstonejs/core'
import type { IStackViewport, IVolumeViewport } from '@cornerstonejs/core/src/types'
import { formatDate } from '@/composables/image/utils'
import type { ImageInfo, ImageInfoWindows, SingleImage } from '@/types/image'
import { initDemo } from '@/utils/helpers/index.js'
import createTools from '@/composables/toolsManage'
import { utilities as csUtils } from '@cornerstonejs/core'
import { type ViewportColorbar } from '@cornerstonejs/tools/src/utilities/voi/colorbar/ViewportColorbar'

const { Enums: csToolsEnums } = cornerstoneTools
const { MouseBindings } = csToolsEnums
await initDemo()

export const useImageStateStore = defineStore('imageState', () => {
  const imageList = reactive<SingleImage>({
    imageId: 0,
    isDeleted: 0,
    operateId: 0,
    operateName: '',
    operateTime: '', // ISO 8601 日期字符串
    patientId: 0,
    patientName: '',
    singleImageCheckPart: '',
    singleImageCheckTime: '', // ISO 8601 日期字符串
    singleImageDesc: '',
    singleImageEquipment: '',
    singleImageFormat: '',
    singleImageId: 0,
    singleImageRel: 0,
    singleImageName: '',
    singleImagePath: '',
    status: 0,
    type: '',
    modelType: '',
    singleImageModelData: {
      modelResId: 0,
      imageId: 0,
      singleImageId: 0,
      creatorId: 0,
      modelId: 0,
      creatorName: '',
      createTime: '', // ISO 8601 日期字符串
      modelResultPath: '',
      modelResultName: '',
      resData: ''
    }
  })
  const imagesList = reactive<ImageInfo>({
    creatorId: 0,
    creatorName: '',
    createTime: '', // ISO 8601 日期字符串
    imageCheckTime: '', // ISO 8601 日期字符串
    imageCount: 0, // 假设这是一个数字，如果后端返回的是字符串，则保持为string
    imageCheckPart: '',
    imageDesc: '',
    imageEquipment: '',
    imageId: 0,
    imageName: '',
    imagePath: '',
    imageStatus: '',
    isDeleted: 0,
    patientId: 0,
    patientName: '',
    imageFormat: '',
    singleImageList: []
  })
  const imagesLists = reactive<ImageInfo[]>(
    storageSession().getItem<ImageInfo[]>(imagesListsSession)
      ? storageSession().getItem<ImageInfo[]>(imagesListsSession)
      : []
  )
  const imagesModelsLists = reactive<ImageInfo[]>(
    storageSession().getItem<ImageInfo[]>(imagesModelsListsSession)
      ? storageSession().getItem<ImageInfo[]>(imagesModelsListsSession)
      : []
  )
  const imagesListWindows = reactive<(0 | ImageInfoWindows)[]>(
    storageSession().getItem<(0 | ImageInfoWindows)[]>(imagesListWindowsSession)
      ? storageSession().getItem<(0 | ImageInfoWindows)[]>(imagesListWindowsSession)
      : [0, 0, 0, 0, 0, 0, 0, 0, 0]
  )

  const segmentationRepresentationUIDList = reactive(new Map())

  const tableData = reactive([
    {
      creatorId: 2,
      creatorName: '王老八',
      createTime: '2023-09-03',
      imageCheckTime: '2023-05-03',
      imageCount: '32',
      imageCheckPart: '肺部',
      imageDesc: '疑似肺部肿瘤',
      imageEquipment: 'CT',
      imageFormat: 'DICOM',
      imageId: 1,
      imageName: '1-01.dcm',
      imagePath: 'src/assets/dicom/1-01.dcm',
      imageStatus: '',
      isDeleted: 0,
      patientId: 4,
      patientName: '王老五',
      singleImageList: [
        {
          imageId: 2,
          isDeleted: 0,
          operateId: 1,
          operateName: '医生1',
          operateTime: '2023-09-03',
          patientId: 1,
          patientName: '患者1',
          singleImageCheckPart: '肺部',
          singleImageCheckTime: '2023-05-03',
          singleImageDesc: '疑似肺部肿瘤',
          singleImageEquipment: 'CT',
          singleImageFormat: 'DICOM',
          singleImageId: 1,
          singleImageRel: 1,
          singleImageName: '1-01.dcm',
          singleImagePath: 'src/assets/dicom/1-01.dcm',
          status: 1,
          type: ''
        }
      ]
    },
    {
      imageId: 11,
      imageCheckTime: '2023-05-03',
      patientId: 1,
      patientName: '患者1',
      imageCheckPart: '胸部',
      imageEquipment: 'CT',
      imageDesc: '疑似肿瘤',
      imageCount: 32,
      creatorId: 1,
      creatorName: '医生1',
      createTime: '2023-09-03'
    },
    {
      imageId: 2,
      imageCheckTime: '2023-05-03',
      patientId: 2,
      patientName: '患者2',
      imageCheckPart: '头部',
      imageEquipment: 'MRI',
      imageDesc: '疑似炎症',
      imageCount: 45,
      creatorId: 2,
      creatorName: '医生2',
      createTime: '2023-09-03'
    },
    {
      imageId: 3,
      imageCheckTime: '2023-05-03',
      patientId: 3,
      patientName: '患者3',
      imageCheckPart: '四肢',
      imageEquipment: 'X射线',
      imageDesc: '疑似损伤',
      imageCount: 27,
      creatorId: 3,
      creatorName: '医生3',
      createTime: '2023-09-03'
    },
    {
      imageId: 4,
      imageCheckTime: '2023-05-03',
      patientId: 4,
      patientName: '患者4',
      imageCheckPart: '全身',
      imageEquipment: '超声波',
      imageDesc: '疑似结石',
      imageCount: 18,
      creatorId: 4,
      creatorName: '医生4',
      createTime: '2023-09-03'
    },
    {
      imageId: 5,
      imageCheckTime: '2023-05-03',
      patientId: 5,
      patientName: '患者5',
      imageCheckPart: '颈部',
      imageEquipment: 'CT',
      imageDesc: '疑似畸形',
      imageCount: 50,
      creatorId: 5,
      creatorName: '医生5',
      createTime: '2023-09-03'
    },
    {
      imageId: 6,
      imageCheckTime: '2023-05-03',
      patientId: 6,
      patientName: '患者6',
      imageCheckPart: '腹部',
      imageEquipment: 'MRI',
      imageDesc: '疑似炎症',
      imageCount: 36,
      creatorId: 6,
      creatorName: '医生6',
      createTime: '2023-09-03'
    },
    {
      imageId: 7,
      imageCheckTime: '2023-05-03',
      patientId: 7,
      patientName: '患者7',
      imageCheckPart: '骨盆',
      imageEquipment: 'X射线',
      imageDesc: '疑似损伤',
      imageCount: 22,
      creatorId: 7,
      creatorName: '医生7',
      createTime: '2023-09-03'
    },
    {
      imageId: 8,
      imageCheckTime: '2023-05-03',
      patientId: 8,
      patientName: '患者8',
      imageCheckPart: '头部',
      imageEquipment: '超声波',
      imageDesc: '疑似肿瘤',
      imageCount: 15,
      creatorId: 8,
      creatorName: '医生8',
      createTime: '2023-09-03'
    },
    {
      imageId: 9,
      imageCheckTime: '2023-05-03',
      patientId: 9,
      patientName: '患者9',
      imageCheckPart: '颈部',
      imageEquipment: 'CT',
      imageDesc: '疑似结石',
      imageCount: 40,
      creatorId: 9,
      creatorName: '医生9',
      createTime: '2023-09-03'
    },
    {
      imageId: 10,
      imageCheckTime: '2023-05-03',
      patientId: 10,
      patientName: '患者10',
      imageCheckPart: '腰部',
      imageEquipment: 'MRI',
      imageDesc: '疑似畸形',
      imageCount: 28,
      creatorId: 10,
      creatorName: '医生10',
      createTime: '2023-09-03'
    }
  ])
  const pageData = reactive({
    current: 1,
    pageSize: 10,
    userId: 1
  })
  const windowRowsColumns = reactive({ rows: 1, columns: 1 })

  const renderingEngine: Ref<RenderingEngine> = ref(
    new RenderingEngine('stackRenderingEngine')
  ) as Ref<RenderingEngine>
  const viewports: Ref<
    BaseVolumeViewport[] | Types.IStackViewport[] | VideoViewport[] | Types.IVolumeViewport[]
  > = ref([]) as Ref<
    BaseVolumeViewport[] | Types.IStackViewport[] | VideoViewport[] | Types.IVolumeViewport[]
  >
  const viewportColorbar: Ref<ViewportColorbar[]> = ref([])

  const leftMouseActive: Ref<string> = ref('')
  const toolGroup: Ref<IToolGroup> = ref(
    cornerstoneTools.ToolGroupManager.createToolGroup('GroupToolsId') as unknown as IToolGroup
  ) as Ref<IToolGroup>
  const segmentationId = ref('segementationId')

  const selectImagesList = ref()
  const selectImagesListWindows = ref(0)
  const selectImagesModelsList = ref()

  function bindLeftMouse(newLeftMouseActive: string) {
    message(`左键当前激活的工具是：${newLeftMouseActive}`, { type: 'success' })
    toolGroup!.value.setToolPassive(leftMouseActive.value)
    leftMouseActive.value = newLeftMouseActive
    toolGroup!.value.setToolActive(leftMouseActive.value, {
      bindings: [
        {
          mouseButton: MouseBindings.Primary // Left Click
        }
      ]
    })
  }

  function bindImageList(imageObject: Record<string, any>) {
    // 遍历普通对象，并将值复制到响应式对象中
    Object.keys(imageObject).forEach((key) => {
      ;(imageList as Record<string, any>)[key as keyof typeof imageList] = imageObject[key]
    })
  }

  function bindImagesList(imagesObject: Record<string, any>) {
    // 遍历普通对象，并将值复制到响应式对象中
    Object.keys(imagesObject).forEach((key) => {
      ;(imagesList as Record<string, any>)[key as keyof typeof imagesList] = imagesObject[key]
    })
  }

  function pushImagesList(imagesList: ImageInfo) {
    let existingElement = imagesLists.find((element) => element.imageId === imagesList.imageId)
    if (existingElement) {
      const index = imagesLists.indexOf(existingElement)
      imagesLists.splice(index, 1)
      imagesLists.push(imagesList)
    } else {
      imagesLists.push(imagesList)
    }
  }

  function pushImagesModelsList(imagesListParameter: ImageInfo) {
    let existingElement = imagesModelsLists.find(
      (element) =>
        element.singleImageList.length === imagesListParameter.singleImageList.length &&
        element.singleImageList[0].singleImageModelData.modelId ===
          imagesListParameter.singleImageList[0].singleImageModelData.modelId
    )
    if (existingElement) {
      const index = imagesModelsLists.indexOf(existingElement)
      imagesModelsLists.splice(index, 1)
      imagesModelsLists.push(imagesListParameter)
    } else {
      imagesModelsLists.push(imagesListParameter)
    }
  }

  async function getImagesListData() {
    await getImagePageByDoctorId(pageData)
      .then((res) => {
        if (res.success) {
          const data = res.data
          if (data.records) {
            let records = data.records
            records.forEach((item: any) => {
              item.image['singleImageList'] = item.singleImageList
              if (item.image.imageCheckTime) {
                item.image.imageCheckTime = formatDate(new Date(item.image.imageCheckTime))
              }
              if (item.image.createTime) {
                item.image.createTime = formatDate(new Date(item.image.createTime))
              }
              tableData.push(item.image)
            })
          }
        } else {
          message(res.msg, { type: 'error' })
        }
      })
      .catch((error) => {
        message(error, { type: 'error' })
      })
  }
  return {
    imageList,
    imagesList,
    imagesLists,
    imagesListWindows,
    segmentationRepresentationUIDList,
    segmentationId,
    imagesModelsLists,

    tableData,
    leftMouseActive,
    toolGroup,
    selectImagesList,
    selectImagesListWindows,
    selectImagesModelsList,

    windowRowsColumns,

    renderingEngine,
    viewports,
    viewportColorbar,

    bindLeftMouse,
    bindImageList,
    bindImagesList,
    getImagesListData,
    pushImagesList,
    pushImagesModelsList
  }
})
