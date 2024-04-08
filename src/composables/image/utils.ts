import { imageUrl } from '@/api/utils'
import type { ImageInfo, ImageInfoWindows } from '@/types/image'
import { storageSession } from '@pureadmin/utils'

export const imagesListsSession = 'imageLists'
export const imagesListWindowsSession = 'imagesListWindows'
export const imagesModelsListsSession = 'imagesModelsLists'

export function generateImageUrl(imagePath: String) {
  if (imagePath.endsWith('.png') || imagePath.endsWith('.jpg') || imagePath.endsWith('.jpeg')) {
    return 'web:' + imageUrl + imagePath
  } else if (imagePath.endsWith('.dcm')) {
    return 'wadouri:' + imageUrl + imagePath
  }
}

export function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  //   const hours = date.getHours()
  //   const minutes = date.getMinutes()
  //   const seconds = date.getSeconds()

  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} `
  //   ${hours}:${minutes}:${seconds}
}

export function pushImageListToSession(imagesList: ImageInfo) {
  const session = storageSession()
  if (session.getItem(imagesListsSession)) {
    const list: ImageInfo[] = session.getItem(imagesListsSession)

    // 检查数组中是否存在具有相同imageId的元素
    let existingElement = list.find((element) => element.imageId === imagesList.imageId)
    console.log(existingElement)
    if (existingElement) {
      // 如果存在相同imageId的元素，则删除它并添加新元素
      const index = list.indexOf(existingElement)
      list.splice(index, 1) // 删除找到的元素
      list.push(imagesList) // 添加新元素
      session.setItem(imagesListsSession, list)
    } else {
      // 如果不存在相同imageId的元素，则直接添加新元素
      list.push(imagesList)
      session.setItem(imagesListsSession, list)
    }
  } else {
    session.setItem(imagesListsSession, [imagesList])
  }
}

export function pushimagesModelsListsSession(imagesList: ImageInfo) {
  const session = storageSession()
  if (session.getItem(imagesModelsListsSession)) {
    const list: ImageInfo[] = session.getItem(imagesModelsListsSession)

    // 检查数组中是否存在具有相同imageId的元素
    let existingElement = list.find((element) => {
      return (
        element.singleImageList.length === imagesList.singleImageList.length &&
        element.singleImageList[0].singleImagePath ===
        imagesList.singleImageList[0].singleImagePath
      )
    })
    console.log(existingElement)
    if (existingElement) {
      // 如果存在相同imageId的元素，则删除它并添加新元素
      const index = list.indexOf(existingElement)
      list.splice(index, 1) // 删除找到的元素
      list.push(imagesList) // 添加新元素
      session.setItem(imagesModelsListsSession, list)
    } else {
      // 如果不存在相同imageId的元素，则直接添加新元素
      list.push(imagesList)
      session.setItem(imagesModelsListsSession, list)
    }
  } else {
    session.setItem(imagesModelsListsSession, [imagesList])
  }
}

export function changeImagesListWindowsToSession(
  ImageInfoWindows: ImageInfoWindows,
  index: number
) {
  const session = storageSession()
  if (session.getItem(imagesListWindowsSession)) {
    const list: (ImageInfoWindows | 0)[] = session.getItem(imagesListWindowsSession)
    if (JSON.stringify(list[index]) != JSON.stringify(ImageInfoWindows)) {
      list[index] = ImageInfoWindows
      session.setItem(imagesListWindowsSession, list)
    }
  } else {
    const list: (ImageInfoWindows | 0)[] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    list[index] = ImageInfoWindows
    session.setItem(imagesListWindowsSession, list)
  }
}
