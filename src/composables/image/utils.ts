import { imageUrl } from '@/api/utils'

export function generateImageUrl(imagePath: String) {
    return 'web:' + imageUrl + imagePath
  }