<template>
  <div class="garden-health-info">
    <div class="title">园所健康情况</div>
    <div class="content">
      <main-table
        :tableIsLoading="tableIsLoading"
        :titleList="gardenHealthTitleList"
        :dataList="gardenHealthDataList"
      />
    </div>
  </div>
</template>

<script>
// ? import components
import MainTable from 'HomePage/GardenMain/MainTable';
// ? import mixins
import gardenHealthTableMixin from '@/mixins/main/gardenHealthTableMixin';

export default {
  name: 'GardenHealthInfo',

  components: {
    MainTable
  },

  mixins: [gardenHealthTableMixin],

  data: () => ({
    tableIsLoading: false
  }),

  props: {},

  computed: {},

  methods: {}
};
</script>

<style lang="less" scoped>
.garden-health-info {
  color: #666;
  font-size: 1rem;
  width: 100%;
  height: 23rem;
  margin-bottom: 3rem;
  .title {
    font-weight: 600;
    font-size: 1.3rem;
    margin-left: 1.6rem;
    padding: 0.8rem 0;
  }
  .content {
    width: 100%;
    height: 23rem;
    border: 1px solid #36adea;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1.2rem;
  }
}
</style>
