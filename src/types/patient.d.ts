export interface PatientInfo {
    patientId: number,
    patientName: string,
    patientIdCardNumber: string,
    patientGender: string,
    patientHeight: string,
    patientWeight: string,
    dateOfBirth: string,
    phoneNumber: string,
    telephoneNumber:string,
    faxNumber: string,
    email: string,
    address: string,
    userId: string,
    patientIdDcm: string,
    studyList: [
        {
          studyId: number,
          studyIdDcm: string,
          studyInstanceUid: string,
          studyDate: string,
          studyTime: string,
          accessionNumber: string,
          modalitiesInStudy: string,
          bodyPartExamined: string,
          studyDescription: string,
          patientAge: string,
          patientId: number
        }
      ]
}