import { dayjs } from 'element-plus'

export function chineseStandardTimeFormat(date: string): string {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

export function setAllPropertiesToNull(obj: Record<string, any>) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      obj[key] = null
    }
  }
}
