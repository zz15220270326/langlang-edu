<template>
  <div class="info-garden-notice" v-if="Object.keys(infoItem).length > 0">
    <div class="title">
      <h1>{{ infoItem.title }}</h1>
      <div class="user-info">
        <img :src="avatar" alt="" />
        <span class="user-name">{{ infoItem.charger }}</span>
        <Tag size="large" color="lime">
          {{ infoItem.time }}
        </Tag>
        <Tag v-if="infoItem.type" size="large" :color="infoItem.color">
          {{ infoItem.type }}
        </Tag>
      </div>
    </div>
    <div class="content">
      <!-- <div class="text-content">
        {{ infoItem.content }}
      </div> -->
      <div class="text-content" v-html="_content"></div>
      <div
        class="img-content"
        v-if="infoItem.urlInfo && infoItem.urlInfo[0] !== ''"
      >
        <img
          v-for="(itm, idx) of infoItem.urlInfo"
          :key="idx + itm"
          :src="itm"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
// ? utils
import { htmlToText } from '@/utils';

export default {
  name: 'InfoNotice',
  props: {
    infoItem: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    _content() {
      const content = htmlToText(this.infoItem.content);
      return content.htmlText;
    },
    avatar() {
      return this.$store.state.avatar;
    }
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
.info-garden-notice {
  height: 36rem;
  overflow: auto;
  .title {
    text-align: center;
    .user-info {
      .full_flex();
      img {
        height: 2.7rem;
        width: 2.7rem;
      }
      .user-name {
        margin: 0 0.8rem;
      }
    }
  }
  .content {
    font-size: 1rem;
    .text-content {
      margin: 1rem 0;
    }
    .img-content {
      .full_flex();
      flex-wrap: wrap;
      img {
        width: 10rem;
        height: 8rem;
        margin: 0.3rem 0.5rem;
      }
    }
  }
}
</style>
