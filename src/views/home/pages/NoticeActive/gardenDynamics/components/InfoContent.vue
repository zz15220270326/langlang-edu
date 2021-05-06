<template>
  <div class="info-content">
    <Card>
      <div slot="title" class="card-title">
        <h2>{{ infoTitle }}</h2>
      </div>
      <div class="card-content">
        <div class="top">
          <Avatar :src="infoAvatar" />
          <Tag color="pink" size="large">
            {{ infoAuthor }}
          </Tag>
          <Tag color="green" size="large">
            {{ infoTime }}
          </Tag>
        </div>
        <div class="bottom" v-html="_content"></div>
      </div>
    </Card>
  </div>
</template>

<script>
import { htmlToText } from '@/utils';

export default {
  name: 'InfoContent',
  props: {
    infoTitle: {
      type: String,
      default: ''
    },
    infoAvatar: {
      type: String,
      default: ''
    },
    infoAuthor: {
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
      const content = htmlToText(this.infoContent);
      return content.htmlText;
    }
  }
};
</script>

<style lang="less" scoped>
.full-flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info-content {
  .card-title {
    .full-flex();
    padding: 3/4rem 0;
  }
  .card-content {
    height: 30rem;
    overflow-y: auto;
    .ivu-tag {
      margin: 0 0.5rem;
    }
    .top {
      padding: 3/4rem 0;
      .full-flex();
    }
    .bottom {
      margin: 0.8rem;
    }
  }
}
</style>
