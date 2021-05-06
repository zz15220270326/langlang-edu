import { getClassAdd } from '@/request/class-management';

import {
  getDataSource,
  checkDataSource,
  deepCopyObj
} from '@/utils';

export default {
  data() {
    return {
      teacherTitle: '',
      teacherList: [],
      teacherIds: ''
    };
  },
  methods: {
    async getTeacherListData() {
      const result = await getClassAdd(),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        const { teacher_info } = data;
        // console.log(teacher_info)
        Object.keys(teacher_info).length && this.setTeacherList(teacher_info);
      }
    },
    setTeacherList(teacherInfo = {}) {
      const tList = [];
      this.teacherList = [];
      for (let k in teacherInfo) {
        tList.push(...teacherInfo[k]);
      }
      this.teacherTitle = tList[0].realname;
      tList.map((item, index) => {
        this.teacherList.push({
          key: index + 1,
          id: item.id,
          info: item.realname
        });
      });
    },
    selectTeacher(selectTeacher = []) {
      this.teacherTitle = selectTeacher;
      this.teacherIds = selectTeacher.map(idx => this.teacherList[idx].id).toString();
    }
  },
  created() {
    this.getTeacherListData();
  }
};