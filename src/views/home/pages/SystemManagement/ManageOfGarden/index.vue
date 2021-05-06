<template>
  <div class="garden-info">
    <Tabs name="base">
      <TabPane label="基本信息" name="base">
        <base-info :propItems="bases" ref="base" />
      </TabPane>
      <TabPane label="其他信息" name="other">
        <other-info :propItems="others" ref="other" />
      </TabPane>
    </Tabs>
    <div class="confirm-wrapper">
      <confirm
        :operations="operations"
        size="large"
        @handleBottomOperations="handleSave"
      />
    </div>
  </div>
</template>

<script>
import './index.less';
// ? components
import BaseInfo from './components/base-info';
import OtherInfo from './components/other-info';

import Confirm from '@common/modal-bottom-btns';

// ? request
import { getGardenInfo, editGardenInfo } from '@/request/system-management';
import { getPicById } from '@/request/Common';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleOpResult,
  // ? arr / obj
  deepCopyObj
} from '@/utils';

export default {
  name: 'GardenInfo',
  components: {
    BaseInfo,
    OtherInfo,

    Confirm
  },
  data: () => ({
    operations: [
      // {
      //   tag: '基本信息',
      //   type: 'primary'
      // },
      // {
      //   tag: '其他信息',
      //   type: 'default'
      // }
      {
        tag: '保存',
        type: 'success'
      }
    ],
    crtIdx: 0,
    bases: {},
    others: {}
  }),
  methods: {
    getCurrentInfo(crtIdx) {
      this.crtIdx = crtIdx;
      this.operations.forEach((item, index) => {
        index === crtIdx ? (item.type = 'primary') : (item.type = 'default');
      });
    },
    async handleGetGarden(params = {}) {
      const result = await getGardenInfo(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);

        this.setBasesInfo(data);
        this.setOtherInfo(data);
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
    },
    setBasesInfo({ GardenDetails, edubureau, edubureauId }) {
      this.bases = {
        GardenName: GardenDetails.GardenName,
        edubureau,
        edubureauId,
        GardenType: GardenDetails.GardenType,
        NatureOfGarden: GardenDetails.NatureOfGarden,
        PhoneNumber: GardenDetails.PhoneNumber,
        ProvinceId: GardenDetails.ProvinceId || '',
        CityId: GardenDetails.CityId || '',
        AreaId: GardenDetails.AreaId || '',
        DetailAddress: GardenDetails.DetailAddress
      };
    },
    async setOtherInfo({ GardenDetails }) {
      this.others = {
        SchoolMotto: GardenDetails.SchoolMotto,
        CulturalConcept: GardenDetails.CulturalConcept,
        GardenIntroduce: GardenDetails.GardenIntroduce,
        AlbumId: GardenDetails.AlbumId,
        image: await this.getBadgeById(GardenDetails.AlbumId)
      };
    },
    async getBadgeById(icon) {
      const result = await getPicById({ icon });
      if (result.data) {
        return result.data;
      } else return this.$store.state.platformUrl;
    },
    handleSave() {
      this.$Modal.confirm({
        title: '保存',
        content: '确认保存当前的园所信息?',
        onOk: () => this.confirmSave()
      });
    },
    async confirmSave() {
      const { baseInfo } = this.$refs.base;
      const { otherInfo } = this.$refs.other;
      const params = Object.assign({}, baseInfo, otherInfo),
        result = await editGardenInfo(params);
      if (handleOpResult(result)) {
        this.$Message.success({
          content: '操作成功',
          background: true
        });
        this.handleGetGarden();
      } else
        this.$Message.error({
          content: `操作失败, 原因: ${result.msg}`
        });
    }
  },
  created() {
    this.$Spin.show();
    this.handleGetGarden();
  },
  mounted() {
    this.$Spin.hide();
  }
};
</script>

<!-- <div class="top">
      <Button
        v-for="(item, key) in operations"
        :key="key"
        :type="item.type"
        @click.native="getCurrentInfo(key)"
      >
        {{ item.tag }}
      </Button>
    </div> -->
<!-- <div class="content" v-show="crtIdx === 0">
      <base-info />
    </div>
    <div class="content" v-show="crtIdx === 1">
      <other-info />
    </div> -->
