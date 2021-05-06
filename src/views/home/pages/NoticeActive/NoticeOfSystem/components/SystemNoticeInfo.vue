<template>
  <Card class="system-notice-info" v-if="Object.keys(infoItem).length > 0">
    <div slot="title" class="title">
      <h2>{{ infoItem.title }}</h2>
    </div>
    <div class="content">
      <div class="top">
        <Avatar :src="infoItem.iconUrl" size="small" />
        <Tag color="gold" size="large" style="margin: 0 0.6rem">
          {{ infoItem.user || 'user unknown' }}
        </Tag>
        <Tag color="lime" size="large">{{ infoItem.time }}</Tag>
      </div>
      <div class="bottom">
        <div class="article" v-html="_content"></div>
        <div class="img-list" v-if="infoItem.imgs !== []">
          <img
            v-for="(item, key) in infoItem.imgs"
            :key="key"
            :src="item"
            alt=""
          />
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import { htmlToText } from '@/utils';

import { mapState } from 'vuex';

export default {
  name: 'SystemNoticeInfo',
  props: {
    infoItem: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    _content() {
      const content = htmlToText(this.infoItem.content).htmlText;
      return content;
    },
    ...mapState(['avatar'])
  }
};
</script>

<style lang="less" scoped>
.full_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.system-notice-info {
  height: 36rem;
  overflow-y: auto;
  .title {
    .full_flex();
  }
  .content {
    .top {
      .full_flex();
    }
    .bottom {
      margin-top: 1.2rem;
      .img-list {
        margin-top: 1rem;
      }
    }
  }
}
</style>
