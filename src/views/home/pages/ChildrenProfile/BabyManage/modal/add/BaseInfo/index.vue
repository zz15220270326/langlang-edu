<template>
  <Card class="infos">
    <div class="base-info">
      <input-infos :eInput="eInput" @getInputParams="getInputParams" />
      <upload-infos :eIcon="eIcon" @getImg="getIcon" />
    </div>
    <div class="add-wrapper">
      <add-infos :eParents="eParents" @getParentList="getParentParams" />
      <add-btns />
    </div>
  </Card>
</template>

<script>
// ? styles
import './index.less';
// ? import components
import InputInfos from './InputInfos';
import UploadInfos from './UploadInfos';
import AddInfos from './AddInfos';
import AddBtns from './AddBtns';

export default {
  name: 'BaseInfo',
  components: {
    InputInfos,
    UploadInfos,
    AddInfos,
    AddBtns
  },
  data: () => ({
    // ? 幼儿信息
    // ? 图片信息
    // ? 父母信息列表
    // ? upload-params
    inputParams: {},
    iconParams: {},
    selectParams: {},
    parentParams: {},

    eInput: {},
    eIcon: {},
    eParents: []
  }),
  props: {
    myInfant: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    // ? submit
    inputParams() {
      this.combineParams();
    },
    iconParams() {
      this.combineParams();
    },
    selectParams() {
      this.combineParams();
    },
    parentParams() {
      this.combineParams();
    },
    // ? edits
    myInfant(editInfantInfo) {
      this.dispatchEdits(editInfantInfo);
    }
  },
  // computed: {
  //   // params() {
  //   //   const params = Object.assign(
  //   //     {},
  //   //     this.inputParams,
  //   //     this.iconParams,
  //   //     this.selectParams,
  //   //     this.parentParams
  //   //   )
  //   //   this.$emit('getBaseInfo', params)
  //   //   return params
  //   // }
  // },
  methods: {
    // ? 获取参数
    getInputParams(inputParams) {
      this.inputParams = inputParams;
    },
    getIcon(icon) {
      this.iconParams =
        {
          icon: icon.pId,
          url: icon.src
        } || {};
      // console.log(this.iconParams);
    },
    getParentParams(parentList) {
      const paramsList = parentList.map(item => {
        const newItem = {
          relation: item.pTitle || '',
          name: item.pName || '',
          phone: item.pPhone || '',
          card: item.pCard || '',
          sex: item.sex || 0
        };
        if (item.id) {
          newItem.id = item.id;
        }
        return newItem;
      });
      // console.log(paramsList)
      this.parentParams = {
        // parent: JSON.stringify(paramsList)
        parent: paramsList
      };
    },
    // ? 分配edit参数
    dispatchEdits(editInfos = {}) {
      this.setInput(editInfos);
      this.setIcon(editInfos);
      this.setAvatar(editInfos);
      this.setParents(editInfos);
    },
    setInput({ NickName, sex, nation, birthday, InGardenDate, ClassId, id }) {
      this.eInput = {
        NickName,
        sex,
        nation,
        birthday,
        InGardenDate,
        ClassId,
        id
      };
    },
    setIcon({ face }) {
      this.eIcon = { face };
    },
    setAvatar({ AlbumId, AlbumUrl }) {
      this.eIcon = {
        pId: AlbumId,
        src: AlbumUrl
      };
    },
    setParents({ parents }) {
      this.eParents = parents;
    },
    // ? 将参数组合起来
    combineParams() {
      const params = Object.assign(
        {},
        this.inputParams,
        this.iconParams,
        this.selectParams,
        this.parentParams
      );
      this.$emit('getBaseInfo', params);
    }
  },
  created() {}
};
</script>
