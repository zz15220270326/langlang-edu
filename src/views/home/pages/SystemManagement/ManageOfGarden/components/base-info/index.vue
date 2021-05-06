<template>
  <div class="garden-base-info">
    <base-item>
      <Tag slot="tag" color="pink" size="large">
        园所名称
      </Tag>
      <Input
        slot="content"
        v-model="baseInfo.GardenName"
        placeholder="请输入园所名称"
      />
    </base-item>
    <base-item>
      <Tag slot="tag" color="red" size="large">
        所在辖区
      </Tag>
      <Input
        slot="content"
        placeholder="所在辖区"
        v-model="baseInfo.edubureau"
        :readonly="true"
      />
    </base-item>
    <base-item>
      <Tag slot="tag" color="purple" size="large">
        园所类别
      </Tag>
      <Select slot="content" v-model="baseInfo.GardenType">
        <Option
          v-for="item of gardenTypes"
          :key="item.value"
          :value="item.value"
        >
          {{ item.label }}
        </Option>
      </Select>
    </base-item>
    <base-item>
      <Tag slot="tag" color="blue" size="large">
        办园性质
      </Tag>
      <Select slot="content" v-model="baseInfo.NatureOfGarden">
        <Option
          v-for="item of gardenNatures"
          :key="item.value"
          :value="item.value"
        >
          {{ item.label }}
        </Option>
      </Select>
    </base-item>
    <base-item>
      <Tag slot="tag" color="gold" size="large">
        联系方式
      </Tag>
      <Input
        slot="content"
        maxlength="11"
        placeholder="请输入联系方式"
        v-model="baseInfo.PhoneNumber"
      />
    </base-item>
    <base-item>
      <Tag slot="tag" color="orange" size="large">
        省-市-区
      </Tag>
      <Cascader
        slot="content"
        size="large"
        placeholder="请选择省-市-区"
        trigger="hover"
        :data="pccData"
        v-model="pcaInfo"
      ></Cascader>
    </base-item>
    <base-item>
      <Tag slot="tag" color="volcano" size="large">
        详细地址
      </Tag>
      <Input
        slot="content"
        v-model="baseInfo.DetailAddress"
        placeholder="请输入详细地址"
      />
    </base-item>
  </div>
</template>

<script>
// ? components
import BaseItem from './BaseItem';

// ? data
import { gardenTypes, gardenNatures, pccData } from './data';

// ? mapState
import { mapState } from 'vuex';

// ? mixins

export default {
  name: 'BaseInfo',
  components: {
    BaseItem
  },
  data: () => ({
    gardenTypes,
    gardenNatures,
    pccData,
    baseInfo: {
      GardenName: '',
      edubureau: '广东省深圳市宝安区(默认)',
      GardenType: -1,
      NatureOfGarden: -1,
      PhoneNumber: '',
      // ??? 省市区
      ProvinceId: '',
      CityId: '',
      AreaId: '',
      DetailAddress: ''
    },
    pcaInfo: []
  }),
  props: {
    propItems: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    propItems(newProps) {
      this.initItems(newProps);
    }
  },

  computed: {
    ...mapState([])
    // ,pcaArr: {
    //   get() {
    //     return [
    //       this.baseInfo.ProvinceId,
    //       this.baseInfo.CityId,
    //       this.baseInfo.AreaId
    //     ]
    //   },
    //   set([ProvinceId, CityId, AreaId]) {
    //     this.baseInfo.ProvinceId = ProvinceId
    //     this.baseInfo.CityId = CityId
    //     this.baseInfo.AreaId = AreaId
    //   }
    // }
  },

  methods: {
    initItems(newProps) {
      const {
        GardenName,
        edubureau,
        GardenType,
        NatureOfGarden,
        PhoneNumber,
        ProvinceId,
        CityId,
        AreaId,
        DetailAddress
      } = newProps;
      this.baseInfo = {
        GardenName: GardenName || '',
        edubureau: edubureau || '',
        GardenType: GardenType || -1,
        NatureOfGarden: NatureOfGarden || -1,
        PhoneNumber: PhoneNumber || '',
        ProvinceId,
        CityId,
        AreaId,
        DetailAddress: DetailAddress || ''
      };
      this.pcaInfo = [ProvinceId, CityId, AreaId];
    }
  },

  created() {}
};
</script>

<style lang="less" scoped>
.garden-base-info {
  margin-top: 3.6rem;
}
</style>
