import StudyInfo from '@/types/study'

export interface PatientInfo {
  patientId: number
  patientName: string
  patientIdCardNumber: string
  patientGender: string
  patientHeight: string
  patientWeight: string
  dateOfBirth: string
  phoneNumber: string
  telephoneNumber: string
  faxNumber: string
  email: string
  address: string
  userId: string
  patientIdDcm: string
  createTime: String | null
  creatorId: number | null
  studyList: StudyInfo[] | null
}
