import { Modal } from 'view-design';

function exportTableByComponent(vueComponent) {
  Modal.confirm({
    render: h => {
      return h('Input', {
        props: {
          value: vueComponent.tableName,
          placeholder: '请输入表格的名称(导出为excel格式)'
        },
        on: {
          input: val => (vueComponent.tableName = val)
        }
      });
    },
    onOk: () => {
      const filterData = vueComponent.selectItem.filter(item =>
        vueComponent.dataList.filter(data => data.infantId === item.infantId)
      ),
        filterColumns = vueComponent.titleList.filter(
          (title, index) => index < vueComponent.titleList.length - 1
        );
      vueComponent.crtTable.exportCsv({
        original: false,
        data: filterData,
        columns: filterColumns,
        filename: vueComponent.tableName
      })
    }
  });
}

function handlePropItem(vueComponent, uid) {
  const selectItem = vueComponent.dataList.find(item => item.id === uid);
  return {
    id: uid,
    uid,
    username: selectItem.realname,
    mobile: selectItem.mobile,
    sex: selectItem.sex,
    manageClass: selectItem.manageClass,
    roleName: selectItem.name,
    card: selectItem.card || '',
    birthday: selectItem.birthday,
    hiredate: selectItem.hiredate || '',
    motto: selectItem.motto || '',
    honor: selectItem.honor || '',
  };
}

export {
  exportTableByComponent,
  handlePropItem,
};