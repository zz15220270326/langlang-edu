<template>
  <div class="info">
    <div class="header">
      <h2>{{ title }}</h2>
      <Tag size="large" color="gold">{{ createTime }}</Tag>
    </div>
    <Card class="content">
      <List v-html="_content"></List>
    </Card>
    <div class="comment">
      <info-item
        title="点评意见"
        color="green"
        size="large"
        :content="remarkContent"
      />
      <info-item title="点评人" color="blue" size="large" :content="name" />
      <info-item
        title="点评时间"
        color="purple"
        size="large"
        :content="remarkTime"
      />
    </div>
  </div>
</template>

<script>
// ? items
import InfoItem from './info/InfoItem';

// ? utils
import { htmlToText } from '@/utils';

export default {
  name: 'Info',
  components: {
    InfoItem
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    createTime: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    remarkContent: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    remarkTime: {
      type: String,
      default: ''
    }
  },
  computed: {
    _content() {
      const { htmlText } = htmlToText(this.content);
      return htmlText;
    }
  }
};
</script>

<style lang="less" scoped>
.info {
  height: 30rem;
  width: 100%;
  overflow-y: auto;
  .header {
    padding: 1rem 0;
    text-align: center;
  }
  .content {
    margin: 1rem 0;
    padding: 0.8rem 0;
  }
}
</style>
