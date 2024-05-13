export const departmentOptions = [
  {
    value: 'doctor',
    label: '主治医生',
    children: [
      {
        value: 'internist',
        label: '内科',
        children: [
          {
            value: 'cardiovascularInternalMedicine',
            label: '心血管内科'
          },
          {
            value: 'SrespiratoryMedicineDepartment',
            label: '呼吸内科'
          },
          {
            value: 'digestiveMedicineDepartment',
            label: '消化内科'
          },
          {
            value: 'neurologyDepartment',
            label: '神经内科'
          },
          {
            value: 'nephrologyDepartment',
            label: '肾内科'
          },
          {
            value: 'endocrinologyDepartment',
            label: '内分泌科'
          },
          {
            value: 'hematologyDepartment',
            label: '血液内科'
          },
          {
            value: 'rheumatologyAndImmunologyDepartment',
            label: '风湿免疫科'
          }
        ]
      },
      {
        value: 'surgery',
        label: '外科',
        children: [
          {
            value: 'generalSurgeryDepartment',
            label: '普通外科（包括肝胆、胃肠、甲状腺、乳腺等）'
          },
          {
            value: 'neurosurgeryDepartment',
            label: '神经外科'
          },
          {
            value: 'thoracicSurgeryDepartment',
            label: '胸外科'
          },
          {
            value: 'cardiovascularSurgeryDepartment',
            label: '心血管外科'
          },
          {
            value: 'urologyDepartment',
            label: '泌尿外科'
          },
          {
            value: 'orthopedicsDepartment',
            label: '骨科'
          },
          {
            value: 'burnsDepartment',
            label: '烧伤科'
          },
          {
            value: 'plasticSurgeryDepartment',
            label: '整形外科'
          }
        ]
      },
      {
        value: 'obstetricianGynecologist',
        label: '妇产科',
        children: [
          {
            value: 'gynecologyDepartment',
            label: '妇科'
          },
          {
            value: 'obstetricsDepartment',
            label: '产科'
          },
          {
            value: 'familyPlanningDepartment',
            label: '计划生育科'
          },
          {
            value: 'reproductiveMedicineDepartment',
            label: '生殖医学科（或不孕不育科）'
          }
        ]
      },
      {
        value: 'pediatrician',
        label: '儿科',
        children: [
          {
            value: 'pediatricsDepartment',
            label: '小儿科'
          },
          {
            value: 'neonatologyDepartment',
            label: '新生儿科'
          }
        ]
      },
      {
        value: 'ophthalmologyAndOtolaryngologyDepartment',
        label: '五官科',
        children: [
          {
            value: 'otolaryngologyDepartment',
            label: '耳鼻喉科'
          },
          {
            value: 'ophthalmologyDepartment',
            label: '眼科'
          },
          {
            value: 'dentalDepartment',
            label: '口腔科'
          }
        ]
      },
      {
        value: 'dermatologyDepartment',
        label: '皮肤科',
        children: []
      },
      {
        value: 'psychiatryDepartment',
        label: '精神科',
        children: []
      },
      {
        value: 'oncologyDepartment',
        label: '肿瘤科',
        children: [
          {
            value: 'oncologyMedicineDepartment',
            label: '肿瘤内科'
          },
          {
            value: 'oncologicSurgeryDepartment',
            label: '肿瘤外科'
          },
          {
            value: 'radiationOncologyDepartment',
            label: '放疗科'
          }
        ]
      },
      {
        value: 'traditionalChineseMedicineDepartment',
        label: '中医科',
        children: [
          {
            value: 'traditionalChineseInternalMedicineDepartment',
            label: '中医内科'
          },
          {
            value: 'traditionalChineseSurgeryDepartment',
            label: '中医外科'
          },
          {
            value: 'acupunctureDepartment',
            label: '针灸科'
          },
          {
            value: 'massageTherapyDepartment',
            label: '推拿科'
          }
        ]
      },
      {
        value: 'rehabilitationMedicineDepartment',
        label: '康复医学科',
        children: [
          {
            value: 'physicalTherapyDepartment',
            label: '物理治疗科'
          },
          {
            value: 'rehabilitationDepartment',
            label: '康复科'
          }
        ]
      },
      {
        value: 'emergencyMedicineDepartment',
        label: '急诊医学科',
        children: [
          {
            value: 'emergencyDepartment',
            label: '急诊科'
          },
          {
            value: 'emergencyCenter',
            label: '急救中心'
          }
        ]
      },
      {
        value: 'anesthesiaAndOperatingDepartment',
        label: '麻醉科与手术室',
        children: [
          {
            value: 'anesthesiologyDepartment',
            label: '麻醉科'
          },
          {
            value: 'operatingRoom',
            label: '手术室'
          }
        ]
      },
      {
        value: 'medicalImagingAndLaboratoryDepartment',
        label: '医学影像科与检验科',
        children: [
          {
            value: 'radiologyDepartment',
            label: '放射科（X光、CT、MRI等）'
          },
          {
            value: 'ultrasonographyDepartment',
            label: '超声科'
          },
          {
            value: 'nuclearMedicineDepartment',
            label: '核医学科'
          },
          {
            value: 'laboratoryDepartment',
            label: '检验科'
          }
        ]
      },
      {
        value: 'pathologyDepartment',
        label: '病理科',
        children: [
          {
            value: 'pathologyExaminationDepartment',
            label: '病理学检查科'
          }
        ]
      },
      {
        value: 'nutritionAndDietaryDepartment',
        label: '营养科与膳食科',
        children: [
          {
            value: 'nutritionDepartment',
            label: '营养科'
          },
          {
            value: 'dietaryDepartment',
            label: '膳食科'
          }
        ]
      },
      {
        value: 'pharmacyDepartment',
        label: '药学部',
        children: [
          {
            value: 'pharmacy',
            label: '药房'
          },
          {
            value: 'pharmacyAdministrationAndClinicalPharmacy',
            label: '药事管理与临床药学'
          }
        ]
      },
      {
        value: 'otherAncillaryDepartments',
        label: '其他辅助科室',
        children: [
          {
            value: 'bloodTransfusionDepartment',
            label: '输血科'
          },
          {
            value: 'supplyRoom',
            label: '供应室'
          },
          {
            value: 'medicalRecordsDepartment',
            label: '病案室'
          }
        ]
      }
    ]
  },

  {
    value: 'radiologist',
    label: '影视科阅片员',
    children: [
      {
        value: 'ctReader',
        label: 'CT'
      },
      {
        value: 'mriReader',
        label: 'MRI'
      }
    ]
  },
  {
    value: 'patient',
    label: '患者'
  }
]
