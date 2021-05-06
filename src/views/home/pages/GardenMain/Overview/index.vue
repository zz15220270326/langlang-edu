<template>
  <div class="garden-main">
    <div class="main-content">
      <garden-attdance
        :gardenChecking="gardenChecking"
        :classChecking="classChecking"
      />
      <garden-scale
        :gardenSexStat="gardenSexStat"
        :gardenNationStat="gardenNationStat"
      />
      <all-class-info :classChecking="classChecking" />
    </div>
  </div>
</template>

<script>
// ? import components
import GardenAttdance from './components/GardenAttdance';
import GardenScale from './components/GardenScale';
import AllClassInfo from './components/AllClassInfo';

// ? request
import { getPreviewList } from '@/request/garden-main';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleErrorCode,
  // ? obj / arr
  deepCopyObj,
  // ? storage
  localGet,
  localSave
} from '@/utils';
// ? configs
import { garden } from '@/config';

export default {
  name: 'GardenPreview',

  components: {
    GardenAttdance,
    GardenScale,
    AllClassInfo
    // GardenHealthInfo
  },

  data: () => ({
    classChecking: [],
    gardenChecking: {},
    gardenSexStat: {},
    gardenNationStat: []
  }),

  props: {},

  computed: {},

  methods: {
    async getPreviewData() {
      const result = await getPreviewList(),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        // console.log(data)
        // ! 存储班级信息
        this.$nextTick(() => {
          this.classChecking = data.classChecking ? data.classChecking : [];
          this.saveClassInfos(data.classChecking);
          // ! 存储园所信息
          this.gardenChecking = data.gardenChecking ? data.gardenChecking : {};
          this.saveGardenInfos(data.gardenChecking);
          this.gardenSexStat = data.gardenSexStat ? data.gardenSexStat : {};
          this.gardenNationStat = data.gardenNationStat
            ? data.gardenNationStat
            : [];
        });
      } else
        this.$Message.error(
          `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    saveClassInfos(classChecking = []) {
      if (!localGet(garden.CLASS_INFO)) {
        const classInfo = classChecking.map((item, index) => ({
          key: index + 1,
          classId: item.id,
          grade: item.grade,
          info: item.name,
          teacherNums: item.teacherNums
        }));
        localSave(garden.CLASS_INFO, classInfo);
      }
    },
    saveGardenInfos() {
      /**
       * @param { infos } gardenSourceInfo
       */
    }
  },

  created() {
    this.getPreviewData();
  }
};
</script>

<style lang="less" scoped>
.garden-main {
  .total-title {
    width: 100%;
    background-color: #f6f6f6;
    padding: 0.8rem;
    color: #36adea;
    font-size: 1.08rem;
  }
  .main-content {
    background-color: #fff;
    height: 100vh;
    overflow-y: auto;
  }
}
</style>
