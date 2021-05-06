const gradeInfo = require('@/source/gradeInfo');

export default {
  data() {
    return {
      gradeTitle: '',
      gradeList: [],
      currentGrade: 0
    };
  },
  methods: {
    getGradeData() {
      const { data } = gradeInfo;
      this.currentGrade = data[0].key;
      this.gradeTitle = data[0].info;
      this.gradeList = data;
    },
    selectGrade(grade) {
      this.gradeTitle = grade.info;
      this.currentGrade = grade.key;
    }
  },
  created() {
    this.getGradeData();
  }
}