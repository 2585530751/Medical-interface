import { http } from '@/utils/http'
import { baseUrlApi } from './utils'
import type { ResponseResuilt } from '@/types/global.d.ts'
import type { ImageModelResult } from '@/types/model.d.ts'

/**  */
export const uploadImages = (data?: object) => {
  return http.request<any>(
    'post',
    baseUrlApi('series/uploadImages'),
    { data },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}

export const getImagePageByDoctorId = (data?: object) => {
  return http.request<any>(
    'post',
    baseUrlApi('series/getImagePageByDoctorId'),
    { data },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

export const deleteImageById = (params?: object) => {
  return http.request<any>('get', baseUrlApi('series/deleteImageById'), { params })
}

export const deleteSingleImageById = (params?: object) => {
  return http.request<any>('get', baseUrlApi('image/deleteSingleImageById'), { params })
}

export const imageSegmentationOfThyroidNodulesApi = (params?: object) => {
  return http.request<ResponseResuilt<ImageModelResult[]>>('get', baseUrlApi('modelApi/segment'), {
    params
  })
}

export const singleImageSegmentationOfThyroidNodulesApi = (params?: object) => {
  return http.request<any>('get', baseUrlApi('modelApi/singleSegment'), { params })
}

export const singleImageClassifyOfThyroidNodulesApi = (params?: object) => {
  return http.request<any>('get', baseUrlApi('modelApi/singleClassify'), { params })
}

export const imageClassifyOfThyroidNodulesApi = (params?: object) => {
  return http.request<any>('get', baseUrlApi('modelApi/classify'), { params })
}

export const singleImageDetectionOfPulmonaryNodulesApi = (params?: object) => {
  return http.request<any>('get', baseUrlApi('modelApi/singleLungDetect'), { params })
}

export const imageDetectionOfPulmonaryNodulesApi = (params?: object) => {
  return http.request<any>('get', baseUrlApi('modelApi/lungDetect'), { params })
}

export const singleImageIntestinalPolypsSegmentationApi = (params?: object) => {
  return http.request<any>('get', baseUrlApi('modelApi/intestinalPolypsSingleSegmentation'), {
    params
  })
}

export const imageIntestinalPolypsSegmentationApi = (params?: object) => {
  return http.request<any>('get', baseUrlApi('modelApi/intestinalPolypsSegmentation'), { params })
}
