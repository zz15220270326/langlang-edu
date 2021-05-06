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
    <!-- <div class="bottom">
      <Button type="primary" size="large" @click.native="handleSubmitEdit">
        提交
      </Button>
      <Button type="error" size="large" @click.native="handleCancelEdit">
        取消
      </Button>
    </div> -->
    <btns :operations="operations" @handleBottomOperations="handleOps" />
  </div>
</template>

<script>
// ? components
import Btns from '@common/modal-bottom-btns';

export default {
  name: 'EditModalContent',
  components: { Btns },
  data: () => ({
    inputName: '',
    inputDesc: '',
    operations: [
      {
        tag: '提交',
        type: 'success'
      },
      {
        tag: '取消',
        type: 'error'
      }
    ]
  }),
  props: {
    id: {
      type: [Number, String],
      default: -1
    },
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
    handleOps(btnTag) {
      switch (btnTag) {
        case '提交':
          this.handleSubmitEdit();
          break;
        case '取消':
          this.handleCancelEdit();
          break;
      }
    },
    handleSubmitEdit() {
      if (this.inputName === '') {
        this.$Message.warning('设备名称不能为空');
        return;
      }
      this.$Modal.confirm({
        title: '编辑内容',
        content: '确认操作?',
        onOk: () => {
          const params = {
            id: this.id,
            name: this.inputName,
            remark: this.inputDesc
          };
          console.log(params);
          this.$emit('handleSubmitEdit', params);
        }
      });
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
