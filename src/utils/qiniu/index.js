import {
  getPicById
} from '@/request/Common'
import {
  getDataSource,
  checkDataSource
} from '../request'
import {
  deepCopyObj
} from '../object'

// ? images
export async function getIcon(icon) {
  const result = await getPicById({
    icon
  })
  // console.log(result)
  const dataSource = getDataSource(result)
  if (checkDataSource(dataSource)) {
    const data = deepCopyObj(dataSource)
    return data
  } else return null
}