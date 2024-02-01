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
