<template>
  <div class="avatar-wrapper">
    <Tabs v-if="curImg.length">
      <TabPane label="当前照片" name="img">
        <img :src="curImg" alt="" />
      </TabPane>
      <TabPane label="审核状态" name="status">
        <Button
          :type="
            status === '审核拒绝'
              ? 'error'
              : status === '审核通过'
              ? 'success'
              : 'info'
          "
          size="large"
          @click.native="handleCheck(status)"
        >
          {{ status }}
        </Button>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
// ? request
import { auditFace } from '@/request/children-profile';
// ? utils
import {
  // ? request
  handleOpResult,
  // ? arr / obj
  deepCopyObj
} from '@/utils';

export default {
  name: 'FaceAvatar',
  props: {
    curImg: {
      type: String,
      default: ''
    },
    permision: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: '审核拒绝'
    },
    checkParams: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleCheck(status) {
      if (this.permision === 0) {
        // ? 不能审核
        this.$Message.info({
          content: '本人脸图像不能审核!',
          background: true
        });
      } else if (this.permision === 1) {
        // ? 可以审核
        // ?? 判断是否已经审核
        if (status === '审核通过') {
          this.$Message.warning({
            content: '审核已通过, 无法再次审核',
            background: true
          });
          return;
        }
        this.$Modal.confirm({
          title: '审核幼儿头像',
          content: '确认操作?',
          onOk: () => this.confirmCheck()
        });
      }
    },
    async confirmCheck() {
      const params = deepCopyObj(this.checkParams),
        result = await auditFace(params);
      if (handleOpResult(result)) {
        this.$Message.success({
          content: '您已查看本次审核',
          background: true
        });
        setTimeout(() => {
          this.$emit('closeCheck');
        }, 600);
      } else this.$Message.error(`审核失败, 原因: ${result.msg}`);
    }
  }
};
</script>

<style lang="less" scoped>
.avatar-wrapper {
  height: 25rem;
  text-align: center;
  img {
    width: 20rem;
    height: 20rem;
    margin: 1.2rem 0;
  }
}
</style>
