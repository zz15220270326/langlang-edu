<template>
  <Querymenu>
    <div slot="first" class="first">
      <select-menu
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
      <select-menu
        :listTitle="yearTitle"
        :listItems="yearList"
        @handleSelect="selectYear"
      />
    </div>
    <div slot="second" class="second">
      <Button
        v-for="(item, key) in operations"
        :key="key"
        :type="item.type"
        @click.native="handleAll(item.tag)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div slot="third" class="third">
      <Button type="success" @click.native="addYearPlan">
        创建年度计划
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
import getYearMixins from '@/mixins/Common/getYearMixins';
import menuCommonMix from '@/mixins/plan/menuCommonMixin';

export default {
  name: 'AllYearQueryMenu',
  components: {
    Querymenu,
    SelectMenu
  },
  mixins: [getClassMixins, getYearMixins, menuCommonMix],
  props: {}
};
</script>

<style lang="less" scoped>
.flex_format() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-item {
  .flex_format();
  padding: 1.2rem 0;
}

.query-menu {
  background-color: #fff;
  color: #666;
  margin: 1.2rem 0;
  .flex_format();
  .first {
    flex: 1;
    .menu-item;
  }
  .second {
    flex: 1;
    margin: 1.2rem 0;
    .ivu-btn {
      margin-left: 0.6rem;
      width: 5.4rem;
    }
  }
  .third {
    flex: 1;
    .menu-item;
    .ivu-btn {
      margin-left: 0.6rem;
      width: 8rem;
    }
  }
}
</style>
