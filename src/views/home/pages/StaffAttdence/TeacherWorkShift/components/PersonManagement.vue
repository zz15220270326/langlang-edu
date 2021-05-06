<template>
  <div class="person-management">
    <div class="wrapper">
      <div class="title">
        <span>选择排班周期</span>
        <select-menu
          :listTitle="classCircleTitle"
          :listItems="classCircleContent"
          @handleSelect="handleSelect"
        />
      </div>
      <div class="content">
        <Transfer
          :data="notScheduled"
          :target-keys="scheduled"
          @on-change="handleChange"
          :filterable="true"
          not-found-text=""
          :titles="titles"
        ></Transfer>
      </div>
    </div>
    <btns :operations="operations" @handleBottomOperations="handleOperations" />
  </div>
</template>

<script>
// ? components
import { SelectMenu } from '@common/select-menu';
import Btns from '@common/modal-bottom-btns';

// ? request
import { arrangeClasses } from '@/request/attdance';
// ? utils
import { handleOpResult } from '@/utils';

export default {
  name: 'PersonManagement',
  components: {
    SelectMenu,
    Btns
  },
  data: () => ({
    titles: ['待排班列表', '已排班列表'],
    notScheduled: [],
    scheduled: [],
    classCircleTitle: '请选择周期',
    classCircleContent: [
      { info: '请选择周期', key: 0 },
      { info: '4周', key: 4 },
      { info: '8周', key: 8 },
      { info: '12周', key: 12 },
      { info: '16周', key: 16 },
      { info: '20周', key: 20 },
      { info: '24周', key: 24 }
    ],
    params: {},
    operations: [
      {
        tag: '保存',
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
    _scheduled: {
      type: Array,
      default: () => []
    },
    _notScheduled: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    id(id) {
      if (id > 0) {
        this.notScheduled = [];
        this._notScheduled.map((item, index) => {
          this.notScheduled.push({
            key: (index + 1).toString(),
            label: item.realname,
            id: item.id
          });
        });
        this._scheduled.map((item, index) => {
          this.notScheduled.push({
            key: (index + 1).toString(),
            label: item.realname,
            id: item.id
          });
        });
        const list = [];
        this.notScheduled.map(item1 => {
          if (this._scheduled.length > 0) {
            this._scheduled.map(item2 => {
              if (item1.id === item2.id) {
                list.push(item1.key);
              } else return -1;
            });
          } else return -1;
        });
        this.scheduled = list;
      }
    }
  },
  methods: {
    handleChange(newKey) {
      this.scheduled = newKey;
      // console.log(this.scheduled)
      if (this.scheduled.length > 0) {
        this.params.ids = this.scheduled
          .map(item => this.notScheduled[item * 1 - 1].id)
          .toString();
      } else delete this.params.ids;
    },
    handleSelect(item) {
      this.classCircleTitle = item.info;
      if (item.key > 0) {
        this.params.week = item.key;
      } else {
        delete this.params.week;
      }
    },
    handleOperations(btnTag) {
      switch (btnTag) {
        case '保存':
          this.handleSubmit();
          break;
        case '取消':
          this.handleCancel();
          break;
      }
    },
    handleSubmit() {
      if (!this.params.week) {
        this.$Message.warning('请选择排班的周期');
        return;
      }
      if (!this.params.ids) {
        this.$Message.warning('请选择要排班的教师');
        return;
      }
      this.$Modal.confirm({
        title: '排班',
        content: '确认操作?',
        onOk: () => {
          this.params.id = this.id;
          const params = JSON.parse(JSON.stringify(this.params));
          this.confirmArrange(params);
          console.log(params);
        }
      });
    },
    async confirmArrange(params) {
      const result = await arrangeClasses(params);
      if (handleOpResult(result)) {
        this.$Message.success('排班成功');
        this.$emit('refreshPage');
      } else {
        this.$Message.error(`排版失败, 原因: ${result.msg}`);
      }
      this.$emit('closeModals');
    },
    handleCancel() {
      this.$Message.info('您取消了本次操作');
      this.$emit('closeModals');
    }
  }
};
</script>

<style lang="less" scoped>
#flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.person-management {
  height: 20rem;
  .wrapper {
    #flex-center;
    .title {
      flex: 5;
      #flex-center;
      margin-bottom: 11.2rem;
    }
    .content {
      flex: 8;
      #flex-center;
    }
  }
}
</style>
