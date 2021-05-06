<template>
  <querymenu>
    <div slot="first" class="search">
      <select-menu
        :listTitle="classCardTitle"
        :listItems="classCardList"
        @handleSelect="selectClassCard"
      />
      <Button type="primary" @click.native="handleSearch">
        查询
      </Button>
    </div>
    <div slot="second" class="operations">
      <Button
        v-for="(item, index) in operations"
        :key="item.tag"
        :type="item.type"
        @click.native="handleOperations(index)"
      >
        {{ item.tag }}
      </Button>
    </div>
  </querymenu>
</template>

<script>
// ? components
import Querymenu from '@common/query-menu';
import { SelectMenu } from '@common/select-menu';
// ? request
import { getVideoClassBoardList } from '@/request/system-management';
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
  name: 'ClassCardMenu',
  components: {
    Querymenu,
    SelectMenu
  },
  data: () => ({
    classCardTitle: '',
    classCardList: [],
    preClassId: 0,
    classId: 0,
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
      newVal.length && this.getClassBoard();
    },
    classId(newVal) {
      this.preClassId = newVal || 0;
    }
  },
  methods: {
    async getClassBoard(params = {}) {
      const result = await getVideoClassBoardList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { classList, data } = deepCopyObj(dataSource);
        this.classCardList = [];
        classList.length && this.setClassBoard(classList);
        this.setDataContent(data);
      }
    },
    setClassBoard(list) {
      list.forEach((c, ci) => {
        this.classCardList.push({
          key: ci + 1,
          classId: c.id,
          info: c.ClassName
        });
      });
      this.classCardTitle = this.classCardList[0].info;
      this.classId = this.classCardList[0].classId;
    },
    selectClassCard({ info, classId }) {
      this.classCardTitle = info;
      this.classId = classId;
    },
    setDataContent(data) {
      if (!this.preClassId) {
        this.$emit('setDataContent', data, this.classId);
      } else this.$emit('setDataContent', data, this.preClassId);
    },
    handleSearch() {
      this.getClassBoard({ classId: this.classId });
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
      const classId = this.$parent.$data.crtId || 0;
      this.$emit('handleRemovePlay', classId);
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  created() {
    this.getClassBoard();
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
    .ivu-btn {
      width: 5.4rem;
      margin: 0 0.8rem;
    }
  }
  .operations {
    flex: 2;
    .ivu-btn {
      width: 5.4rem;
      margin: 0 0.8rem;
    }
  }
}
</style>
