<template>
  <div class="plan-modal-content">
    <top />
    <div class="content">
      <my-content
        :titleList="planInfos.titleList"
        :dataList="planInfos.dataList"
        :tableIsLoading="planTableIsLoading"
        @editItem="editItem"
      />
    </div>
    <bottom
      class="bottom-wrapper"
      :operations="operations"
      size="large"
      @handleBottomOperations="handleBottom"
    />
  </div>
</template>

<script>
import './index.less';
// ? import components
import MyContent from 'HomePage/SystemManagement/SMTable';

import Top from './Top';
import Bottom from '@common/modal-bottom-btns';
// ? request
import { setClassboardInfo } from '@/request/system-management';
// ? utils
import {
  // ? request
  handleOpResult
} from '@/utils';
// ? data
import { titleList, dataList } from './data';
// ? bus
import ccBus from '../ccBus';

export default {
  name: 'PlanModalContent',
  components: {
    MyContent,

    Top,
    Bottom
  },
  data: () => ({
    operations: [
      {
        tag: '重置',
        type: 'primary',
        icon: 'ios-refresh-circle-outline'
      },
      {
        tag: '保存',
        type: 'success',
        icon: 'md-checkmark'
      },
      {
        tag: '取消',
        type: 'error',
        icon: 'md-close'
      }
    ],
    planInfos: {
      titleList,
      dataList
    },
    planTableIsLoading: false,
    openTime: '',
    closeTime: '',
    crtIdx: -1
  }),
  props: {
    ids: {
      type: [String, Number],
      default: ''
    },
    propItem: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    propItem(newItem) {
      if (Object.keys(newItem).length) {
        this.initEdit(newItem);
      } else
        this.planInfos.dataList.forEach(item => {
          item.openTime = '';
          item.closeTime = '';
        });
    }
  },
  computed: {},
  methods: {
    initEdit({ start, end }) {
      if (start && end) {
        start.map((item, index) => {
          this.planInfos.dataList[index].openTime = item;
          this.planInfos.dataList[index].closeTime = end[index];
        });
      } else
        this.planInfos = {
          titleList,
          dataList
        };
    },
    handleUseInEveryday({ openTime, closeTime }) {
      this.planInfos.dataList.forEach(item => {
        item.openTime = openTime;
        item.closeTime = closeTime;
      });
    },
    editItem(crtIdx = 0) {
      const { week } = this.planInfos.dataList[crtIdx];
      this.$Modal.confirm({
        title: `编辑${week}的开关机方案`,
        render: h => {
          return h('TimePicker', {
            props: {
              placeholder: '请选择时间范围',
              type: 'timerange',
              placement: 'bottom-end',
              size: 'large'
            },
            on: {
              input: ([openTime, closeTime]) => {
                this.openTime = openTime;
                this.closeTime = closeTime;
              }
            }
          });
        },
        onOk: () => {
          this.planInfos.dataList[crtIdx].openTime = this.openTime;
          this.planInfos.dataList[crtIdx].closeTime = this.closeTime;
          this.openTime, (this.closeTime = '');
        }
      });
    },
    handleBottom(btnTag) {
      switch (btnTag) {
        case '重置':
          this.resetTime();
          break;
        case '保存':
          this.handleSave();
          break;
        case '取消':
          this.closeModals();
          break;
      }
    },
    resetTime() {
      this.$Modal.confirm({
        title: '重置时间',
        content: '是否重置',
        onOk: () => {
          this.planInfos.dataList.forEach(item => {
            item.openTime = '';
            item.closeTime = '';
          });
          this.$Message.info('已重置内容');
        }
      });
    },
    handleSave() {
      this.$Modal.confirm({
        title: '保存设置的时间方案',
        content: '确认操作?',
        onOk: () => {
          this.confirmSave();
        }
      });
    },
    async confirmSave() {
      const params = {
        ids: this.ids,
        type: 'open',
        open_time: {
          start: this.planInfos.dataList.map(item => item.openTime),
          end: this.planInfos.dataList.map(item => item.closeTime)
        }
      };
      // console.log(params);
      const result = await setClassboardInfo(params);
      if (handleOpResult(result)) {
        this.$Message.success('操作成功');
        this.$emit('refreshPage');
      } else this.$Message.error(`操作失败, 原因: ${result.msg}`);
      this.$emit('closeModals');
    },
    closeModals() {
      this.$emit('closeModals');
      this.planInfos.dataList.forEach(item => {
        item.openTime = '';
        item.closeTime = '';
      });
    }
  },
  /**
   * @description
   * * Vue2.x生命周期
   */
  mounted() {
    ccBus.$on('handleUseInEveryday', params =>
      this.handleUseInEveryday(params)
    );
  },
  beforeDestroy() {
    ccBus.$off('handleUseInEveryday');
  }
};
</script>
