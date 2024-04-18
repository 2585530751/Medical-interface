import { http } from '@/utils/http'
import { baseUrlApi } from './utils'

/**  */
export const uploadImages = (data?: object) => {
  return http.request<any>(
    'post',
    baseUrlApi('image/uploadImages'),
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
    baseUrlApi('image/getImagePageByDoctorId'),
    { data },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

export const deleteSingleImageById = (params?: object) => {
  return http.request<any>('get', baseUrlApi('singleImage/deleteSingleImageById'), { params })
}

export const imageSegmentationOfThyroidNodulesApi = (params?: object) => {
  return http.request<any>('get', baseUrlApi('modelApi/segment'), { params })
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