type ImageInfo = {  
    seriesId: number | null;  
    imageName: string | null;  
    imageEquipment: string | null;  
    imageFormat: string | null;  
    imagePath: string | null;  
    imageDesc: string | null;  
    imageCount: number | null;  
    imageCheckPart: string | null;  
    imageCheckTime: string | null;  
    patientId: number | null;  
    patientName: string | null;  
    creatorId: number | null;  
    creatorName: string | null;  
    createTime: string | null; // 假设这是一个ISO 8601格式的字符串  
    imageStatus: string | null;  
    isDeleted: boolean | null; // 通常isDeleted是布尔值，但根据你给出的数据可能是字符串，这里假设为布尔  
    seriesNumber: string | null;  
    seriesInstanceUid: string | null;  
    modality: string | null;  
    seriesDesc: string | null;  
    seriesDate: string | null;  
    seriesTime: string | null;  
    imagePosition: string | null; // 可能是一个坐标字符串，例如"123.45\\234.56\\-345.67"  
    spacingBetweenSlices: string | null; // 可能是描述层间距的字符串，如"5mm"  
    mrAcquisitionType: string | null; // 对于CT图像，这个属性可能不适用，但根据你的结构包含在内  
    studyId: number | null;  
  };  
    
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
    seriesList: Image[] | null; // 注意这里是一个Image类型的数组，或者null  
  };  