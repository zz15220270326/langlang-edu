<template>
  <Card class="edit-all">
    <div class="edit-item" v-for="(item, idx) of editItems" :key="item.typeId">
      <Tag class="tag" color="skyblue" size="large">
        编辑第{{ idx + 1 }}项计划类型
      </Tag>
      <Input class="input" v-model="item.typeName" maxlength="12" />
    </div>
    <div class="bottom">
      <Button type="primary" @click.native="confirm">
        确认
      </Button>
      <Button type="error" @click.native="cancel">取消</Button>
    </div>
  </Card>
</template>

<script>
// ? async-functions / mock-data
import { editPlanType } from '@/request/plan/1-class-plan';

export default {
  name: 'EditAllContent',
  data: () => ({
    editItems: []
  }),
  props: {
    propItems: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    propItems(newValue) {
      this.editItems = newValue.length > 0 ? newValue : [];
    }
  },
  methods: {
    confirm() {
      this.$Message.info('确认批量编辑');
      this.$Modal.confirm({
        title: '批量编辑',
        content: '是否保存编辑内容?',
        onOk: () => this.editAllType(),
        onCancel: () => {
          this.$Message.info('您取消了本次操作');
          this.$emit('closeEditModal', 'keep');
        }
      });
    },
    async editAllType() {
      let typeIdArr = [],
        typeNameArr = [];
      this.editItems.map(item => {
        typeIdArr.push(item.typeId);
        typeNameArr.push(item.typeName);
      });
      let typeId = typeIdArr.toString(),
        typeName = typeNameArr.toString();

      console.log(typeId);
      console.log(typeName);

      const result = await editPlanType(typeId, typeName);
      console.log(result);
      if (result.status === 'Success') {
        this.$Message.success('编辑成功');
        this.$emit('closeEditModal', 'refresh');
      } else {
        this.$Message.error(
          `编辑失败, 原因: ${result.msg ? result.msg : '服务器繁忙'}`
        );
        this.$emit('closeEditModal', 'keep');
      }
    },
    cancel() {
      this.$Message.error('取消编辑');
      this.$emit('closeEditModal', 'keep');
    }
  }
};
</script>

<style lang="less" scoped>
.edit-all {
  height: 23rem;
  overflow-y: auto;
  .edit-item {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .tag {
      flex: 1;
      text-align: center;
    }
    .input {
      flex: 4;
      margin: 0 1rem;
    }
  }
  .bottom {
    padding: 0.8rem 0;
    text-align: center;
    .ivu-btn {
      width: 5.2rem;
      margin: 0 0.75rem;
    }
  }
}
</style>
