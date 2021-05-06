// ? request
import { getClassList } from '@/request/Common';
// ? utils
import { localGet, localSet } from '@/utils';
// ? config
import { garden } from '@/config';
// ? import mapState
import { mapState } from 'vuex';

export default {
  data() {
    return {
      classTitle: '',
      classList: [],
      currentClassId: ''
    };
  },
  computed: {
    ...mapState(['uid'])
  },
  methods: {
    async getClassList() {
      if (localGet(garden.CLASS_INFO)) {
        this.setLocalClass();
        return;
      }
      if (localGet(garden.CLASS_DETAIL_INFO)) {
        this.getLocalTypeClass();
        return;
      }
      const result = await getClassList(this.uid)
      if (result.data) {
        // ? 请求成功
        const dataSource = result.data;
        this.setClassInfo(dataSource);
        /* if (this.getStudents) {
          this.getStudents()
        }
        if (this.getTeachers) {
          this.getTeachers()
        } */
      } else {
        this.$Message.error('获取数据失败, 请刷新或稍后再试');
      }
    },
    setClassInfo(data) {
      this.classTitle = data[0].className ? data[0].className : '';
        data.forEach((item, index) => {
          this.classList.push({
            info: item.className,
            classId: item.id,
            key: index
          });
        });
        this.currentClassId = data[0].id;
        this.$emit('getClassId', this.currentClassId);
    },
    selectClass(selectItem) {
      if (selectItem.info) {
        const {
          info,
          classId,
        } = selectItem;
        this.classTitle = info;
        this.currentClassId = classId;
        this.$emit('getClassId', this.currentClassId);
        // ? 选择班级后 刷新学生列表
        if (this.getStudents) {
          this.studentTitle = '请选择幼儿';
          this.studentId = 0;
          this.getStudents();
        }
        if (this.getTeachers) {
          this.teacherTitle = '请选择教师';
          this.teacherId = 0;
          this.getTeachers();
        }
      }
    },
    // ? 获取本地存储的班级信息
    setLocalClass() {
      const classInfo = localSet(garden.CLASS_INFO);
      this.classTitle = '全员教师';
      this.currentClassId = 0;
      this.classList = [
        {
          key: 0,
          classId: 0,
          info: '全员教师'
        },
        ...classInfo
      ];
    },
    getLocalTypeClass() {
      this.classList = [];
      const localClasses = JSON.parse(localStorage.getItem(garden.CLASS_DETAIL_INFO)),
        {
          grade1,
          grade2,
          grade3
        } = localClasses,
        classList = [
          ...grade1,
          ...grade2,
          ...grade3,
        ].map((item, index) => {
          return {
            info: item.ClassName,
            classId: item.id,
            key: index + 1
          }
        });
      const firstClass = {
        info: '全园教师',
        classId: 0,
        key: 0
      };
      classList.unshift(firstClass);
      this.classList = classList;
      this.classTitle = classList[0].info;
      this.currentClassId = classList[0].classId;
    }
  },
  created() {
    this.getClassList();
  }
}

/**
 * // ? request
import getClassListData from '@/request/Common/getClassList'
// ? mapState
import {
  mapState
} from 'vuex'
// ? utils
import {
  getDataSource,
  checkDataSource,
  handleErrorCode
} from '@/utils'

export default {
  data() {
    return {
      classTitle: '',
      classList: [],
      currentClassId: 0,
      teacherIds: ''
    }
  },
  computed: {
    ...mapState(['uid'])
  },
  methods: {
    async getClassList() {
      const result = await getClassListData(this.uid)
      const dataSource = getDataSource(result)
      if (checkDataSource(dataSource)) {
        const info = JSON.parse(JSON.stringify(dataSource))
        this.setClassInfo(info)
      } else this.$Message.error(`请求失败, 原因: ${handleErrorCode(result.code)}`)
    },
    setClassInfo(info = []) {
      if (info.length > 0) {
        this.classList = []
        this.classTitle = info[0].class_name || ''
        this.currentClassId = info[0].id || 0
        this.teacherIds = info[0].teacher_ids || ''
        info.map((item, key) => {
          this.classList.push({
            key,
            info: item.class_name,
            classId: item.id,
            teacherIds: item.teacher_ids,
          })
        })
      }
    },
    selectClass(selectItem) {
      if (selectItem.info) {
        const {
          info,
          classId,
          teacherIds
        } = selectItem
        this.classTitle = info
        this.currentClassId = classId
        this.teacherIds = teacherIds
        // ? 选择班级后 刷新学生列表
        if (this.getStudents) {
          this.studentTitle = ''
          this.studentId = 0
          this.getStudents()
        }
        if (this.getTeachers) {
          this.teacherTitle = ''
          this.teacherId = 0
          this.getTeachers()
        }
      }
    }
  },
  created() {
    this.getClassList()
  }
}
 */