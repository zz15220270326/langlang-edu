<template>
  <div class="info">
    <Top :infoTitle="infoTitle" :infoTime="infoTime" />
    <Content :content="content" />
    <Bottom
      :remarkContent="remarkContent"
      :name="name"
      :remarkTime="remarkTime"
    />
  </div>
</template>

<script>
// ? import components
import Top from './info-content/Top';
import Content from './info-content/Content';
import Bottom from './info-content/Bottom';

export default {
  name: 'InfoContent',
  components: {
    Top,
    Content,
    Bottom
  },
  data: () => ({
    reqId: -1,
    // ? 显示内容
    content: '',
    // ? 下面的内容
    name: '',
    remarkContent: '',
    remarkTime: ''
  }),
  props: {
    infoTitle: {
      type: String,
      default: ''
    },
    infoTime: {
      type: String,
      default: ''
    },
    infoId: {
      type: Number,
      default: -1
    },
    info: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    infoId(newValue) {
      if (newValue > 0) {
        this.reqId = newValue;
        this.getItemInfo(this.info);
      }
    }
  },
  methods: {
    async getItemInfo() {
      const { content, name, remark_content, remark_time } = this.info;
      this.content = content ? content : '暂无内容';
      this.name = name ? name : '暂无内容';
      this.remarkContent = remark_content ? remark_content : '暂无内容';
      this.remarkTime = remark_time ? remark_time : '暂无内容';
    }
  }
};
</script>

<style lang="less" scoped>
.info {
  color: #666;
  height: 40rem;
  overflow-y: auto;
  .top {
    width: 100%;
    padding: 1.2rem;
    text-align: center;
  }
}
</style>
