<template>
  <Querymenu>
    <div slot="first" class="first">
      <select-menu
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
      <Input
        :placeholder="searchPlaceholder"
        v-model="inputKeyword"
        @on-blur="getKeyword"
      />
    </div>
    <div slot="second" class="second">
      <Button
        v-for="(item, index) in operations"
        :key="index"
        :type="item.type"
        @click.native="handleAll(item.tag)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div slot="third" class="third">
      <Button type="success" @click.native="handleAdd">
        新建工作总结
        <Icon type="md-add" />
      </Button>
    </div>
  </Querymenu>
</template>

<script>
// ? import components
// ? 1. query-menu
import Querymenu from '@common/query-menu';
// ? 2. select-menu
import { SelectMenu } from '@common/select-menu';

// ? import mixins
import getClassMixins from '@/mixins/Common/getClassMixins';

export default {
  name: 'WorkSumaryQueryMenu',
  components: {
    Querymenu,
    SelectMenu
    // SearchContent
  },
  mixins: [getClassMixins],
  data: () => ({
    inputKeyword: '',
    searchPlaceholder: '请输入标题关键字',
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
    params: {}
  }),
  watch: {
    currentClassId(newVal) {
      if (newVal > 0) {
        this.params.classId = newVal;
      } else delete this.params.classId;
    }
  },
  methods: {
    getKeyword(e) {
      const { value } = e.target;
      value.length ? (this.params.title = value) : delete this.params.title;
    },
    handleAll(tag) {
      switch (tag) {
        case '查询':
          this.handleSearch();
          break;
        case '删除':
          this.handleDelete();
          break;
      }
    },
    handleSearch() {
      const params = Object.assign({}, this.params, { page_size: 20 });
      this.$emit('handleSearch', params);
    },
    handleDelete() {
      this.$emit('handleDelete');
    },
    handleAdd() {
      this.$emit('handleAdd');
    }
  }
};
</script>

<style lang="less" scoped>
.flex-common {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.query-menu {
  background-color: #fff;
  color: #666;
  margin-top: 1.2rem;
  .flex-common;
  .first {
    flex: 1;
    .flex-common;
    padding: 1.2rem 0;
    .ivu-input-wrapper {
      margin: 0 3rem;
    }
  }
  .second {
    flex: 1;
    padding: 1.2rem 0;
    .ivu-btn {
      margin-left: 0.6rem;
      width: 5rem;
    }
  }
  .third {
    flex: 1;
    margin-top: 0.2rem;
    .flex-common;
    .ivu-btn {
      width: 7.6rem;
    }
  }
}
</style>
