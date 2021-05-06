<template>
  <div class="footer">
    <div class="content">
      <div class="span" v-if="replyContent !== ''">
        <Tag size="large" color="green">点评内容</Tag>
      </div>
      <div class="content">{{ replyContent }}</div>
    </div>
    <div class="evaluater" v-if="evaluater !== ''">
      <div class="span">
        <Tag size="large" color="pink">点评人</Tag>
      </div>
      <div class="content">{{ evaluater }}</div>
    </div>
    <div class="time">
      <div class="span" v-if="evaluateTime !== ''">
        <Tag size="large" color="blue">点评时间</Tag>
      </div>
      <div class="content">{{ evaluateTime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailFooter',
  props: {
    replyContent: {
      type: String,
      default: ''
    },
    evaluater: {
      type: String,
      default: ''
    },
    evaluateTime: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="less" scoped>
.footer {
  margin-top: 1.2rem;
  height: 16rem;
  .span {
    color: #999;
  }
  .content {
    color: #333;
    font-size: 1rem;
    margin: 0.5rem 0;
  }
}
</style>
