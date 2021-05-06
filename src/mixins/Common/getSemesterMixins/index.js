export default {
  data() {
    return {
      semesterTitle: '',
      semesterList: [{
          info: '全部学期',
          key: 0,
        },
        {
          info: '第一学期',
          key: 1
        },
        {
          info: '第二学期',
          key: 2
        },
      ],
      semester: 0
    }
  },
  methods: {
    initSemester() {
      this.semesterTitle = this.semesterList[0].info;
    },
    selectSemester(selectSemester) {
      this.semesterTitle = selectSemester.info;
      this.semester = selectSemester.key;
      this.$emit('uploadSemester', selectSemester.key);
    }
  },
  created() {
    this.initSemester();
  }
}