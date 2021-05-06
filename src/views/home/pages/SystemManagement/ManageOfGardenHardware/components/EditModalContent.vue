<template>
  <div class="edit-modal-content">
    <div class="main">
      <div class="name">
        <div class="tag">
          <Tag color="lime" size="large">设备名称</Tag>
        </div>
        <div class="content">
          <Input v-model="inputName" placeholder="请输入设备名称" />
        </div>
      </div>
      <div class="desc">
        <div class="tag">
          <Tag color="yellow" size="large">备注</Tag>
        </div>
        <div class="content">
          <Input
            v-model="inputDesc"
            type="textarea"
            :rows="5"
            placeholder="请输入备注内容"
          />
        </div>
      </div>
    </div>
    <div class="bottom">
      <Button type="primary" size="large" @click.native="handleSubmitEdit">
        提交
      </Button>
      <Button type="error" size="large" @click.native="handleCancelEdit">
        取消
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditModalContent',
  data: () => ({
    inputName: '',
    inputDesc: ''
  }),
  props: {
    editName: {
      type: String,
      default: ''
    },
    editDesc: {
      type: String,
      default: ''
    }
  },
  watch: {
    editName(newValue) {
      this.inputName = newValue;
    },
    editDesc(newValue) {
      this.inputDesc = newValue;
    }
  },
  methods: {
    handleSubmitEdit() {
      if (this.inputName === '') {
        this.$Message.warning('设备名称不能为空');
        return;
      }
      this.$Message.info('正在保存编辑...');
      this.$emit('handleSubmitEdit');
    },
    handleCancelEdit() {
      this.inputName = '';
      this.inputDesc = '';
      this.$emit('handleCancelEdit');
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
.common-style {
  margin: 1.2rem 0;
  .full_flex();
  .tag {
    flex: 3;
    text-align: right;
    margin-right: 4rem;
  }
  .content {
    flex: 8;
    margin-right: 6rem;
  }
}
.edit-modal-content {
  height: 25rem;
  .main {
    height: 60%;
    .name {
      .common-style;
    }
    .desc {
      .common-style;
    }
  }
  .bottom {
    height: 40%;
    padding: 1.2rem 0;
    .full_flex();
    .ivu-btn {
      width: 6rem;
      margin: 0 0.8rem;
    }
  }
}
</style>
