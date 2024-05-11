import { http } from '@/utils/http'
import { baseUrlApi } from './utils'

export const getSeriesImagePageApi = (data?: object) => {
    return http.request<any>(
      'post',
      baseUrlApi('study/getSeriesImagePage'),
      { data },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

export const getSeriesImageByIdApi = (params?: object) => {
    return http.request<any>(
      'get',
      baseUrlApi('series/getSeriesImageById'),
      { params }
    )
  }