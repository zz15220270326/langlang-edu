<template>
  <div class="is-commented">
    <Card>
      <div slot="title" class="title">
        <div class="big-title">
          <h1>{{ bigTitle }}</h1>
        </div>
        <div class="small-title">{{ smallTitle }}</div>
      </div>
      <div class="content">
        <List class="top" ref="contentRef" v-html="_content"></List>
        <div class="middle">
          <Slider v-model="slideValue"></Slider>
        </div>
        <div class="bottom">
          <div class="comment-content">
            <Tag checkable color="primary">点评意见</Tag>
            <div>{{ remarkIdea }}</div>
          </div>
          <div class="remark-name">
            <Tag checkable color="success">点评人</Tag>
            <div>{{ remarkName }}</div>
          </div>
          <div class="comment-time">
            <Tag checkable color="warning">点评时间</Tag>
            <div>{{ remarkTime }}</div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
// ? utils
import { htmlToText } from '@/utils';

export default {
  name: 'IsCommented',
  data: () => ({
    inputComment: '',
    // slideValue: [0, 100],
    slideValue: 100
  }),
  props: {
    id: {
      type: Number,
      default: 0
    },
    bigTitle: {
      type: String,
      default: ''
    },
    smallTitle: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    // ? 后端返回的点评信息
    remarkIdea: {
      type: String,
      default: ''
    },
    remarkName: {
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
  },
  mounted() {
    // const { contentRef } = this.$refs
    // contentRef.innerHtml = this._content
  }
};
</script>

<style lang="less" scoped>
.flex-center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.is-commented {
  height: 32rem;
  overflow: auto;
  .ivu-card-head {
    .big-title {
      margin: 0.8rem 0;
      .flex-center;
    }
    .small-title {
      .flex-center;
      font-size: 1.2rem;
      font-weight: 500;
      margin-bottom: 0.8rem;
    }
  }
  .content {
    width: 100%;
    .top {
      margin: 0.8rem 0;
    }
    .bottom {
      color: #888;
      .comment-content {
        margin-top: 2rem;
      }
      .remark-name {
        margin: 2rem 0;
      }
      .comment-time {
        margin-bottom: 2rem;
      }
    }
  }
}
</style>
