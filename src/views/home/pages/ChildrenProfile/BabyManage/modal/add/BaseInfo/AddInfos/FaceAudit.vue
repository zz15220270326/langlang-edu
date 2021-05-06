<template>
  <Tabs class="face-auidt" name="face-audit">
    <TabPane label="当前照片" name="crtImg">
      <img v-if="img" :src="img" alt="" />
    </TabPane>
    <TabPane label="审核状态" name="checkStatus">
      <Button :type="this.btnType" @click.native="handleCheckParent">
        {{ btnTag }}
      </Button>
    </TabPane>
  </Tabs>
</template>

<script>
// ? request
import { auditFace } from '@/request/children-profile';
// ? utils
import { handleOpResult } from '@/utils';
import { handleStatus, handleStatusType } from '../../function';

export default {
  name: 'FaceAudit',
  props: {
    id: Number,
    type: String,
    img: String,
    status: Number,
    permission: Number
  },
  computed: {
    btnTag() {
      return handleStatus(this.status);
    },
    btnType() {
      return handleStatusType(this.status);
    }
  },
  methods: {
    handleCheckParent() {
      if (this.btnTag === '审核通过') {
        this.$Message.warning('无法重复审核');
        return;
      }
      this.$Modal.confirm({
        title: '审核家长人脸头像',
        content: '确认操作?',
        onOk: () => this.confirmCheckParent()
      });
    },
    async confirmCheckParent() {
      const params = {
        id: this.id,
        type: this.type,
        audit: this.permission
      };
      const result = await auditFace(params);
      if (handleOpResult(result)) {
        this.$Message.success({ content: '审核通过', background: true });
      } else
        this.$Message.error({
          content: `审核失败, 原因: ${result.msg}`,
          background: true
        });
      this.$emit('closeModals');
    }
  }
};
</script>

<style lang="less" scoped>
.face-auidt {
  height: 30rem;
  img {
    width: 20rem;
    height: 20rem;
    margin: 2rem 25%;
  }
}
</style>
