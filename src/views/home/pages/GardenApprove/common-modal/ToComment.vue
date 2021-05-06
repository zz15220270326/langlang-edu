<template>
  <div class="to-comment">
    <Card>
      <div slot="title" class="title">
        <div class="big-title">
          <h1>{{ bigTitle }}</h1>
        </div>
        <div class="small-title">{{ smallTitle }}</div>
      </div>
      <div class="content">
        <List class="top">
          <!-- 内容: -->
          <span v-html="_content"></span>
        </List>
        <div class="bottom">
          <Tag color="green">点评意见</Tag>
          <Input v-model="inputComment" type="textarea" :rows="4" />
        </div>
      </div>
      <btns :operations="operations" @handleBottomOperations="handleModal" />
    </Card>
  </div>
</template>

<script>
// ? import components
import Btns from '@common/modal-bottom-btns';

// ? import utils
import { htmlToText } from '@/utils';

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
    commentContent: {
      type: String,
      default: ''
    }
  },
  computed: {
    _content() {
      const { htmlText } = htmlToText(this.commentContent);
      return htmlText;
    }
  },
  methods: {
    handleModal(btnTag) {
      switch (btnTag) {
        case '确认':
          if (this.inputComment === '') {
            this.$Message.warning('请填写点评内容');
            return;
          }
          this.$Modal.confirm({
            title: '点评内容',
            content: '确认点评?',
            onOk: () => this.handleRemark(),
            onCancel: () => this.handleCancel()
          });
          break;
        case '取消':
          this.handleCancel();
          break;
      }
    },
    handleRemark() {
      const { id, inputComment } = this;
      const params = {
        id,
        content: inputComment
      };
      this.$emit('handleRemark', params);
      this.clearParams();
    },
    handleCancel() {
      this.$Message.warning('您取消了本次操作');
      this.$emit('cancelModal');
    },
    clearParams() {
      this.inputComment = '';
    }
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
.to-comment {
  height: 28rem;
  color: #666;
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
    }
  }
}
</style>
