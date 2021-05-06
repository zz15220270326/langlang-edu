<template>
  <querymenu>
    <div slot="first" class="left">
      <select-menu
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
      <search-button @click.native="handleSearch" />
    </div>
    <div slot="second" class="right">
      <Button type="info" @click.native="handleSetPlan">
        开关机方案设置
      </Button>
      <Button type="error" @click.native="handleClose">一键关机</Button>
    </div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
import { SelectMenu } from '@common/select-menu';
import SearchButton from '@common/search-button';

// ? import mixins
import getClassMixins from '@/mixins/Common/getClassMixins';
// ? bus
import ccBus from './ccBus';

export default {
  name: 'Menu',

  components: {
    Querymenu,
    SelectMenu,
    SearchButton
  },

  mixins: [getClassMixins],

  data: () => ({
    params: {
      pageSize: 20
    }
  }),

  props: {},

  computed: {},

  methods: {
    updateClassList(classInfo = []) {
      this.classList = [{ key: 0, classId: 0, info: '全部班级' }];
      classInfo.forEach((item, index) => {
        this.classList.push({
          key: index + 1,
          info: item.ClassName,
          classId: item.id
        });
      });
      this.classTitle = this.classList[0].info;
      this.currentClassId = this.classList[0].classId;
    },
    getClassInfo() {
      if (this.currentClassId > 0) {
        this.params.classId = this.currentClassId;
      } else delete this.params.classId;
    },
    handleSearch() {
      this.getClassInfo();
      this.$emit('handleSearch', this.params);
    },
    handleSetPlan() {
      this.$emit('handleSetPlan');
    },
    handleClose() {
      this.$emit('handleClose');
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  mounted() {
    ccBus.$on('updateClassList', classInfo => this.updateClassList(classInfo));
  },
  beforeDestroy() {}
};
</script>

<style lang="less" scoped>
.query-menu {
  margin: 0.6rem 0;
  padding: 1rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .left {
    flex: 2;
  }
  .right {
    flex: 3;
    text-align: right;
    padding-right: 1rem;
    .ivu-btn {
      margin: 0 4/5rem;
    }
  }
}
</style>
