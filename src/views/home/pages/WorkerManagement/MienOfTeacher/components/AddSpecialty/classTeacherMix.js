// ? async-functions / mock-data
import { classGroupEvent } from '../../events';
export default {
  data() {
    return {
      classTitle: '',
      classList: [],
      currentClassId: 0,
      teacherTitle: '',
      teacherList: [],
      teacherId: 0
    };
  },
  watch: {
    teacherId(uId) {
      this.getParamsUid(uId);
    }
  },
  methods: {
    getClassGroup() {
      classGroupEvent.$on('classGroupEvent', classGroup => {
        this.$nextTick(() => this.initClassesInfo(classGroup));
      });
    },
    initClassesInfo(classGroup = {
      grade1: [],
      grade2: [],
      grade3: []
    }) {
      const classInfos = [];
      Object.keys(classGroup).map(k =>
        classGroup[k].map(ct => {
          classInfos.push(ct);
        })
      );
      this.classList = [{
        key: 0,
        info: '请选择教师',
        classId: 0,
        teacherInfo: []
      }];
      classInfos.map((c, ci) => {
        this.classList.push({
          key: ci + 1,
          info: c.ClassName,
          classId: c.id,
          teacherInfo: c.teacher_info
        });
      });
      this.classTitle = this.classList[0].info;
      this.currentClassId = this.classList[0].classId;
      this.initTeachersInfo();
    },
    initTeachersInfo() {
      const {
        teacherInfo
      } = this.classList.find(c => c.classId === this.currentClassId);
      this.teacherList = [];
      if (teacherInfo.length === 0) {
        this.teacherTitle = '暂无教师';
        this.teacherId = 0;
        this.career = '';
        this.iBirthday = '';
      } else {
        if (Array.isArray(teacherInfo)) {
          teacherInfo.map((t, ti) => {
            this.teacherList.push({
              key: ti + 1,
              info: t.realname || '',
              tId: t.id,
              role: t.name || '',
              birthday: t.birthday || '',
            });
            this.teacherTitle = this.teacherList[0].info;
            this.teacherId = this.teacherList[0].tId;
          });
          this.setTeacherInfo();
          return;
        }
        if (typeof teacherInfo === 'object') {
          const _teacherInfo = Object.keys(teacherInfo).map(k => teacherInfo[k]);
          _teacherInfo.forEach((t, ti) => {
            this.teacherList.push({
              key: ti + 1,
              info: t.realname || '',
              tId: t.id,
              role: t.name || '',
              birthday: t.birthday || '',
            })
            this.teacherTitle = this.teacherList[0].info;
            this.teacherId = this.teacherList[0].tId;
          });
          this.setTeacherInfo();
          return;
        }
      }
    },
    selectClass(crtClassInfo) {
      const {
        info,
        classId
      } = crtClassInfo;
      this.classTitle = info;
      this.currentClassId = classId;
      this.initTeachersInfo();
    },
    selectTeacher(crtTchInfo) {
      const {
        info,
        tId
      } = crtTchInfo;
      this.teacherTitle = info;
      this.teacherId = tId;
      this.setTeacherInfo();
    },
    setTeacherInfo() {
      const {
        role,
        birthday
      } = this.teacherList.find(t => t.tId === this.teacherId);
      this.career = role || '';
      this.iBirthday = birthday || '';
    },
    getParamsUid(uid) {
      if (uid > 0) {
        this.params.uid = uid.toString();
      } else delete this.params.uid;
    }
  },
  mounted() {
    this.getClassGroup();
  },
};