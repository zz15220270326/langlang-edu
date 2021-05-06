<template>
  <div class="edit-content">
    <div class="my-content">
      <div class="tag">教师姓名</div>
      <div class="content">
        <Input
          :value="teacherName"
          class="read-input"
          placeholder="请输入教师姓名"
          readonly
        />
      </div>
    </div>
    <div class="my-content">
      <div class="tag">日期</div>
      <div class="content">
        <Input
          :value="pickDate"
          class="read-input"
          placeholder="当前日期"
          :readonly="true"
        />
      </div>
    </div>
    <div class="my-content">
      <div class="tag">当前班次</div>
      <div class="content">
        <Input
          :value="className"
          class="read-input"
          placeholder="当前班级"
          :readonly="true"
        />
      </div>
    </div>
    <div class="my-content">
      <div class="tag">调整班次为</div>
      <div class="content">
        <select-menu
          :listTitle="classTimeTitle"
          :listItems="classTimeList"
          @handleSelect="selectClassTime"
        />
      </div>
    </div>
    <div class="note">
      <div>备注: 班次调整后, 立即生效</div>
    </div>
    <btns :operations="operations" @handleBottomOperations="handleOp" />
  </div>
</template>

<script>
// ? common components
import { SelectMenu } from '@common/select-menu';
import Btns from '@common/modal-bottom-btns';

// ? request
import { getClassesList, editSchedule } from '@/request/attdance';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleErrorCode,
  handleOpResult,
  // ? arr / obj
  deepCopyObj
} from '@/utils';

export default {
  name: 'EditContent',
  components: {
    SelectMenu,
    Btns
  },
  data: () => ({
    operations: [
      {
        tag: '确认',
        type: 'success'
      },
      {
        tag: '取消',
        type: 'error'
      }
    ],
    classTimeTitle: '',
    classTimeList: [],
    shiftId: 0
  }),
  props: {
    id: {
      type: Number,
      default: -1
    },
    teacherName: {
      type: String,
      default: ''
    },
    pickDate: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    classList: {
      type: Array,
      default: () => []
    },
    crtYear: {
      type: String,
      default: '0000'
    }
  },
  methods: {
    async getSelectItems(params = {}) {
      const result = await getClassesList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        data.items && this.setClassTimes(data.items);
      } else
        this.$Message.error(
          `请求失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    setClassTimes(list = []) {
      // console.log(list)
      this.classTimeTitle = list[0].name;
      this.shiftId = list[0].id;
      this.classTimeList = [];
      list.map((item, index) =>
        this.classTimeList.push({
          key: index,
          id: item.id,
          pId: item.pid,
          gardenId: item.garden_id,
          userId: item.user_id,
          info: item.name
        })
      );
    },
    selectClassTime(selectItem) {
      const { id, info } = selectItem;
      this.classTimeTitle = info;
      this.shiftId = id;
    },
    handleOp(tag) {
      switch (tag) {
        case '确认':
          this.handleSubmit();
          break;
        case '取消':
          this.closeModals();
          break;
      }
    },
    handleSubmit() {
      this.$Modal.confirm({
        title: '编辑排班',
        content: '确认操作 ? ',
        onOk: () => this.editSingle()
      });
    },
    async editSingle() {
      const params = {
        date: `${this.crtYear}-${this.pickDate}`,
        uid: this.id,
        shift_id: this.shiftId
      };
      console.log(params);
      const result = await editSchedule(params);
      if (handleOpResult(result)) {
        this.$Message.success('编辑成功');
        this.$emit('refreshPage');
      } else this.$Message.error(`编辑失败, 原因: ${result.msg}`);
      this.$emit('closeModals');
    },
    closeModals() {
      this.$Message.info('您取消了本次操作');
      this.$emit('closeModals');
    }
  },
  created() {
    this.getSelectItems();
  }
};
</script>

<style lang="less" scoped>
#flex-center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.common-style {
  padding-top: 0.8rem;
  #flex-center;
  .tag {
    flex: 3;
    #flex-center;
  }
  .content {
    flex: 7;
    .read-input {
      width: 16rem;
    }
    .select-menu {
      position: relative;
      top: 0.36rem;
      left: 6rem;
    }
  }
}
.edit-content {
  width: 100%;
  height: 25rem;
  .my-content {
    .common-style;
  }
  .note {
    margin-top: 2rem;
    width: 100%;
    text-align: center;
  }
}
</style>
