import { basicImageUrl } from '@/api/utils'
import type { SeriesInfoWindows } from '@/types/image'
import { storageSession } from '@pureadmin/utils'
import type { SeriesInfo } from '@/types/series'

export const seriesListsSession = 'seriesLists'
export const seriesListWindowsSession = 'seriesListWindows'
export const seriesModelsListsSession = 'seriesModelsLists'

export function generateImageUrl(imagePath: String) {
  if (imagePath.endsWith('.png') || imagePath.endsWith('.jpg') || imagePath.endsWith('.jpeg')) {
    return 'web:' + basicImageUrl + imagePath
  } else if (imagePath.endsWith('.dcm')) {
    return 'wadouri:' + basicImageUrl + imagePath
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

export function pushSeriesToSession(seriesInfo: SeriesInfo) {
  const session = storageSession()
  if (session.getItem(seriesListsSession)) {
    const list: SeriesInfo[] = session.getItem(seriesListsSession)

    // 检查数组中是否存在具有相同imageId的元素
    let existingElement = list.find((element) => element.seriesId === seriesInfo.seriesId)
    console.log(existingElement)
    if (existingElement) {
      // 如果存在相同imageId的元素，则删除它并添加新元素
      const index = list.indexOf(existingElement)
      list.splice(index, 1) // 删除找到的元素
      list.push(seriesInfo) // 添加新元素
      session.setItem(seriesListsSession, list)
    } else {
      // 如果不存在相同imageId的元素，则直接添加新元素
      list.push(seriesInfo)
      session.setItem(seriesListsSession, list)
    }
  } else {
    session.setItem(seriesListsSession, [seriesInfo])
  }
}

export function pushseriesModelsListsSession(seriesInfo: SeriesInfo) {
  const session = storageSession()
  if (session.getItem(seriesModelsListsSession)) {
    const list: SeriesInfo[] = session.getItem(seriesModelsListsSession)

    // 检查数组中是否存在具有相同imageId的元素
    let existingElement = list.find((element) => {
      return (
        element.imageList.length === seriesInfo.imageList.length &&
        element.imageList[0].imageModelData!.modelId ===
        seriesInfo.imageList[0].imageModelData!.modelId
      )
    })
    if (existingElement) {
      // 如果存在相同imageId的元素，则删除它并添加新元素
      const index = list.indexOf(existingElement)
      list.splice(index, 1) // 删除找到的元素
      list.push(seriesInfo) // 添加新元素
      session.setItem(seriesModelsListsSession, list)
    } else {
      // 如果不存在相同imageId的元素，则直接添加新元素
      list.push(seriesInfo)
      session.setItem(seriesModelsListsSession, list)
    }
  } else {
    session.setItem(seriesModelsListsSession, [seriesInfo])
  }
}

export function changeSeriesListWindowsToSession(
  seriesInfoWindows: SeriesInfoWindows,
  index: number
) {
  const session = storageSession()
  if (session.getItem(seriesListWindowsSession)) {
    const list: (SeriesInfoWindows | 0)[] = session.getItem(seriesListWindowsSession)
    if (JSON.stringify(list[index]) != JSON.stringify(seriesInfoWindows)) {
      list[index] = seriesInfoWindows
      session.setItem(seriesListWindowsSession, list)
    }
  } else {
    const list: (SeriesInfoWindows | 0)[] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    list[index] = seriesInfoWindows
    session.setItem(seriesListWindowsSession, list)
  }
}
