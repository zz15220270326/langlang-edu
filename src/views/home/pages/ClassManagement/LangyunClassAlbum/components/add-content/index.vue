<template>
  <div class="add-content">
    <div class="ablum-name">
      <div class="tag">
        <Tag color="lime" size="large">相册名称</Tag>
      </div>
      <div class="content">
        <Input v-model="params.title" placeholder="相册名称 (不超过10个字) " />
      </div>
    </div>
    <div class="categories">
      <div class="tag">
        <Tag color="orange" size="large">相册分类</Tag>
      </div>
      <div class="content">
        <RadioGroup v-model="params.type">
          <Radio label="ChildrenWork">幼儿作品</Radio>
          <Radio label="MienOfActivity">活动风采</Radio>
        </RadioGroup>
      </div>
    </div>
    <div class="current-class">
      <div class="tag">
        <Tag color="blue" size="large">所在班级</Tag>
      </div>
      <div class="content" v-if="classList.length">
        <Select v-model="params.classId" :multiple="false">
          <Option v-for="item of classList" :key="item.id" :value="item.id">
            {{ item.ClassName }}
          </Option>
        </Select>
      </div>
    </div>
    <div class="sync-show">
      <div class="tag">
        <Tag color="pink" size="large">同步显示</Tag>
      </div>
      <div class="content">
        <div class="class-card">
          <Checkbox v-model="params.isShowInClassBoard">
            允许在班牌中显示
          </Checkbox>
          <Select
            v-model="params.classBoardIds"
            :multiple="false"
            :style="{ width: '13rem' }"
          >
            <Option
              v-for="item of classCardList"
              :key="item.id"
              :value="item.id"
            >
              {{ item.ClassName }}
            </Option>
          </Select>
        </div>
        <div class="garden-card">
          <Checkbox v-model="params.isShowInGardenBoard">
            允许在园牌中显示
          </Checkbox>
          <Select
            v-model="params.gardenBoardIds"
            :multiple="true"
            :style="{ width: '9.6rem' }"
          >
            <Option
              v-for="item of gardenCardList"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </Option>
          </Select>
          <Button type="info" @click.native="selectAllGardenInfo">
            全选
          </Button>
          <Button type="warning" @click.native="cancelAllGardenInfo">
            清空
          </Button>
        </div>
      </div>
    </div>
    <btns :operations="operations" @handleBottomOperations="handleOp" />
  </div>
</template>

<script>
import './index.less';
// ? components
import Btns from '@common/modal-bottom-btns';
// ? request
import { getAlbumAdd, addAlbum, editAlbum } from '@/request/class-management';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleErrorCode,
  handleOpResult,
  // ? obj
  deepCopyObj
} from '@/utils';
import { checkParams } from './utils';
// ? bus
import caBus from '../../caBus';
// ? configs
import { mapState } from 'vuex';

export default {
  name: 'AddContent',
  components: { Btns },

  data: () => ({
    classList: [],
    classCardList: [],
    gardenCardList: [],
    params: {
      uid: 0,
      title: '',
      type: 'ChildrenWork',
      classId: 0,
      classBoardIds: '',
      isShowInClassBoard: false, // 0, 1
      gardenBoardIds: [],
      isShowInGardenBoard: false
    },
    // ? operations
    operations: [
      {
        tag: '确认',
        type: 'primary'
      },
      {
        tag: '取消',
        type: 'error'
      }
    ]
  }),
  props: {
    id: {
      type: Number,
      default: -1
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
  computed: {
    ...mapState(['uid'])
  },
  methods: {
    async getAddInfo() {
      const result = await getAlbumAdd(),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        // console.log(dataSource);
        const {
          is_allowed_show_in_class_board,
          is_allowed_show_in_garden_board,
          class_list,
          garden_boards
        } = deepCopyObj(dataSource);
        this.params.isShowInClassBoard =
          is_allowed_show_in_class_board > 0 ? true : false;
        this.params.isShowInGardenBoard =
          is_allowed_show_in_garden_board > 0 ? true : false;
        this.classList = class_list;
        this.classCardList = class_list;
        this.gardenCardList = garden_boards || [];
      } else
        this.$Message.error(
          `请求失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    selectAllGardenInfo() {
      this.params.gardenBoardIds = this.gardenCardList.map(item => item.id);
      this.$Message.info('全选');
    },
    cancelAllGardenInfo() {
      this.params.gardenBoardIds = [];
      this.$Message.info('清空');
    },
    handleOp(btnTag) {
      switch (btnTag) {
        case '确认':
          this.handleSubmit();
          break;
        case '取消':
          this.closeModals();
          break;
      }
    },
    handleSubmit() {
      this.id > 0 ? this.handleEdit() : this.handleAdd();
    },
    handleAdd() {
      const params = deepCopyObj(this.params);
      params.uid = this.uid;
      params.isShowInClassBoard = this.params.isShowInClassBoard ? 1 : 0;
      params.isShowInGardenBoard = this.params.isShowInGardenBoard ? 1 : 0;
      params.gardenBoardIds = this.params.gardenBoardIds.toString();
      if (checkParams(params, this)) {
        this.$Message.info('确认添加');
        this.$Modal.confirm({
          title: '添加相册',
          content: '确认添加',
          onOk: async () => {
            const result = await addAlbum(params);
            this.handleResult(result);
          }
        });
      }
    },
    initEdit({
      uid,
      title,
      type,
      classId,
      classBoardIds,
      isShowInClassBoard,
      gardenBoardIds,
      isShowInGardenBoard
    }) {
      this.params = {
        uid,
        title,
        type,
        classId: parseInt(classId) || 0,
        classBoardIds: parseInt(classBoardIds) || 0,
        isShowInClassBoard: isShowInClassBoard > 0 ? true : false,
        gardenBoardIds: gardenBoardIds.split(',').map(g => parseInt(g)) || [],
        isShowInGardenBoard: isShowInGardenBoard > 0 ? true : false
      };
    },
    async handleEdit() {
      const params = deepCopyObj(this.params);
      params.id = this.id;
      params.uid = this.uid;
      params.isShowInClassBoard = this.params.isShowInClassBoard ? 1 : 0;
      params.isShowInGardenBoard = this.params.isShowInGardenBoard ? 1 : 0;
      params.gardenBoardIds = this.params.gardenBoardIds.toString();
      if (checkParams(params, this)) {
        console.log(params);
        this.$Message.info('确认编辑');
        this.$Modal.confirm({
          title: '编辑相册',
          content: '确认编辑',
          onOk: async () => {
            const result = await editAlbum(params);
            this.handleResult(result);
          }
        });
      }
    },
    handleResult(result) {
      if (handleOpResult(result)) {
        this.$Message.success('操作成功');
        this.$emit('refreshPage');
        caBus.$emit('refreshGetAlbums');
      } else
        this.$Message.error(
          `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
      this.$emit('closeModals');
      const classList = this.classList,
        classCardList = this.classCardList,
        gardenCardList = this.gardenCardList;
      Object.assign(this.$data, this.$options.data());
      this.classList = classList;
      this.classCardList = classCardList;
      this.gardenCardList = gardenCardList;
    },
    closeModals() {
      this.$Message.info('您关闭了本次会话');
      this.$emit('closeModals');
    }
  },
  created() {
    this.getAddInfo();
  }
};
</script>
