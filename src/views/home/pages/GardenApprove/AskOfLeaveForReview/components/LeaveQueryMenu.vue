<template>
  <querymenu>
    <div slot="first" class="approve-status">
      <Button
        v-for="(item, key) in operations"
        :key="key"
        :type="item.type"
        @click.native="getTableByStatus(key)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div slot="second" class="select-class">
      <select-menu
        :listTitle="classTitle || '暂无内容'"
        :listItems="classList"
        @handleSelect="selectClass"
      />
    </div>
    <div slot="third" class="input-child">
      <Input v-model="infantName" placeholder="请输入幼儿姓名" />
    </div>
    <div slot="third" class="search-button">
      <search-button @click.native="getTableByClick" />
    </div>
  </querymenu>
</template>

<script>
import { SelectMenu } from '@common/select-menu';
import SearchButton from '@common/search-button';
// ? common components
import Querymenu from '@common/query-menu';

// ? import mixins
import getClassMixins from '@/mixins/Common/getClassMixins';

export default {
  name: 'LeaveQuerymenu',
  components: {
    Querymenu,
    SelectMenu,

    SearchButton
  },
  mixins: [getClassMixins],
  props: {
    approveStatus: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    statusIdx: 0,
    infantName: '',
    operations: [
      {
        tag: '待审批',
        type: 'info'
      },
      {
        tag: '已审批',
        type: 'default'
      }
    ]
  }),
  methods: {
    getTableByStatus(statusIdx) {
      this.statusIdx = statusIdx;
      this.operations.forEach((item, index) =>
        index === statusIdx ? (item.type = 'info') : (item.type = 'default')
      );
      const params = {
        isRemarked: this.statusIdx,
        page_size: 20
      };
      this.classTitle = this.classList[0].info;
      this.currentClassId = this.classList[0].classId;
      this.infantName = '';
      this.$emit('getTableByStatus', params);
    },
    getTableByClick() {
      const params = {
        page_size: 20
      };
      params.isRemarked = this.statusIdx;
      if (this.currentClassId) {
        params.classId = this.currentClassId;
      }
      if (this.infantName !== '') {
        params.infantName = this.infantName;
      }
      this.$emit('getTableByClick', params);
    }
  }
};
</script>

<style lang="less" scoped>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.query-menu {
  margin: 1.2rem 0;
  padding: 0.8rem 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .approve-status {
    flex: 1.2;
    .flex-center;
    justify-content: space-evenly;
    .ivu-btn {
      width: 5.6rem;
    }
  }
  .select-class {
    flex: 1;
    .flex-center;
  }
  .input-child {
    flex: 1;
    .flex-center;
  }
  .search-button {
    flex: 5;
  }
}
</style>
