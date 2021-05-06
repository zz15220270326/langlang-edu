import { getRequest } from '@/request/request';

/**
 * @description
 * * 1.健康看板-列表
 */
export function getHealthStatus(params = {}) {
  return getRequest({
    // url: '/workplace/garden_overview/status',
    // url: '/workplace/overview/status',
    url: '/workplace/health_stats/index',
    params
  });
}
