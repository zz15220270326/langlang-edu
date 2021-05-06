<template>
  <div class="attdance">
    <div class="garden">
      <div class="title">
        <div>园所出勤情况</div>
        <Button
          v-show="isShowGarden"
          type="text"
          @click.native="handleGardenModal"
        >
          <span>
            更多详情
            <Icon type="ios-arrow-forward" />
          </span>
        </Button>
      </div>
      <div class="content">
        <column-picture :chartStyle="chartStyle" :render="render" />
      </div>
    </div>
    <div class="class">
      <div class="title">
        <div>班级出勤情况</div>
        <Button
          v-show="isShowClass"
          type="text"
          @click.native="handleClassModal"
        >
          <span>
            更多详情
            <Icon type="ios-arrow-forward" />
          </span>
        </Button>
      </div>
      <div class="content">
        <main-table
          :tableIsLoading="tableIsLoading"
          :titleList="classColumns"
          :dataList="classData"
        />
      </div>
    </div>
    <!-- modal-content -->
    <Modal
      class-name="garden-modal"
      v-model="isShowGardenModal"
      :title="modalTitle"
      width="1000"
      :footer-hide="true"
    >
      <garden-info @hideGardenInfo="hideGardenInfo" />
    </Modal>
    <Modal
      class-name="class-modal"
      v-model="isShowClassModal"
      :title="modalTitle"
      width="1000"
      :footer-hide="true"
    >
      <class-info @hideClassInfo="hideClassInfo" />
    </Modal>
    <!--  -->
  </div>
</template>

<script>
import './index.less';
// ? components
import ColumnPicture from '@common/echart/ColumnPicture';
import MainTable from 'HomePage/GardenMain/MainTable';
import GardenInfo from './components/GardenInfo';
import ClassInfo from './components/ClassInfo';
// ? utils
import { classColumns } from './data';
import { formatInfoToList, setColumnData } from './function';

export default {
  name: 'GardenAttdance',
  components: {
    ColumnPicture,
    MainTable,
    GardenInfo,
    ClassInfo
  },
  data: () => ({
    isShowGarden: true,
    isShowClass: true,
    // ? table-data
    tableIsLoading: false,
    classColumns,
    classData: [],
    // ? columns-data
    chartStyle: {
      width: '38rem',
      height: '20rem'
    },
    render: {},
    // ? modal-data
    modalTitle: '',
    // ?? garden-modal
    isShowGardenModal: false,
    // ?? class-modal
    isShowClassModal: false
  }),
  props: {
    classChecking: {
      type: Array,
      default: () => []
    },
    gardenChecking: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    classChecking(newVal) {
      this.setClassAttdence(newVal);
    },
    gardenChecking(newVal) {
      this.formatColumn(newVal);
    }
  },
  methods: {
    // ? content
    setClassAttdence(newList = []) {
      this.classData = [];
      if (newList.length) {
        newList.map((item, index) => {
          const { sumBabys, Attendance, date, sumDays } = item.checking;
          this.classData.push({
            number: index + 1,
            id: item.id,
            teacherNums: item.teacherNums,
            grade: item.grade,
            className: item.name,
            shouldArrive: sumBabys,
            isArrived: Attendance,
            absense: sumBabys - Attendance,
            attdancePresent: `${(Attendance / sumBabys).toString()}%`,
            date,
            sumDays
          });
        });
      }
    },
    formatColumn(infos = {}) {
      const infoList = formatInfoToList(infos);
      this.render = setColumnData(infoList);
    },
    // ? modals
    handleGardenModal() {
      this.modalTitle = '园所出勤状况';
      this.isShowGardenModal = true;
    },
    handleClassModal() {
      this.modalTitle = '班级考勤状况';
      this.isShowClassModal = true;
    },
    hideClassInfo() {
      this.isShowClass = false;
    },
    hideGardenInfo() {
      this.isShowGarden = false;
    }
  }
};
</script>
