<template>
  <div class="left">
    <div class="row-item">
      <div class="tag">
        <Tag size="large" color="gold">荣誉名称</Tag>
      </div>
      <div class="content">
        <Input
          v-model="inputs.title"
          placeholder="请输入荣誉名称(不超过20字)"
          maxlength="20"
          :show-word-limit="true"
        />
      </div>
    </div>
    <div class="row-item">
      <div class="tag">
        <Tag size="large" color="lime">获得时间</Tag>
      </div>
      <div class="content">
        <DatePicker
          placeholder="请选择获得荣誉的时间"
          v-model="inputs.relatedTime"
        />
      </div>
    </div>
    <div class="row-item">
      <div class="tag">
        <Tag size="large" color="cyan">荣誉简介</Tag>
      </div>
      <div class="content">
        <Input
          v-model="inputs.remark"
          placeholder="请输入荣誉简介内容(不超过200字)"
          type="textarea"
          :rows="5"
          maxlength="200"
          :show-word-limit="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ghBus from '../ghBus';

export default {
  name: 'InputContent',
  data: () => ({
    inputs: {
      title: '',
      relatedTime: '',
      remark: ''
    }
  }),
  props: {},
  computed: {},
  methods: {
    initEdit({ title, remark, relatedTime }) {
      this.inputs = {
        title,
        remark,
        relatedTime: new Date(relatedTime * 1000)
      };
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  mounted() {
    ghBus.$on('initEdit', infos => this.initEdit(infos));
  },
  beforeDestroy() {
    ghBus.$off('initEdit');
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
.common-style {
  padding-top: 1.6rem;
  .full_flex();
  .tag {
    flex: 4;
    text-align: right;
    margin-right: 3rem;
  }
  .content {
    flex: 7;
    margin-right: 3rem;
  }
}
.left {
  flex: 5;
  .row-item {
    .common-style;
  }
}
</style>
