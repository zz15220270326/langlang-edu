import {
  deleteRequest
} from '@/request/request'

// ? 废弃
export default function deletePlan(id) {
  return deleteRequest({
    url: '/workplace/personal_plan/del_plan',
    params: {
      id
    }
  })
}

// ? 根据id删除 (批量删除时用','分隔开)
/**
 *   @Iparams
 * ! id (int / string): 列表id
 */