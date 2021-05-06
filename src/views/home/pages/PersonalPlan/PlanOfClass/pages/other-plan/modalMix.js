// ? async-functions / mock-data
import {
  // addOtherPlan,
  editOtherPlan
} from '@/request/plan/1-class-plan'

export default {
  data() {
    return {
      // ? modal-data
      createClassId: '',
      // ? add-modal
      isShowAddModal: false,
      inputTitle: '',
      inputContent: '',
      // ?? info-modal
      infoModalTitle: '',
      isShowInfoModal: false,
      infos: {},
      // ?? edit-modal
      editModalTitle: '',
      isShowEditModal: false,
      edits: {},
    }
  },
  methods: {
    // ? modal-functions 
    createPlan() {
      this.$Message.info('创建计划')
      this.isShowAddModal = true
    },
    inputTitleChange(inputValue) {
      this.inputTitle = inputValue
    },
    inputContentChange(inputValue) {
      this.inputContent = inputValue
    },
    getCreateClassId(classId) {
      this.createClassId = classId
    },
    confirmEditPlan(params) {
      this.$Modal.confirm({
        title: '编辑',
        content: '是否更新内容?',
        onOk: async () => {
          const {
            id,
            classId,
            title,
            content
          } = params
          // editOtherPlan
          const result = await editOtherPlan(id, classId, title, content)
          if (result.status === 'Success') {
            this.$Message.success('编辑成功')
            this.getOtherPlanInfo()
            this.isShowEditModal = false
          } else {
            if (result.msg) {
              this.$Message.error(result.msg)
            }
            // this.$Message.error('编辑失败, 请稍后再试!')
          }
        },
        onCancel: () => {
          this.$Message.info('您取消了本次编辑操作')
          this.isShowEditModal = false
        },
      })
    },
    closeModals() {
      this.isShowAddModal = false
      this.isShowInfoModal = false
      this.isShowEditModal = false
    }
  },
  created() {}
}