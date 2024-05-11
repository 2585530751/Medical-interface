import { http } from '@/utils/http'
import { baseUrlApi } from './utils'

export const getPatientStudyPageApi = (data?: object) => {
  return http.request<any>(
    'post',
    baseUrlApi('study/getPatientStudyPage'),
    { data },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
