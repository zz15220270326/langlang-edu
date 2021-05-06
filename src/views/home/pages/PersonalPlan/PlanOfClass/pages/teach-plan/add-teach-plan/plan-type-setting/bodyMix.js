// ? async-functions / mock-data
import { getPlanTypeInfo, editPlanType } from '@/request/plan/1-class-plan';

import { deletePlanType } from '@/request/plan/1-class-plan';

// ? utils
import { getDataSource, checkDataSource } from '@/utils';
// ? bus
import tpcBus from '../teach-plan-content/tpcBus';

export default {
  data() {
    return {
      // ? body
      tableIsLoading: false,
      titleList: [
        {
          title: '类型',
          key: 'name',
          align: 'center',
          width: '150'
        },
        {
          title: '操作',
          slot: 'operations',
          align: 'center',
          width: '450'
        }
      ],
      dataList: [],
      total: 0,
      pageSize: 0,
      editType: ''
    }
  },
  methods: {
    // ? content-functions
    async getPlanTypeData(params = {}) {
      this.tableIsLoading = true;
      const result = await getPlanTypeInfo(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        // console.log(dataSource)
        if (dataSource.total) {
          this.total = dataSource.total;
        }
        if (dataSource.page_size) {
          this.pageSize = dataSource.page_size;
        }
        const { list } = dataSource;
        this.dataList = [];
        list.length > 0 && this.setDataList(list);
      } else {
        this.$Message.error('请求数据失败, 请稍后再试');
      }
      this.tableIsLoading = false;
    },
    setDataList(list) {
      list.forEach(item => {
        this.dataList.push({
          id: item.id,
          gardenId: item.garden_id,
          type: item.type,
          name: item.name,
          ableDelete: item.used === 1 ? false : true,
          operations: [{
            tag: '编辑',
            type: 'primary'
          },
          {
            tag: '删除',
            type: 'error'
          }
          ]
        });
      });
      this.setTypeList(list);
    },
    setTypeList(list) {
      const typeList = [];
      list.forEach(item => {
        typeList.push({
          value: item.id,
          label: item.name
        });
      });
      tpcBus.$emit('getTypeList', typeList)
    },
    handleType(currentIndex, currentType) {
      switch (currentType) {
        case 'primary':
          this.$Message.info('点击进行编辑');
          setTimeout(() => {
            this.$Modal.confirm({
              render: h => {
                return h('Input', {
                  props: {
                    placeholder: `请填写计划类型, 原类型: ${this.dataList[currentIndex].type}`
                  },
                  on: {
                    input: value => {
                      this.editType = value
                    }
                  }
                })
              },
              okText: '确认编辑',
              cancelText: '取消操作',
              onOk: () => this.confirmEdit(currentIndex),
              onCancel: () => this.cancelEdit()
            })
          }, 200);
          break
        case 'error':
          this.$Modal.confirm({
            title: '删除选项',
            content: '确认删除?',
            onOk: () => this.confirmDelete(currentIndex),
            onCancel: () => this.$Message.info('您取消了删除操作')
          });
          break;
        case 'info':
          this.$Modal.confirm({
            title: '添加选项',
            content: '确认添加?',
            onOk: () => this.confirmAdd(currentIndex),
            onCancel: () => this.$Message.info('您取消了添加操作')
          });
      }
    },
    async confirmDelete(currentIndex) {
      const { id } = this.dataList[currentIndex],
        result = await deletePlanType({ id });
      if (result.status === 'Success') {
        this.$Message.success('删除成功');
        this.getPlanTypeData();
      } else {
        this.$Message.error('删除失败');
      }
    },
    async confirmEdit(currentIndex) {
      if (this.editType !== '') {
        // ? 发请求
        const typeId = this.dataList[currentIndex].id.toString();
        const typeName = this.editType;
        const result = await editPlanType(typeId, typeName);
        if (result.status === 'Success') {
          this.$Message.success('编辑成功');
          this.getPlanTypeData();
        } else {
          this.$Message.error('编辑失败');
        }
      } else {
        this.$Message.warning('编辑失败, 编辑内容不得为空');
      }
    },
    async confirmAdd(currentIndex) {
      const typeName = this.dataList[currentIndex].name;
      this.addTypes(typeName);
    },
    cancelEdit() {
      this.$Message.info('您取消了本次操作');
      this.editType = '';
    },
    // ? 分页请求
    changeTableData(params) {
      console.log(params);
      this.getPlanTypeData(params);
    }
  },
  created() {
    this.getPlanTypeData();
  }
}