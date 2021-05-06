// ? async-functions
import {
  getTeacherList
} from '@/request/Common';
// ? utils
import {
  getDataSource,
  checkDataSource
} from '@/utils';

export default {
  data() {
    return {
      teacherTitle: '根据选择的班级显示教师',
      teacherList: [],
      teacherId: 0
    };
  },
  methods: {
    async getTeachers() {
      const params = { classId: this.currentClassId };
      const result = await getTeacherList(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const info = JSON.parse(JSON.stringify(dataSource));
        if (info.teacher_name && info.teacher_name.length > 0) {
          const list = info.teacher_name;
          this.teacherId = list[0].id || 0;
          this.teacherTitle = list[0].name;
          this.teacherList = [];
          list.map((item, index) => {
            this.teacherList.push({
              key: index,
              id: item.id,
              info: item.name
            });
          });
        }
      }
    },
    selectTeacher(infos) {
      const { id, info } = infos;
      this.teacherId = id || 0;
      this.teacherTitle = info;
    }
  },
  created() {
    this.getTeachers();
  }
}