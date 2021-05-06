<template>
  <div class="info-content">
    <div class="date">
      <div class="tag">
        <Tag color="lime" size="large">时间</Tag>
      </div>
      <div class="content">
        <Input readonly :value="date" />
      </div>
    </div>
    <div class="name">
      <div class="tag">
        <Tag color="blue" size="large">职工姓名</Tag>
      </div>
      <div class="content">
        <Input readonly :value="name" />
      </div>
    </div>
    <div class="temperatue">
      <div class="tag">
        <Tag color="green" size="large">体温</Tag>
      </div>
      <div class="content">
        <Input readonly :value="temperatue" />
      </div>
    </div>
    <div class="health-status">
      <div class="tag">
        <Tag color="orange" size="large">健康状况</Tag>
      </div>
      <div class="content">
        <RadioGroup :value="healthStatus">
          <Radio label="正常" disabled />
          <Radio label="有发烧、咳嗽等症状" disabled />
        </RadioGroup>
      </div>
    </div>
    <div class="touch-history">
      <div class="tag">
        <Tag color="red" size="large">过往接触史</Tag>
      </div>
      <div class="content">
        <div>截止今天是否有直接或间接接触过确诊或疑似患有新型肺炎的病人?</div>
        <RadioGroup :value="touchHistory">
          <Radio label="未接触过" disabled />
          <Radio label="接触过" disabled />
        </RadioGroup>
      </div>
    </div>
    <div class="desc">
      <div class="tag">
        <Tag color="gold" size="large">备注</Tag>
      </div>
      <div class="content" size="large">
        <Input type="textarea" :rows="5" v-model="inputDesc" readonly />
      </div>
    </div>
    <div class="registrant">
      <div class="tag">
        <Tag color="success" size="large">登记人</Tag>
      </div>
      <div class="content">{{ registrant }}</div>
    </div>
    <div class="register-time">
      <div class="tag">
        <Tag color="lime" size="large">登记时间</Tag>
      </div>
      <div class="content">
        {{ date }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WHMInfoContent',
  data: () => ({
    inputDesc: '暂无备注'
  }),
  props: {
    date: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    temperatue: {
      type: Number,
      default: 0
    },
    healthStatus: {
      type: String,
      default: ''
    },
    symbol: {
      type: String,
      default: ''
    },
    touchHistory: {
      type: String,
      default: ''
    },
    registrant: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="less" scoped>
.common_flex() {
  width: 100%;
  padding: 0.8rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .tag {
    flex: 1;
    text-align: right;
    margin-right: 2rem;
  }
  .content {
    flex: 3;
    margin-right: 10rem;
  }
}

.info-content {
  height: 30rem;
  overflow-y: auto;
  .date {
    .common_flex();
  }
  .name {
    .common_flex();
  }
  .temperatue {
    .common_flex();
  }
  .health-status {
    .common_flex();
  }
  .touch-history {
    .common_flex();
  }
  .registrant {
    .common_flex();
  }
  .register-time {
    .common_flex();
  }
}
</style>
