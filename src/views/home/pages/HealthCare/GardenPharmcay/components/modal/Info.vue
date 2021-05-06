<template>
  <div class="info">
    <Card :shadow="true">
      <div class="name">
        <div class="tag">幼儿名称:</div>
        <div class="content">{{ infantName }}</div>
      </div>
      <div class="sick-desc">
        <div class="tag">疾病症状:</div>
        <div class="content">{{ malady }}</div>
      </div>
      <div class="drug-name">
        <div class="tag">药物名称:</div>
        <div class="content">{{ drugName }}</div>
      </div>
      <div class="dosage">
        <div class="tag">剂量与服法:</div>
        <div class="content">{{ dosage }}</div>
      </div>
      <div class="drug-time">
        <div class="tag">用药时间:</div>
        <div class="content">{{ useTime }}</div>
      </div>
      <div class="drug-circle">
        <div class="tag">用药周期:</div>
        <div class="content">{{ drugCircle }}</div>
      </div>
      <div class="note">
        <div class="tag">备注:</div>
        <div class="content">{{ comment }}</div>
      </div>
      <div class="time">
        <div class="tag">时间:</div>
        <div class="content">{{ createTime }}</div>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'Info',
  props: {
    infantName: {
      type: String,
      default: ''
    },
    malady: {
      type: String,
      default: ''
    },
    drugName: {
      type: String,
      default: ''
    },
    dosage: {
      type: String,
      default: ''
    },
    useTime: {
      type: String,
      default: ''
    },
    drugCircle: {
      type: String,
      default: ''
    },
    comment: {
      type: String,
      default: ''
    },
    createTime: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.flex-center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.common-style {
  margin: 1rem 0;
  .flex-center;
  .tag {
    flex: 3;
    .flex-center;
    font-size: 0.93rem;
    font-weight: 500;
  }
  .content {
    flex: 7;
    font-size: 1rem;
    font-weight: 560;
  }
}
.info {
  height: 32rem;
  width: 100%;
  .name {
    .common-style;
  }
  .sick-desc {
    .common-style;
  }
  .drug-name {
    .common-style;
  }
  .dosage {
    .common-style;
  }
  .drug-time {
    .common-style;
  }
  .drug-circle {
    .common-style;
  }
  .note {
    .common-style;
  }
  .time {
    .common-style;
  }
}
</style>
