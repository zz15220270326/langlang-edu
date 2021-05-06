<template>
  <!-- 闸机列表 -->
  <div class="gate-list">
    <s-m-table
      :tableIsLoading="tableIsLoading"
      :titleList="titleList"
      :dataList="dataList"
    />
    <bottom-account :total="total" />
    <Page :total="total" show-elevator />
  </div>
</template>

<script>
// ? import components
import SMTable from 'HomePage/SystemManagement/SMTable';

import BottomAccount from '@common/bottom-account';

// ? import mixins
import getGateListMix from './getGateListMix';

export default {
  name: 'GateList',

  components: {
    SMTable,

    BottomAccount
  },
  mixins: [getGateListMix],
  data: () => ({}),
  props: {},
  computed: {},
  methods: {}
};
</script>

<style lang="less" scoped>
.gate-list {
  text-align: center;
}
</style>
