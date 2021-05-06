<template>
  <div class="to-comment">
    <Card class="to-comment-card">
      <div slot="title" class="title">
        <div class="big-title">
          <h1>{{ bigTitle }}</h1>
        </div>
        <div class="small-title">{{ smallTitle }}</div>
      </div>
      <div class="content">
        <div class="top">
          <Table border :columns="planTitleList" :data="planDataList">
            <template slot-scope="{ row, index }" slot="noon">
              {{ row.timecases[index].start_time.split(':')[0] * 1 }}
            </template>
          </Table>
        </div>
        <div class="bottom">
          <Tag color="green">点评意见</Tag>
          <Input v-model="inputComment" type="textarea" :rows="6" />
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
// ? import components
import Btns from '@common/modal-bottom-btns';

// ? import request
import { commentTeachPlan } from '@/request/garden-approve/1-class-plan';

// ? import utils
import { handleOpResult } from '@/utils';

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
    }
  },
  methods: {
    handleBottomOperations(btnTag) {
      switch (btnTag) {
        case '确认':
          this.handleStatus();
          break;
        case '取消':
          this.handleCancel();
          break;
      }
    },
    handleStatus() {
      if (this.inputComment === '') {
        this.$Message.warning('请输入点评内容');
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
      const result = await commentTeachPlan(params);
      if (handleOpResult(result)) {
        this.$Message.success('点评成功');
        this.$emit('refreshPage');
      } else {
        this.$Message.warning('点评失败');
        this.$emit('cancelModal');
      }
      this.inputComment = '';
    },
    handleCancel() {
      this.$Message.warning('您取消了本次操作');
      this.inputComment = '';
      this.$emit('cancelModals');
    }
  }
};
</script>

<style lang="less" scoped>
.to-comment {
  height: 32rem;
  color: #666;
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
