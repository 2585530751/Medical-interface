import type image from "@/router/modules/image"
import type { Interface } from "readline"

interface SingleImage {
  imageId: number
  isDeleted: number // 通常，布尔值使用boolean类型，但如果你的后端返回的是0和1，也可以保持为number
  operateId: number
  operateName: string
  operateTime: string // ISO 8601格式的日期字符串，或者可以使用Date类型
  patientId: number
  patientName: string
  singleImageCheckPart: string
  singleImageCheckTime: string // ISO 8601格式的日期字符串，或者可以使用Date类型
  singleImageDesc: string
  singleImageEquipment: string
  singleImageFormat: string
  singleImageId: number
  singleImageRel: number
  singleImageName: string
  singleImagePath: string // 路径通常是字符串，确保它匹配你的文件结构
  status: number
  type: string // 如果type有固定的几个值，可以使用枚举(enum)来定义
}

interface ImageInfo {
  creatorId: number
  creatorName: string
  createTime: string // ISO 8601日期字符串，或者可以使用Date类型
  imageCheckTime: string // ISO 8601日期字符串，或者可以使用Date类型
  imageCount: number // 假设这是一个数字，如果后端返回的是字符串，则保持为string
  imageCheckPart: string
  imageDesc: string
  imageEquipment: string
  imageFormat: string
  imageId: number
  imageName: string
  imagePath: string
  imageStatus: string // 根据实际情况，可能需要定义为一个枚举或特定的字符串字面量类型
  isDeleted: number // 通常布尔值使用boolean类型，但如果后端返回0和1，则保持为number
  patientId: number
  patientName: string
  singleImageList: SingleImage[] // 如果singleImageList是一个包含相同结构对象的数组，则定义其类型
}

interface ImageInfoWindows{
  imageInfo: ImageInfo,
  singleImage: SingleImage
}