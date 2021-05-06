import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from '@/request/request';

export function getHonorList(params = {}) {
  return getRequest({
    url: '/workplace/mien_of_garden/honor',
    params
  });
}
/* -------------------- 后面的路径为待办 (TODO) -------------------------------------- */
export function addHonor(body = {}) {
  return postRequest('/workplace/mien_of_garden/teamedit', body);
}

export function getEditHonorInfo(params = {}) {
  return getRequest({
    url: '/workplace/mien_of_garden/teamedit',
    params
  });
}

export function editHonorInfo(body = {}) {
  return putRequest('/workplace/mien_of_garden/teamedit', body);
}

export function deleteHonorInfo(params = {}) {
  return deleteRequest({
    url: '/workplace/mien_of_garden/teamforbid',
    params
  });
}