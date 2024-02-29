import { ref, reactive, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import * as cornerstoneTools from '@cornerstonejs/tools'
import type { IToolGroup } from '@cornerstonejs/tools/src/types'
import { getImagePageByDoctorId, deleteSingleImageById } from '@/api/image'
import { message } from '@/utils/message'

const { Enums: csToolsEnums } = cornerstoneTools
const { MouseBindings } = csToolsEnums

export const useImageStateStore = defineStore('imageState', () => {
  let imageList = reactive({ singleImageId: '', singleImagePath: '' })
  let imagesList = reactive({singleImageList: []})
  const tableData = reactive([
    {
      creatorId: 2,
      creatorName: '王老八',
      createTime: '2023-09-03',
      imageCheckTime: '2023-05-03',
      imagesCount: '32',
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
        // {
        //   imageId: 1,
        //   imageIndex: 1,
        //   imagePath: 'src/assets/dicom/1-01.dcm',
        //   imageWidth: 512,
        //   imageHeight: 512,
        //   imagePixelSpacing: 0.5,
        //   imageSliceThickness: 1,
        //   imageSliceLocation: 0,
        //   imageWindowWidth: 400,
        //   imageWindowCenter: 40,
        //   imageMinGray: 0,
        //   imageMaxGray: 255,
        //   imageBitsAllocated: 8,
        //   imageBitsStored: 8,
        //   imageHighBit: 7,
        //   imagePhotometricInterpretation: 'MONOCHROME2',
        //   imagePixelRepresentation: 0,
        //   imagePlanarConfiguration: 0,
        //   imageSamplesPerPixel: 1,
        //   imagePixelData: 'base64',
        //   imageTransferSyntaxUID: '1.2.840.10008.1.2.1',
        //   imageSOPClassUID: '1.2.840.10008'
        // },
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
      imagesCount: 32,
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
      imagesCount: 45,
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
      imagesCount: 27,
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
      imagesCount: 18,
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
      imagesCount: 50,
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
      imagesCount: 36,
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
      imagesCount: 22,
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
      imagesCount: 15,
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
      imagesCount: 40,
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
      imagesCount: 28,
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
  const checkSingleImage = ref(false)
  const leftMouseActive = ref('')
  const toolGroup: Ref<IToolGroup> = ref() as Ref<IToolGroup>

  function bindLeftMouse(newLeftMouseActive: string) {
    toolGroup!.value.setToolPassive(leftMouseActive.value)
    leftMouseActive.value = newLeftMouseActive
    toolGroup!.value.setToolActive(leftMouseActive.value, {
      bindings: [
        {
          mouseButton: MouseBindings.Primary // Left Click
        }
      ]
    })
    console.log(leftMouseActive.value)
  }

  function bindImageList(imageObject: Record<string, any>) {
    // 遍历普通对象，并将值复制到响应式对象中
    Object.keys(imageObject).forEach((key) => {
      imageList[key as keyof typeof imageList] = imageObject[key]
    })
    console.log(imageList)
  }

  function bindImagesList(imagesObject: Record<string, any>) {
    // 遍历普通对象，并将值复制到响应式对象中
    Object.keys(imagesObject).forEach((key) => {
      imagesList[key as keyof typeof imagesList] = imagesObject[key]
    })
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
    tableData,
    leftMouseActive,
    toolGroup,
    checkSingleImage,
    bindLeftMouse,
    bindImageList,
    bindImagesList,
    getImagesListData
  }
})
