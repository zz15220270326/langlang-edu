// ? (该模块依赖 classId)
// import Vue from 'vue'
// ? async-functions
import { getStudentList } from '@/request/Common';
// ? utils
import { getDataSource, checkDataSource } from '@/utils';

export default {
  data() {
    return {
      studentTitle: '根据选择的班级显示幼儿',
      studentList: [],
      studentId: 0
    };
  },
  watch: {},
  computed: {
    stuClassId() {
      return this.currentClassId || ''
    }
  },
  methods: {
    async getStudents() {
      const params = { classId: this.currentClassId };
      if (params.classId > 0) {
        const result = await getStudentList(params);
        const dataSource = getDataSource(result);
        if (checkDataSource(dataSource)) {
          const info = JSON.parse(JSON.stringify(dataSource));
          if (info.children_name && info.children_name.length > 0) {
            const list = info.children_name;
            this.studentId = list[0].id || 0;
            this.studentTitle = list[0].name;
            this.studentList = [];
            list.map((item, index) => {
              this.studentList.push({
                key: index,
                id: item.id,
                info: item.name
              });
            });
          }
        }
      } else {
        this.studentTitle = '暂无幼儿';
        this.studentList = [];
      }
    },
    selectStudent(infos) {
      const {
        id,
        info
      } = infos;
      this.studentId = id || 0;
      this.studentTitle = info;
    }
  },
  created() {
    this.getStudents()
  }
}