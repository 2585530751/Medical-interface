import type { ImageFeature } from './image'
import type { ImageModelResult } from '@/types/model.d.ts'

export interface ImageInfo {
  imageId: number | null
  imageName: string | null
  imagePath: string | null
  type: string | null
  seriesId: number | null
  imageIdRel: string | null
  operateId: number | null
  operateName: string | null
  operateTime: Date | null // 注意这里假设了日期格式，你可能需要自定义日期解析
  imageStatus: number | null
  imageEquipment: string | null
  imageFormat: string | null
  imageDesc: string | null
  imageCheckPart: string | null
  imageCheckTime: string | null // 或者使用Date，如果需要
  patientId: string | null
  patientName: string | null
  isDeleted: string | null // 或者使用boolean，如果需要
  imagePosition: string | null
  imageOrientation: string | null
  sliceThickness: string | null // 或者使用number，如果需要
  sliceLocation: string | null // 或者使用number，如果需要
  imageRows: string | null // 或者使用number，如果需要
  imageColumns: string | null // 或者使用number，如果需要
  pixelSpacing: string | null // 或者使用number，如果需要
  bitsAllocated: string | null // 或者使用number，如果需要
  bitsStored: string | null // 或者使用number，如果需要
  highBit: string | null // 或者使用number，如果需要
  pixelRepresentation: string | null // 或者使用number，如果需要
  windowCenter: string | null // 或者使用number，如果需要
  windowWidth: string | null // 或者使用number，如果需要
  rescaleIntercept: string | null // 或者使用number，如果需要
  rescaleSlope: string | null // 或者使用number，如果需要
  rescaleType: string | null
  imageType: string | null
  sopInstanceUid: string | null
  contentDate: string | null
  contentTime: string | null // 或者使用Date，如果需要
  imageNumber: string | null
  samplesPerPixel: string | null // 或者使用number，如果需要
  photometricInterpretation: string | null
  createTime: String | null
  creatorId: number | null

  markImageName: string | null
  markImagePath: string | null
  markImageDesc: string | null

  imageModelData: ImageModelResult | null
  modelType: string | null
}

export interface SeriesInfo {
  seriesId: number
  seriesName: string | null
  seriesEquipment: string | null
  seriesFormat: string
  seriesPath: string
  seriesPreviewPath: string | null
  seriesCount: number
  seriesCheckPart: string | null
  seriesCheckTime: string | null
  patientId: string | null
  patientName: string | null
  creatorId: number
  creatorName: string | null
  createTime: Date | null // 假设需要自定义日期解析
  seriesStatus: string | null
  isDeleted: string | null // 如果isDeleted应该是一个布尔值，请改为boolean | null
  seriesNumber: string
  seriesInstanceUid: string
  seriesModality: string | null
  seriesDesc: string
  seriesDate: string // 或者使用Date，如果需要
  seriesTime: string // 或者使用Date，如果需要
  imagePosition: string | null
  spacingBetweenSlices: string | null
  mrAcquisitionType: string | null
  studyId: number
  createTime: String | null
  creatorId: number | null
  imageList: ImageInfo[]

  readerView: string | null
  doctorView: string | null
  markSeriesPreviewPath: string | null
  markSeriesName: string | null

  seriesFeature: ImageFeature[] | null
  seriesModelType: string | null
}
