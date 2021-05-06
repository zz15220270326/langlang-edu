<template>
  <div class="to-comment">
    <Card>
      <div slot="title" class="title">
        <div class="big-title">
          <h1>{{ title }}</h1>
        </div>
        <div class="small-title">{{ createTime }}</div>
      </div>
      <div class="top">
        <List v-html="_content"></List>
        <Divider />
      </div>
      <div class="content">
        <div class="bottom">
          <Tag color="green">点评意见</Tag>
          <Input v-model="inputComment" type="textarea" :rows="8" />
        </div>
      </div>
    </Card>
    <btns
      :operations="operations"
      size="large"
      @handleBottomOperations="handleBottomOperations"
    />
  </div>
</template>

<script>
// ? components
import Btns from '@common/modal-bottom-btns';

// ? request
import { commentOtherPlan } from '@/request/garden-approve/1-class-plan';

// ? utils
import { htmlToText, /* */ handleOpResult } from '@/utils';

export default {
  name: 'ToComment',
  components: {
    Btns
  },
  data: () => ({
    inputComment: '',
    operations: [
      {
        tag: '确认',
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
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    createTime: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  computed: {
    _content() {
      return htmlToText(this.content).htmlText;
    }
  },
  methods: {
    handleBottomOperations(btnTag) {
      switch (btnTag) {
        case '确认':
          this.handleConfirm();
          break;
        case '取消':
          this.handleCancel();
          break;
      }
    },
    handleConfirm() {
      if (this.inputComment === '') {
        this.$Message.warning('请填写点评内容');
        return;
      }
      this.$Modal.confirm({
        title: '点评内容',
        content: '确认操作',
        onOk: () => this.confirmStatus(),
        onCancel: () => this.handleCancel()
      });
    },
    async confirmStatus() {
      const params = {
        id: this.id,
        content: this.inputComment
      };
      const result = await commentOtherPlan(params);
      if (handleOpResult(result)) {
        this.$Message.success('点评成功');
        this.$emit('refreshPage');
      } else this.$Message.error('点评失败, 请稍后重试');
      this.$emit('closeModals');
    },
    handleCancel() {
      this.$Message.warning('您取消了本次操作');
      this.inputComment = '';
      this.$emit('closeModals');
    }
  }
};
</script>

<style lang="less" scoped>
.to-comment {
  height: 36rem;
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
    }
  }
}
</style>
