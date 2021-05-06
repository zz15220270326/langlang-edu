export function handleNoticeStatus(status) {
  switch (status) {
    case 1:
      return [
        {
          tag: '详情',
          type: 'info'
        }
      ];
    case 2:
      return [
        {
          tag: '预览',
          type: 'info'
        },
        {
          tag: '发布',
          type: 'success'
        }
      ];
    default:
      return [
        {
          tag: '未知',
          type: 'warning'
        }
      ];
  }
}

export function handleIsTopCode(text) {
  switch (text) {
    case '是':
      return 1;
    case '否':
      return 0;
    default:
      return -1;
  }
}

export function handleUserOp(isTop = 0, status = 1) {
  const operations = [];
  if (status === 2) {
    operations.push({
      tag: '编辑',
      type: 'primary',
      icon: 'ios-build-outline'
    });
  }
  operations.push({
    tag: '删除',
    type: 'error',
    icon: 'ios-trash-outline'
  });
  isTop === 0
    ? operations.push({
      tag: '置顶',
      type: 'success',
      icon: 'ios-arrow-up'
    })
    : isTop === 1
      ? operations.push({
        tag: '取消置顶',
        type: 'warning',
        icon: 'ios-arrow-down'
      })
      : operations.push({ tag: 'unknown', type: 'default', icon: '' });
  return operations;
}

export function getOperationsByStatus(status = 0) {
  switch (status) {
    case 0:
      return [];
    case 1:
      return [
        {
          tag: '详情',
          type: 'info'
        }];
    case 2:
      return [
        {
          tag: '预览',
          type: 'info'
        },
        {
          tag: '发布',
          type: 'success'
        }
      ];
    default:
      return [];
  }
}