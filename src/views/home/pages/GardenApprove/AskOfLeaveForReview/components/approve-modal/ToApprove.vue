<template>
  <div class="to-approve">
    <div class="left">
      <Card :bordered="false">
        <div class="title" slot="title">
          <Avatar :src="icon || platformUrl" size="large" />
          <h2>{{ infantName }}家长</h2>
          <Tag type="border" closable color="warning">{{ className }}</Tag>
        </div>
        <div class="content">
          <div class="holiday-child">
            <div class="title">请假幼儿</div>
            <div class="content">{{ infantName }}</div>
          </div>
          <div class="holiday-span">
            <div class="title">请假时间</div>
            <div class="content">
              <div>开始: {{ startTime }}</div>
              <div>结束: {{ endTime }}</div>
            </div>
          </div>
          <div class="holiday-type">
            <div class="title">请假类型</div>
            <div class="content">{{ leaveType }}</div>
          </div>
          <div class="ask-content">
            <div class="title">请假内容</div>
            <div class="content">{{ content }}</div>
          </div>
          <div class="fund-time">
            <div class="title">创建时间</div>
            <div class="content">{{ createTime }}</div>
          </div>
        </div>
      </Card>
    </div>
    <Divider type="vertical" />
    <div class="right">
      <Card>
        <div class="title" slot="title">
          <Tag color="gold" size="large">待审批</Tag>
        </div>
        <div class="content">
          <div class="agree">
            <div class="title">审批</div>
            <div class="content">
              <RadioGroup v-model="isAgree">
                <Radio :label="1">同意</Radio>
                <Radio :label="2">拒绝</Radio>
              </RadioGroup>
            </div>
          </div>
          <div class="note">
            <div class="title">备注</div>
            <div class="content">
              <Input
                v-model="inputNote"
                type="textarea"
                :rows="11"
                placeholder="请输入备注内容"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
    <btns
      class="op-btns"
      :operations="operations"
      @handleBottomOperations="handleOps"
    />
  </div>
</template>

<script>
import './to-approve.less';

import Btns from '@common/modal-bottom-btns';

import { approveChild } from '@/request/garden-approve/5-children-ask-leave';

import { handleOpResult } from '@/utils';

import { mapState } from 'vuex';

export default {
  name: 'ToApprove',
  components: {
    Btns
  },
  data: () => ({
    isAgree: 1,
    inputNote: '',
    params: {},
    operations: [
      {
        tag: '发布',
        type: 'success'
      },
      {
        tag: '取消',
        type: 'error'
      }
    ]
  }),
  props: {
    id: Number || String,
    classId: Number || String,
    infantName: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    leaveType: {
      type: String,
      default: ''
    },
    startTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    createTime: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState(['platformUrl'])
  },
  methods: {
    handleOps(btnTag = '') {
      switch (btnTag) {
        case '发布':
          this.handleSubmit();
          break;
        case '取消':
          this.closeModals();
          break;
        default:
          break;
      }
    },
    handleSubmit() {
      if (this.checkParams()) {
        this.$Modal.confirm({
          title: '审批幼儿请假',
          content: '确认操作?',
          onOk: () => this.confirmSubmit()
        });
      }
    },
    async confirmSubmit() {
      const params = {
          id: this.id,
          info: this.inputNote,
          type: this.isAgree
          // ,classId: this.classId || 0
        },
        result = await approveChild(params);
      if (handleOpResult(result)) {
        this.$Message.success({ content: '审批成功', background: true });
        this.$emit('refreshPage');
      } else this.$Message.error(`操作失败, 原因: ${result.msg}`);
      this.$emit('closeModals');
    },
    closeModals() {
      this.$Message.info('您关闭了本次会话');
      this.$emit('closeModals');
    },
    checkParams() {
      if (this.isAgree <= 0) {
        this.$Message.error('请选择审批类型');
        return false;
      }
      return true;
    }
  }
};
</script>
