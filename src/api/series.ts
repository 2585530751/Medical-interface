import { http } from '@/utils/http'
import { baseUrlApi } from './utils'
import type { ResponseResuilt } from '@/types/global'
import type { SeriesInfo } from '@/types/series'

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

  export const viewReadermApi = (data?: object) => {
    return http.request<ResponseResuilt<SeriesInfo>>(
      'post',
      baseUrlApi('view/reader'),
      { data },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  }