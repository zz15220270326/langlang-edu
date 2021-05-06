import { getRequest } from '@/request/request';

export function getMachineList(params = {}) {
  return getRequest({
    url: '/workplace/manage_of_garden_hardware/indexofgate',
    params
  });
}