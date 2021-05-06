// ? async-functions
import { getTeachPlanInfo } from '@/request/plan/1-class-plan';
// ? utils
import {
  getDataSource,
  checkDataSource,
  // ? arr \ boj
  deepCopyObj
} from '@/utils';

export default {
  data() {
    return {
      // ? modal-data
      modalTitle: '',
      // ?? create-modal
      isShowCreateModal: false,
      // ?? info-modal
      isShowDetailModal: false,
      infos: {},
      // ?? edit-modal
      isShowEditModal: false,
      edits: {},
      // ?? copy-modal
      isShowCopyModal: false,
      copys: {}
    };
  },
  methods: {
    // ? modal-functions
    openInfoModal(itemIndex) {
      this.$Message.info('查看详情');
      const {
        planName,
        createTime,
        id
      } = this.dataList[itemIndex];
      this.infos = {
        firstTitle: planName,
        secondTitle: createTime,
        currentId: id
      };
      this.modalTitle = '详情';
      this.isShowDetailModal = true;
    },
    async openEditModal(itemIndex) {
      this.$Message.info(`编辑第${itemIndex + 1}项内容`);
      const { id } = this.dataList[itemIndex],
        result = await getTeachPlanInfo(id),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        console.log(data);
        this.edits = {
          id,
          year: data.year,
          semester: data.semester,
          week: data.week,
          className: this.dataList[itemIndex].className,
          classId: data.ClassId,
          title: parseInt(data.title) || 0,
          // ? 时间计划方案名称和id待定
          content: JSON.parse(data.content)
        };
        console.log(this.edits);
        // ? 使用事件总线派发
        this.$bus.$emit('handleEditTeachPlanInfo', this.edits);
        this.modalTitle = '编辑教学计划';
        this.isShowEditModal = true;
      } else this.$Message.error('获取数据失败, 请稍后再试');
    },
    async handleCopy(itemIndex = 0) {
      this.$Message.info(`复制第${itemIndex + 1}条计划`);
      const { id } = this.dataList[itemIndex],
        result = await getTeachPlanInfo(id),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        console.log(data);
        this.isShowCopyModal = true;
      }
    },
    closeAddModal() {
      this.isShowCreateModal = false;
      this.isShowEditModal = false;
    }
  },
  created() { }
}