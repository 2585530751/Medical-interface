import { imageUrl } from '@/api/utils'

export function generateImageUrl(imagePath: String) {
  return 'web:' + imageUrl + imagePath
}

export function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
//   const hours = date.getHours()
//   const minutes = date.getMinutes()
//   const seconds = date.getSeconds()

  return `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  } `
//   ${hours}:${minutes}:${seconds}
}

