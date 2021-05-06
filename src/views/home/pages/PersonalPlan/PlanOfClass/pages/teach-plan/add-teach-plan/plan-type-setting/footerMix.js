// ? async-functions / mock-data
import { setPlanTypes } from '@/request/plan/1-class-plan'

export default {
  data() {
    return {
      // ? crud-datas
      isShowEditAll: false,
      editModalTitle: '',
      editItems: [], // { typeId: string; typeName: string; }[]
    }
  },
  methods: {
    // ? footer-functions
    handleEdit() {
      this.editItems = []
      this.dataList.forEach(item => {
        this.editItems.push({
          typeId: item.id,
          typeName: item.name
        })
      })
      this.editModalTitle = '批量编辑计划类型'
      this.isShowEditAll = true
    },
    handleAdd() {
      const preAddItems = []
      this.dataList.map(item => {
        if (item.operations[1].tag === '添加') {
          preAddItems.push(item.name)
        }
      })
      if (preAddItems.length === 0) {
        this.$Message.warning('没有需要添加的内容')
      } else {
        this.$Modal.confirm({
          title: '批量添加',
          content: '确认操作?',
          onOk: () => {
            let typeName = preAddItems.toString()
            this.addTypes(typeName)
          },
          onCancel: () => {
            this.$Message.info('您取消了本次批量添加')
          }
        })
      }
    },
    async addTypes(typeName) {
      const result = await setPlanTypes(typeName)
      if (result.status === 'Success') {
        this.$Message.success('添加成功')
        this.getPlanTypeData()
      } else {
        this.$Message.success('添加失败')
      }
    },
    handleCancel() {
      this.$Message.info('您取消了本次操作')
      this.getPlanTypeData()
      this.$emit('cancelPTS')
    },
    closeEditModal(operation) {
      if (operation === 'refresh') {
        this.getPlanTypeData()
      }
      this.isShowEditAll = false
    }
  },
  created() {}
}