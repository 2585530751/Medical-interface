import { SeriesInfo } from '@/types/series';
    
  export type StudyInfo = {  
    studyId: number | null;  
    studyIdDcm: string | null;  
    studyInstanceUid: string | null;  
    studyDate: string | null;  
    studyTime: string | null;  
    accessionNumber: string | null;  
    modalitiesInStudy: string | null;  
    bodyPartExamined: string | null;  
    studyDescription: string | null;  
    patientAge: string | null; // 通常年龄可能是数字或范围，但这里假设为字符串  
    patientId: number | null;  
    seriesList: SeriesInfo[] | null; // 注意这里是一个Image类型的数组，或者null  
  };  