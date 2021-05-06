<template>
  <div class="content">
    <Card>
      <div slot="title" class="wrapper">
        <Tag color="blue" size="large">
          点评内容
        </Tag>
      </div>
      <List class="main" v-html="_content"></List>
    </Card>
  </div>
</template>

<script>
// ? utils
import { htmlToText } from '@/utils';

export default {
  name: 'Content',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  computed: {
    _content() {
      return htmlToText(this.content).htmlText;
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.content {
  margin-top: 2rem;
  .wrapper {
    padding: 0.5rem 0.48rem;
  }
  .main {
    margin: 1rem;
  }
}
</style>
