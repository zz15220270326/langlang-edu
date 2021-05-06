<template>
  <div class="add-holiday-type">
    <row-item>
      <Tag slot="tag" class="holiday-tag" color="success">
        假期类型
      </Tag>
      <Input
        slot="content"
        class="holiday-input"
        v-model="inputHolidayType"
        placeholder="请输入节假日类型..."
        width="200px"
      />
    </row-item>
    <row-item>
      <Tag slot="tag" class="comment-tag" color="warning">
        假期备注
      </Tag>
      <Input
        slot="content"
        class="comment-input"
        v-model="inputComment"
        placeholder="请输入假期备注"
        type="textarea"
        :rows="5"
        width="200px"
      />
    </row-item>
    <btns :operations="operations" @handleBottomOperations="handleOperations" />
  </div>
</template>

<script>
// ? components
import RowItem from '@common/modal-row-item';
import Btns from '@common/modal-bottom-btns';
// ? request
import { addHolidayType, editHolidayType } from '@/request/attdance';

// ? utils
import { handleOpResult, handleErrorCode } from '@/utils';

// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'AddHolidayType',
  components: {
    RowItem,
    Btns
  },
  data: () => ({
    inputHolidayType: '',
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
      default: -1
    },
    name: {
      type: String,
      default: ''
    },
    comment: {
      type: String,
      default: ''
    }
  },
  watch: {
    name(newVal) {
      this.inputHolidayType = newVal;
    },
    comment(newVal) {
      this.inputComment = newVal;
    }
  },
  computed: {
    ...mapState(['gardenId'])
  },
  methods: {
    handleOperations(btnTag) {
      switch (btnTag) {
        case '确认':
          this.handleSubmit();
          break;
        case '取消':
          this.handleCancel();
          break;
      }
    },
    handleSubmit() {
      if (this.id <= 0) {
        this.handleAdd();
      } else {
        this.handleEdit();
      }
    },
    handleAdd() {
      if (this.inputHolidayType === '') {
        this.$Message.warning('请输入假期类型');
        return;
      }
      const params = {
        name: this.inputHolidayType,
        comment: this.inputComment,
        type: 'add'
      };
      this.$Modal.confirm({
        title: '添加',
        content: '确认操作?',
        onOk: () => this.confirmAdd(params),
        onCancel: () => this.handleCancel()
      });
    },
    async confirmAdd(params) {
      const result = await addHolidayType(params);
      if (handleOpResult(result)) {
        this.$Message.success('添加成功');
        this.$emit('refreshPage');
      } else {
        this.$Message.error(`添加失败, 原因: ${handleErrorCode(result.code)}`);
      }
      this.$emit('closeModal');
    },
    handleEdit() {
      if (this.inputHolidayType === '') {
        this.$Message.warning('请输入假期类型');
        return;
      }
      const params = {
        id: this.id,
        type: 'edit',
        name: this.inputHolidayType,
        comment: this.inputComment
      };
      this.$Modal.confirm({
        title: '添加',
        content: '确认操作?',
        onOk: () => this.confirmEdit(params),
        onCancel: () => this.handleCancel()
      });
    },
    async confirmEdit(params) {
      const result = await editHolidayType(params);
      if (handleOpResult(result)) {
        this.$Message.success('编辑成功');
        this.$emit('refreshPage');
      } else {
        this.$Message.error(`添加失败, 原因: ${handleErrorCode(result.code)}`);
      }
      this.$emit('closeModal');
    },
    handleCancel() {
      this.$Message.info('您取消了本次操作');
      this.$emit('closeModal');
    }
  }
};
</script>

<style lang="less" scoped>
.add-holiday-type {
  height: 30rem;
}
</style>
