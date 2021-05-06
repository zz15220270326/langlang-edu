<template>
  <div class="add-cookbook">
    <add-menu
      @handleUploadYear="getYear"
      @uploadSemester="getSemester"
      @uploadWeekTime="getWeek"
    />
    <select-day />
    <add-content @emitContent="getContent" />
    <btns :operations="operations" @handleBottomOperations="handleOperations" />
  </div>
</template>

<script>
import './index.less'
// ? import components
import AddMenu from './AddMenu';
import SelectDay from './SelectDay';
import AddContent from './AddContent';
import Btns from '@common/modal-bottom-btns';

// ? request
import { addMenuInfo, editMenuInfo } from '@/request/health-care';
// ? utils
import { handleOpResult } from '@/utils';
import { editContent } from '../../myUtils';

export default {
  name: 'AddCookbook',
  components: {
    AddMenu,
    SelectDay,
    AddContent,

    Btns
  },
  data: () => ({
    // ? 规划食谱 - 表格
    titleList: [
      {
        title: '食谱类型',
        slot: 'type',
        align: 'center',
        width: 250
      },
      {
        title: '菜肴/人(克)',
        slot: 'content',
        align: 'center',
        width: 420
      }
    ],
    dataList: [],
    operations: [
      {
        tag: '确认',
        type: 'success'
      },
      {
        tag: '取消',
        type: 'error'
      },
      {
        tag: '初始化',
        type: 'info'
      }
    ],
    // ? 上传数据的参数
    params: {}
  }),
  props: {
    id: {
      type: Number,
      default: -1
    },
    content: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    id(newVal) {
      if (newVal > 0) {
        this.params.id = newVal;
        this.params.content = JSON.stringify(this.content);
      } else this.initParams();
    }
  },
  methods: {
    // ? menu-functions
    addContentItem(dataListIndex) {
      let newItem = {
        content: ''
      };
      this.dataList[dataListIndex].content.push(newItem);
    },
    deleteItem(dataListIndex, contentIndex) {
      this.dataList[dataListIndex].content.splice(contentIndex, 1);
    },
    // ? setParams
    initParams() {
      this.params.content = JSON.stringify(editContent);
    },
    getYear(year) {
      if (year !== '' && year !== '选择学年') {
        this.params.year = year;
      } else {
        delete this.params.year;
      }
    },
    getSemester(semester) {
      if (semester > 0) {
        this.params.semester = semester;
      } else delete this.params.semester;
    },
    getWeek(week) {
      if (week > 0) {
        this.params.week = week;
      } else delete this.params.week;
    },
    getContent(content) {
      this.params.content = content;
    },
    handleOperations(btnTag) {
      switch (btnTag) {
        case '确认':
          this.handleSubmit();
          break;
        case '取消':
          this.handleCancel();
          break;
        case '初始化':
          this.handleInit();
      }
    },
    handleSubmit() {
      if (this.checkSelect()) {
        this.$Modal.confirm({
          title: this.id < 0 ? '创建内容' : '编辑内容',
          content: '',
          onOk: () => (this.id < 0 ? this.confirmAdd() : this.confirmEdit())
          // ,onCancel: () => this.handleCancel()
        });
      }
    },
    async confirmAdd() {
      const { params } = this;
      const result = await addMenuInfo(params);
      if (handleOpResult(result)) {
        this.$Message.success('新增成功');
        this.$bus.$emit('initAMContent');
        this.$emit('refreshWCB');
      } else {
        this.$Message.error('操作失败, 请稍后重试');
      }
      this.$emit('closeModals');
    },
    async confirmEdit() {
      const { params } = this;
      const result = await editMenuInfo(params);
      if (handleOpResult(result)) {
        this.$Message.success('编辑成功');
        this.$bus.$emit('initAMContent');
        this.$emit('refreshWCB');
      } else {
        this.$Message.error('操作失败, 请稍后重试');
      }
      this.$emit('closeModals');
    },
    checkSelect() {
      if (!this.params.year) {
        this.$Message.warning('请选择学年信息');
        return false;
      }
      if (!this.params.semester) {
        this.$Message.warning('请选择学期');
        return false;
      }
      if (!this.params.week) {
        this.$Message.warning('请选择周次');
        return false;
      }
      return true;
    },
    handleInit() {
      this.$Modal.confirm({
        title: '初始化数据',
        content: '确认操作',
        onOk: () => {
          // this.initParams()
          this.$bus.$emit('initAddMenu');
          this.$bus.$emit('initAMContent');
        }
      });
    },
    handleCancel() {
      this.$Message.info('您取消了本次操作');
      this.$emit('closeModals');
    },
    getEditContent() {
      this.$bus.$on('getEditContent', params => {
        const { content } = params;
        this.params.content = JSON.stringify(content);
      });
    }
  },
  created() {
    this.initParams();
  },
  mounted() {
    this.getEditContent();
  }
};
</script>

