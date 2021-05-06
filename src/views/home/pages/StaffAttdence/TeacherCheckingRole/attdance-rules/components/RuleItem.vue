<template>
  <div class="rule-item">
    <div class="left">
      <slot name="left-tag"></slot>
      <InputNumber
        :max="max1"
        :min="min1"
        :value="value1"
        :editable="enableEdit"
      />
      <slot name="left-time"></slot>
    </div>
    <div class="right" v-if="max2 >= 0">
      <slot name="right-tag"></slot>
      <InputNumber
        :max="max2"
        :min="min2"
        :value="value2"
        :editable="enableEdit"
      />
      <slot name="right-time"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RuleItem',
  props: {
    max1: {
      type: Number,
      default: 0
    },
    min1: {
      type: Number,
      default: 0
    },
    value1: {
      type: Number,
      default: 0
    },

    enableEdit: {
      type: Boolean,
      default: false
    },

    max2: {
      type: Number,
      default: 0
    },
    min2: {
      type: Number,
      default: 0
    },
    value2: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="less" scoped>
.flex-around {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.common-style {
  background-color: #fff;
  height: 3rem;
  margin-top: 1.2rem;
  .flex-around;
  .left {
    flex: 1;
    text-align: center;
  }
  .middle {
    flex: 1;
  }
  .right {
    flex: 1;
  }
}
.rule-item {
  .common-style;
  span {
    margin: 0 1.2rem;
  }
}
</style>
