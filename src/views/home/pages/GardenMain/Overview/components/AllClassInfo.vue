<template>
  <div class="all-class-info" v-if="classDatas.length > 0">
    <div class="title">班级信息总览</div>
    <div class="content">
      <main-table
        :titleList="classColumns"
        :dataList="classDatas"
        :tableIsLoading="tableIsLoading"
        :height="500"
      />
      <!-- :height="360" -->
    </div>
  </div>
</template>

<script>
// ? import components
import MainTable from 'HomePage/GardenMain/MainTable';

export default {
  name: 'AllClassInfo',
  components: { MainTable },
  data: () => ({
    tableIsLoading: false,
    classColumns: [
      {
        title: '序号',
        key: 'number',
        align: 'center',
        width: 100
      },
      {
        title: '班级名称',
        key: 'className',
        align: 'center',
        width: 250
      },
      {
        title: '类型',
        key: 'type',
        align: 'center',
        width: 200
      },
      {
        title: '教师分配数量',
        key: 'teacherCount',
        align: 'center',
        width: 200
      },
      {
        title: '幼儿在册人数',
        key: 'childrenCount',
        align: 'center',
        width: 200
      }
    ],
    classDatas: []
  }),
  props: {
    classChecking: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    classChecking(newVal) {
      newVal.length && this.setClassData(newVal);
    }
  },
  methods: {
    setClassData(list) {
      list.map((item, index) => {
        this.classDatas.push({
          number: index + 1,
          className: item.name,
          type: this.getTypeByGrade(item.grade),
          teacherCount: item.teacherNums,
          childrenCount: item.checking.sumBabys
        });
      });
    },
    getTypeByGrade(grade) {
      switch (grade) {
        case 1:
          return '小班';
        case 2:
          return '中班';
        case 3:
          return '大班';
        default:
          return '';
      }
    }
  }
};
</script>

<style lang="less" scoped>
.all-class-info {
  color: #666;
  font-size: 1rem;
  width: 100%;
  height: 36rem;
  .title {
    font-weight: 600;
    font-size: 1.3rem;
    margin-left: 1.6rem;
    padding: 0.8rem 0;
  }
  .content {
    width: 100%;
    height: 30rem;
    // border: 1px solid #36adea;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1.2rem;
    position: relative;
    bottom: 3rem;
  }
}
</style>
