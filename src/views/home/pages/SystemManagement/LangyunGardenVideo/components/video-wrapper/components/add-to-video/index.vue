<template>
  <div class="add-to-list">
    <div class="main">
      <div class="list-item">
        <div class="tag">
          <Tag color="green" size="large">
            班牌播放列表:
          </Tag>
        </div>
        <div class="content">
          <Select v-model="crtClasses" :multiple="true">
            <Option v-for="c of classList" :key="c.classId" :value="c.classId">
              {{ c.info }}
            </Option>
          </Select>
        </div>
        <div class="btn-group">
          <Button type="info" @click.native="selectAllClass">全选</Button>
          <Button type="warning" @click.native="clearAllClass">清空</Button>
        </div>
      </div>
      <div class="list-item">
        <div class="tag">
          <Tag color="purple" size="large">
            园牌播放列表
          </Tag>
        </div>
        <div class="content">
          <Select v-model="crtGardens" :multiple="true">
            <Option
              v-for="g of gardenList"
              :key="g.gardenId"
              :value="g.gardenId"
            >
              {{ g.info }}
            </Option>
          </Select>
        </div>
        <div class="btn-group">
          <Button type="info" @click.native="selectAllGarden">全选</Button>
          <Button type="warning" @click.native="clearAllGarden">清空</Button>
        </div>
      </div>
    </div>
    <div class="bottom">
      <Button type="success" size="large" @click.native="handleSubmit">
        提交
      </Button>
      <Button type="error" size="large" @click.native="handleCancel">
        取消
      </Button>
    </div>
  </div>
</template>

<script>
import './index.less';
// ? components

// ? request
import {
  getVideoClassBoardList,
  getVideoGardenBoardList
  // editVideoInfo
} from '@/request/system-management';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  // handleOpResult,
  // ? arr / obj
  deepCopyObj
} from '@/utils';

export default {
  name: 'AddToList',
  components: {},
  data: () => ({
    classList: [],
    gardenList: [],
    crtGardens: [],
    crtClasses: []
  }),
  props: {
    vid: {
      type: [Number, String],
      default: 0
    },
    propItem: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    propItem(newVal) {
      Object.keys(newVal).length && this.initEdit(newVal);
    }
  },
  computed: {},
  methods: {
    initEdit({ checkedClasses, checkedGardenBoards }) {
      this.crtClasses = checkedClasses;
      this.crtGardens = checkedGardenBoards;
    },
    async getClassBoards(params = {}) {
      const result = await getVideoClassBoardList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { classList } = deepCopyObj(dataSource);
        this.classList = [];
        classList.length && this.setClassList(classList);
      }
    },
    setClassList(list) {
      list.forEach((c, ci) => {
        this.classList.push({
          key: ci + 1,
          classId: c.id,
          info: c.ClassName
        });
      });
    },
    selectAllClass() {
      this.crtClasses = this.classList.map(c => c.classId);
      this.$Message.info('已选择全部班牌');
    },
    clearAllClass() {
      this.crtClasses = [];
      this.$Message.info('已清空全部班牌');
    },
    async getGardenBoards(params = {}) {
      const result = await getVideoGardenBoardList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { gardenBoardList } = deepCopyObj(dataSource);
        this.gardenList = [];
        gardenBoardList.length && this.setGardenList(gardenBoardList);
      }
    },
    setGardenList(list = []) {
      list.forEach((g, gi) => {
        this.gardenList.push({
          key: gi + 1,
          gardenId: g.id,
          info: g.name
        });
      });
    },
    selectAllGarden() {
      this.crtGardens = this.gardenList.map(g => g.gardenId);
      this.$Message.info('已选择全部园牌');
    },
    clearAllGarden() {
      this.crtGardens = [];
      this.$Message.info('已清空全部园牌');
    },
    async handleSubmit() {
      if (!this.crtClasses.length && !this.crtGardens.length) {
        this.$Message.warning('请选择要上传的位置!');
        return;
      }
      this.$Modal.confirm({
        title: '编辑班牌和园牌的内容',
        content: '确认操作 ?',
        onOk: () => {
          const params = {
            classBoardIds: this.crtClasses.toString(),
            gardenBoards: this.crtGardens.toString()
          };
          this.confirmEdit(params);
        }
      });
    },
    confirmEdit(params) {
      this.$emit('uploadToBoards', params);
    },
    handleCancel() {
      this.$Message.warning('您取消了本次的操作');
      this.$emit('handleCancel');
    }
  },
  created() {
    this.getClassBoards();
    this.getGardenBoards();
  }
};
</script>
