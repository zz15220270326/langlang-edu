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
        <div class="top">
          <Table border :columns="planTitleList" :data="planDataList"></Table>
        </div>
        <div class="middle">
          <Slider v-model="slideValue" disabled></Slider>
        </div>
        <div class="bottom">
          <div class="comment-content">
            <Tag checkable color="primary">点评意见</Tag>
            <div>{{ replyContent }}</div>
          </div>
          <div class="realname">
            <Tag checkable color="success">点评人</Tag>
            <div>{{ realname }}</div>
          </div>
          <div class="comment-time">
            <Tag checkable color="warning">点评时间</Tag>
            <div>{{ replyTime }}</div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'IsCommented',
  data: () => ({
    inputComment: '',
    // slideValue: [0, 100],
    slideValue: 100
  }),
  props: {
    bigTitle: {
      type: String,
      default: ''
    },
    smallTitle: {
      type: String,
      default: ''
    },
    planTitleList: {
      type: Array,
      default: () => []
    },
    planDataList: {
      type: Array,
      default: () => []
    },
    // ? 后端返回的点评信息
    replyContent: {
      type: String,
      default: ''
    },
    realname: {
      type: String,
      default: ''
    },
    replyTime: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.is-commented {
  height: 28rem;
  overflow: auto;
  .ivu-card-head {
    .big-title {
      margin: 0.8rem 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .small-title {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
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
      .realname {
        margin: 2rem 0;
      }
      .comment-time {
        margin-bottom: 2rem;
      }
    }
  }
}
</style>
