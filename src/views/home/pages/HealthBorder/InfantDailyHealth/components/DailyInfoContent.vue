<template>
  <div class="info-content">
    <div class="recordDate">
      <div class="tag">
        <Tag size="large" color="lime">时间</Tag>
      </div>
      <div class="content">
        <Input readonly :value="recordDate" />
      </div>
    </div>
    <div class="check-type">
      <div class="tag">
        <Tag size="large" color="gold">类型</Tag>
      </div>
      <div class="content">
        <RadioGroup :value="type">
          <Radio label="晨检" disabled />
          <Radio label="午检" disabled />
        </RadioGroup>
      </div>
    </div>
    <div class="current-class">
      <div class="tag">
        <Tag size="large" color="green">选择班级</Tag>
      </div>
      <div class="content">
        <Input readonly :value="className" />
      </div>
    </div>
    <div class="name">
      <div class="tag">
        <Tag size="large" color="volcano">选择姓名</Tag>
      </div>
      <div class="content">
        <Input readonly :value="childName" />
      </div>
    </div>
    <div class="temperatue">
      <div class="tag">
        <Tag size="large" color="pink">体温</Tag>
      </div>
      <div class="content">
        <Input readonly :value="temperature" />
      </div>
    </div>
    <div class="health-status">
      <div class="tag">
        <Tag size="large" color="red">健康状况</Tag>
      </div>
      <div class="content">
        <RadioGroup :value="healthStatus">
          <Radio label="正常" disabled />
          <Radio label="需要观察" disabled />
          <Radio label="传染病风险" disabled />
        </RadioGroup>
      </div>
    </div>
    <div class="symbol">
      <div class="tag">
        <Tag size="large" color="pink">症状</Tag>
      </div>
      <div class="content">
        <CheckboxGroup :value="symptom">
          <Checkbox label="发热" disabled></Checkbox>
          <Checkbox label="红眼" disabled></Checkbox>
          <Checkbox label="腹泻" disabled></Checkbox>
          <Checkbox label="咳嗽" disabled></Checkbox>
          <Checkbox label="出疹" disabled></Checkbox>
          <Checkbox label="呕吐" disabled></Checkbox>
          <Checkbox label="黄疸" disabled></Checkbox>
          <Checkbox label="腮腺肿大" disabled></Checkbox>
          <Checkbox label="其他" disabled></Checkbox>
        </CheckboxGroup>
      </div>
    </div>
    <div class="handle-type">
      <div class="tag">
        <Tag size="large" color="success">处理方式</Tag>
      </div>
      <div class="content">
        <RadioGroup :value="handleType">
          <Radio label="正常入园" disabled />
          <Radio label="离园回家" disabled />
        </RadioGroup>
      </div>
    </div>
    <div class="remark">
      <div class="tag">
        <Tag size="large" color="yellow">备注</Tag>
      </div>
      <div class="content">
        <Input type="textarea" :rows="5" :value="remark" readonly />
      </div>
    </div>
    <div class="image">
      <div class="tag">
        <Tag size="large" color="blue">图片</Tag>
      </div>
      <div class="content">
        <img
          v-for="(item, key) in symbolImgList"
          :key="key"
          :src="item"
          alt=""
        />
      </div>
    </div>
    <div class="teacherName">
      <div class="tag">
        <Tag size="large" color="blue">登记人</Tag>
      </div>
      <div class="content">
        {{ teacherName }}
      </div>
    </div>
    <div class="register-time">
      <div class="tag">
        <Tag size="large" color="lime">登记时间</Tag>
      </div>
      <div class="content">
        {{ registerTime }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DailyInfoContent',
  props: {
    recordDate: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: '暂无'
    },
    className: {
      type: String,
      default: ''
    },
    childName: {
      type: String,
      default: ''
    },
    temperature: {
      type: Number,
      default: 0
    },
    healthStatus: {
      type: String,
      default: ''
    },
    symptom: {
      type: Array,
      default: () => []
    },
    handleType: {
      type: String,
      default: ''
    },
    remark: {
      type: String,
      default: ''
    },
    symbolImgList: {
      type: Array,
      default: () => []
    },
    teacherName: {
      type: String,
      default: ''
    },
    registerTime: {
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
  height: 36rem;
  overflow-y: auto;
  .recordDate {
    .common_flex();
  }
  .check-type {
    .common_flex();
  }
  .current-class {
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
  .symbol {
    .common_flex();
  }
  .handle-type {
    .common_flex();
  }
  .remark {
    .common_flex();
  }
  .image {
    .common_flex();
  }
  .teacherName {
    .common_flex();
  }
  .register-time {
    .common_flex();
  }
}
</style>
