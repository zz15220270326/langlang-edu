<template>
  <querymenu>
    <div slot="first" class="search">
      <select-menu
        :listTitle="gardenCardTitle"
        :listItems="gardenCardList"
        @handleSelect="selectGardenCard"
      />
      <Button type="primary" @click.native="handleSearch">
        查询
      </Button>
    </div>
    <div slot="second" class="operations">
      <Button
        v-for="(itm, idx) in operations"
        :key="itm.tag"
        :type="itm.type"
        @click.native="handleOperations(idx)"
      >
        {{ itm.tag }}
      </Button>
    </div>
  </querymenu>
</template>

<script>
// ? components
import Querymenu from '@common/query-menu';
import { SelectMenu } from '@common/select-menu';
// ? request
import { getVideoGardenBoardList } from '@/request/system-management';
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
  name: 'GardenCardMenu',
  components: {
    Querymenu,
    SelectMenu
  },
  data: () => ({
    gardenCardTitle: '',
    gardenCardList: [],
    preBoardId: 0,
    boardId: 0,
    operations: [
      {
        tag: '排序',
        type: 'success'
      },
      {
        tag: '顺序播放',
        type: 'primary'
      },
      {
        tag: '移出',
        type: 'error'
      }
    ]
  }),
  props: {
    varifyValue: [String, Number]
  },
  watch: {
    varifyValue(newVal) {
      newVal.length && this.getGardenBoard();
    },
    boardId(newVal) {
      this.preBoardId = newVal || 0;
    }
  },
  methods: {
    async getGardenBoard(params = {}) {
      const result = await getVideoGardenBoardList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { gardenBoardList, data } = deepCopyObj(dataSource);
        this.gardenCardList = [];
        gardenBoardList.length && this.setGardenBoard(gardenBoardList);
        this.setDataContent(data);
      }
    },
    setGardenBoard(list) {
      // this.gardenCardList[0] = {
      //   key: 0,
      //   boardId: 0,
      //   info: '请选择园牌'
      // };
      list.forEach((g, gi) => {
        this.gardenCardList.push({
          key: gi + 1,
          boardId: g.id,
          info: g.name
        });
      });
      this.gardenCardTitle = this.gardenCardList[0].info;
      this.boardId = this.gardenCardList[0].boardId;
    },
    selectGardenCard({ info, boardId }) {
      this.gardenCardTitle = info;
      this.boardId = boardId;
    },
    setDataContent(data) {
      if (!this.preBoardId) {
        this.$emit('setDataContent', data, this.boardId);
      } else this.$emit('setDataContent', data, this.preBoardId);
    },
    handleSearch() {
      this.getGardenBoard({ boardId: this.boardId });
    },
    handleOperations(btnIdx) {
      switch (btnIdx) {
        case 0:
          this.handleSort();
          break;
        case 1:
          this.handlePlayByOrder();
          break;
        case 2:
          this.handleRemovePlay();
          break;
        default:
          break;
      }
    },
    handleSort() {
      this.$Modal.confirm({
        title: '视频排序',
        content: '确认操作 ?',
        onOk: () => this.$emit('handleSort')
      });
    },
    handlePlayByOrder() {
      this.$emit('handlePlayByOrder');
    },
    handleRemovePlay() {
      const boardId = this.$parent.$data.crtId || 0;
      this.$emit('handleRemovePlay', boardId);
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  created() {
    this.getGardenBoard();
  }
};
</script>

<style lang="less" scoped>
.full_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.query-menu {
  padding: 0.8rem 0;
  .full_flex();
  .search {
    flex: 3;
  }
  .operations {
    flex: 2;
  }
  .ivu-btn {
    width: 5.4rem;
    margin: 0 0.8rem;
  }
}
</style>
