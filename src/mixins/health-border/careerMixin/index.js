const careerList = [
  {
    key: 0,
    info: '全部职位'
  },
  {
    key: 1,
    info: '园所管理员'
  },
  {
    key: 2,
    info: '主班教师'
  },
  {
    key: 3,
    info: '配班'
  },
  {
    key: 4,
    info: '体育老师'
  },
  {
    key: 5,
    info: '开发专用角色'
  },
  {
    key: 6,
    info: '测试主任'
  }
];

export default {
  data() {
    return {
      careerTitle: '',
      careerList: []
    }
  },
  methods: {
    getCareerList() {
      const result = careerList,
        dataList = result.data;
      this.careerTitle = dataList[0].info ? dataList[0].info : '';
      this.careerList = dataList;
    },
    selectCareer(selectCareer) {
      this.careerTitle = selectCareer;
    }
  },
  created() {
    this.getCareerList();
  }
}