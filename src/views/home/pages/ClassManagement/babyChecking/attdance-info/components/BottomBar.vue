<template>
  <div class="bottom-wrapper">
    <div class="desc">
      备注：“√”代表出勤，“o”代表缺勤，“×”代表病假，“－”代表事假，“?”代表未设置
    </div>
    <div class="attdence-percent">
      <Tag
        size="large"
        :color="
          attdencePercent < 20
            ? 'error'
            : attdencePercent < 50
            ? 'warning'
            : 'success'
        "
      >
        考勤率 (月) {{ attdencePercent }}%
      </Tag>
    </div>
    <div class="total">
      <Tag
        size="large"
        :color="total < 10 ? 'success' : total < 30 ? 'warning' : 'error'"
      >
        幼儿数量: {{ total }}位
      </Tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomBar',
  props: {
    attdencePercent: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="less" scoped>
.bottom-wrapper {
  width: 100%;
  .desc {
    width: 50%;
    float: left;
    padding: 1.2rem 0;
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
  }
  .attdence-percent {
    width: 25%;
    float: left;
    padding: 1.2rem 0;
    position: relative;
    bottom: 0.3rem;
    left: 2rem;
    .ivu-tag {
      font-size: 1.2rem;
      padding: 0 0.8rem;
    }
  }
  .total {
    width: 25%;
    float: left;
    padding: 1.2rem 0;
    position: relative;
    bottom: 0.3rem;
    left: 2rem;
    .ivu-tag {
      font-size: 1.2rem;
      padding: 0 0.8rem;
    }
  }
}
</style>
