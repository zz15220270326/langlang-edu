<template>
  <Card class="info">
    <div slot="title" class="header">
      <h2>{{ infoTitle }}</h2>
      <div class="info-nav">
        <!-- <Avatar :src="infoIcon" /> -->
        <Tag color="gold" size="large">
          {{ infoIcon }}
        </Tag>
        <Tag color="purple" size="large">
          {{ infoName }}
        </Tag>
        <Tag color="blue" size="large">
          {{ infoTime }}
        </Tag>
      </div>
    </div>
    <List class="main" v-html="_content"></List>
  </Card>
</template>

<script>
// ? utils
import { htmlToText } from '@/utils';

export default {
  name: 'Info',
  props: {
    // ? 按照显示从上到下
    infoTitle: {
      type: String,
      default: ''
    },
    infoName: {
      type: String,
      default: ''
    },
    infoIcon: {
      type: String,
      default: ''
    },
    infoTime: {
      type: String,
      default: ''
    },
    infoContent: {
      type: String,
      default: ''
    }
  },
  computed: {
    _content() {
      const { htmlText } = htmlToText(this.infoContent);
      return htmlText;
    }
  }
};
</script>

<style lang="less" scoped>
.info {
  height: 36rem;
  overflow-y: auto;
  .header {
    padding: 1.2rem 0;
    text-align: center;
  }
  .main {
    text-align: left;
    font-size: 1.2rem;
  }
}
</style>
