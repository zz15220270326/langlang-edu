<template>
  <querymenu>
    <div slot="first" class="select">
      <select-menu
        :listTitle="typeTitle"
        :listItems="typeList"
        @handleSelect="switchType"
      />
    </div>
    <div slot="second" class="input">
      <Input v-model="input" placeholder="请输入搜索的内容" />
    </div>
    <div slot="third" class="operations">
      <Button
        v-for="item in operations"
        :key="item.tag"
        :type="item.type"
        @click.native="handleOp(item.tag)"
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

// ? menus

export default {
  name: 'UploadMenu',
  components: {
    Querymenu,
    SelectMenu
  },
  data: () => ({
    typeTitle: '',
    typeList: [],
    typeId: 0,
    input: '',
    operations: [
      {
        tag: '查询',
        type: 'primary'
      },
      {
        tag: '删除',
        type: 'error'
      }
    ]
  }),
  props: {
    typeInfos: {
      type: [Array, Object],
      default: () => []
    }
  },
  watch: {
    typeInfos(newVal) {
      if (newVal.length > 0) {
        this.setTypeInfo(newVal);
      }
    }
  },
  methods: {
    setTypeInfo(types = []) {
      this.typeList = [];
      this.typeList[0] = {
        key: 0,
        info: '请选择类别',
        tId: 0
      };
      types.forEach((t, ti) => {
        this.typeList.push({
          key: ti + 1,
          info: t.name,
          tId: t.id
        });
      });
      this.typeTitle = this.typeList[0].info;
      this.typeId = this.typeList[0].tId;
    },
    switchType({ info, tId }) {
      this.typeTitle = info;
      this.typeId = tId;
    },
    handleOp(btnTag) {
      switch (btnTag) {
        case '查询':
          this.handleSearch();
          break;
        case '删除':
          this.handleDeleteItems();
          break;
      }
    },
    handleSearch() {
      const params = { pageSize: 7 };
      this.typeId > 0 ? (params.typeId = this.typeId) : delete params.typeId;
      this.input.length ? (params.name = this.input) : delete params.name;
      this.$emit('handleSearch', params);
    },
    handleDeleteItems() {
      this.$emit('deleteItems');
    }
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
  padding: 0.3rem 0;
  .full_flex();
  .select {
    flex: 1;
    .full_flex();
  }
  .input {
    flex: 2;
  }
  .operations {
    flex: 2;
    .full_flex();
    .ivu-btn {
      margin: 0 0.8rem;
      width: 5.3rem;
    }
  }
}
</style>
