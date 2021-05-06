function exportPartTable(crtEl, filename = '默认文件名称') {
  // ? 要同时定义行和列才能条件导出
  const filterData = crtEl.selectItem.filter(item =>
      crtEl.dataList.filter(data => data.infantId === item.infantId)
    ),
    filterColumns = crtEl.titleList.filter(
      (title, index) => index < crtEl.titleList.length - 1
    );
  crtEl.crtTable.exportCsv({
    filename,
    data: filterData,
    columns: filterColumns,
    original: false
  });
}

function getGenderBySex(sex = 0) {
  switch (sex) {
    case 1:
      return '男';
    case 2:
      return '女';
    default:
      return '';
  }
}

function getOperationsByStatus(status = 0) {
  // ? 只有status === 2 方可重新入园
  switch (status) {
    case 2:
      return [
        {
          tag: '详情',
          type: 'info'
        },
        {
          tag: '入园',
          type: 'success'
        },
        {
          tag: '删除',
          type: 'error'
        }
      ];
    default:
      return [
        {
          tag: '详情',
          type: 'info'
        },
        {
          tag: '删除',
          type: 'error'
        }
      ];
  }
}

export {
  exportPartTable,
  getGenderBySex,
  getOperationsByStatus
};