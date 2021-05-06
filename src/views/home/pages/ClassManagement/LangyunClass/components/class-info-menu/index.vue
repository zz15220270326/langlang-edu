<template>
  <querymenu>
    <div slot="first" class="select-grade">
      <select-menu
        :listTitle="gradeTitle"
        :listItems="gradeList"
        @handleSelect="selectGrade"
      />
    </div>
    <div slot="second" class="operations">
      <Button
        v-for="(item, key) in operations"
        :key="key"
        :type="item.type"
        @click.native="handleOperations(item.tag)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div slot="third" class="add">
      <Button type="success" @click.native="handleAddModal">添加班级</Button>
    </div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
import { SelectMenu } from '@common/select-menu';

// ? utils
import { deepCopyObj } from '@/utils';

// ? import mixins
import gradeMixins from '@/mixins/Common/gradeMixins';

export default {
  name: 'ClassInfoMenu',

  components: {
    Querymenu,
    SelectMenu
  },

  mixins: [gradeMixins],

  data: () => ({
    operations: [
      {
        tag: '查询',
        type: 'primary'
      },
      {
        tag: '删除',
        type: 'error'
      }
    ],
    params: {
      pageSize: 20
    }
  }),

  watch: {
    currentGrade(newGrade) {
      newGrade > 0 ? (this.params.grade = newGrade) : delete this.params.grade;
    }
  },

  methods: {
    handleOperations(btnTag = '') {
      switch (btnTag) {
        case '查询':
          this.handleSearch();
          break;
        case '删除':
          this.handleDelete();
      }
    },
    handleSearch() {
      const params = deepCopyObj(this.params);
      this.$emit('handleSearch', params);
    },
    handleDelete() {
      this.$emit('deleteItems');
    },
    handleAddModal() {
      this.$emit('handleAddModal');
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
  padding: 4/5rem 0;
  background-color: #ffffff;
  .full_flex();
  .select-grade {
    flex: 1;
    .full_flex();
  }
  .operations {
    flex: 1;
    .ivu-btn {
      width: 6rem;
      margin: 0 0.75rem;
    }
  }
  .add {
    flex: 3;
    text-align: right;
    padding-right: 3.2rem;
    .ivu-btn {
      width: 6rem;
    }
  }
}
</style>
