<template>
  <!-- 用卡片实现 -->
  <Card v-cloak class="attdence-reminder-info" :bordered="false">
    <Timeline>
      <TimelineItem class="info-item" v-for="item of infos" :key="item.info">
        <Tag size="large" class="time-span">
          {{ item.info }}
        </Tag>
        <Tag color="#FFA500" size="large">
          {{ item.type }}
        </Tag>
        <Divider />
      </TimelineItem>
      <!-- <div class="status">
        <Button round></Button>
      </div> -->
    </Timeline>
  </Card>
</template>

<script>
export default {
  name: 'AttdanceReminder',
  data: () => ({}),
  props: {
    infos: {
      type: Array,
      default: () => []
    }
  },
  methods: {},
  beforeUpdate() {}
}
</script>

<style lang="less" scoped>
.flex-center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.attdence-reminder-info {
  width: 100%;
  height: 30rem;
  // text-align: center;
  margin: 1rem auto;
  overflow-y: auto;
  .info-item {
    padding: 0.5rem 1.2rem;
    .time-span {
      margin: 0 3rem;
    }
  }
}
</style>
