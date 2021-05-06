<template>
  <query-menu>
    <div slot="first" class="first">
      <select-menu
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
      <select-menu
        :listTitle="statusTitle"
        :listItems="statusList"
        @handleSelect="getStatus"
      />
    </div>
    <div slot="second" class="second">
      <Button type="primary" @click.native="searchItems"> 查询 </Button>
      <Button type="error" :disabled="false" @click.native="deleteItems">
        删除
      </Button>
    </div>
    <div slot="third" class="third">
      <Button type="success" @click.native="createPlan">
        创建计划
        <Icon type="md-add" />
      </Button>
    </div>
  </query-menu>
</template>

<script>
// ? improt components
// ? 1. query-menu
import QueryMenu from '@common/query-menu';
// ? 2. select-menu
import { SelectMenu } from '@common/select-menu';
// ? import mixins
import getClassMixins from '@/mixins/Common/getClassMixins';
import getStatusMixin from '@/mixins/Common/getStatusMixin';
// import otherMenuMixin from '@/mixins/plan/opMenuMixin'

export default {
  name: 'OtherQueryMenu',
  components: {
    QueryMenu,
    SelectMenu
  },
  mixins: [getClassMixins, getStatusMixin],
  props: {},
  methods: {
    setClassId(params) {
      if (this.currentClassId > 0) {
        params.classId = this.currentClassId;
      } else delete params.classId;
    },
    setRemark(params) {
      if (this.status === 0 || this.status === 1) {
        params.isRemarked = this.status;
      } else delete params.isRemarked;
    },
    searchItems() {
      const params = {};
      this.setClassId(params);
      this.setRemark(params);
      params.page_size = 20;
      this.$emit('handleSearch', params);
    },
    deleteItems() {
      this.$emit('deleteItems');
    },
    createPlan() {
      this.$emit('createPlan');
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
  margin: 1.2rem 0;
  padding: 1.2rem 0;
  background-color: #fff;
  .full_flex();
  .first {
    flex: 1;
    .full_flex();
    .select-menu {
      margin-left: 0.8rem;
    }
  }
  .second {
    flex: 1;
    .ivu-btn {
      margin-left: 0.8rem;
      width: 5rem;
      opacity: 0.9;
    }
  }
  .third {
    flex: 1;
    text-align: right;
    margin-right: 2rem;
    .ivu-btn {
      margin-right: 2rem;
      width: 6.6rem;
      opacity: 0.9;
    }
  }
}
</style>
