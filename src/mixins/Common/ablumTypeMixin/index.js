// ? mock / request
const ablumTypeList = [
  {
    info: '全部相册分类',
    type: '',
    key: 0
  },
  {
    info: '幼儿作品',
    type: 'ChildrenWork',
    key: 1
  },
  {
    info: '活动风采',
    key: 2,
    type: 'Activities'
  }
];

export default {
  data() {
    return {
      ablumTypeTitle: '',
      ablumTypeList: [],
      ablumType: 'ChildrenWork'
    };
  },
  methods: {
    getAblumTypeData() {
      this.ablumTypeTitle = ablumTypeList[0].info;
      this.ablumType = ablumTypeList[0].type;
      this.ablumTypeList = ablumTypeList;
    },
    selectAblumType(item) {
      // console.log(item);
      this.ablumTypeTitle = item.info;
      this.ablumType = item.type;
    }
  },
  created() {
    this.getAblumTypeData();
  }
}