import { http } from '@/utils/http'
import { baseUrlApi } from './utils'

export const getStudySeriesPageApi = (data?: object) => {
  return http.request<any>(
    'post',
    baseUrlApi('study/getStudySeriesPage'),
    { data },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

export const getUserPatientStudySeriesPage = (data?: object) => {
  return http.request<any>(
    'post',
    baseUrlApi('study/getUserPatientStudySeriesPage'),
    { data },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

