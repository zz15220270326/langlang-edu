import {
  getGrowupList
} from '@/request/children-profile';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  // ? arr / obj
  deepCopyObj
} from '@/utils';

export default {
  data() {
    return {
      classTitle: '',
      classList: [],
      currentClassId: 0,
      childName: '',
      childrenList: [],
    };
  },
  methods: {
    async getBase(params = {}) {
      const result = await getGrowupList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        data.class_list && this.setClassInfos(data.class_list);
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
    },
    setClassInfos(list = []) {
      this.classList = [];
      this.classTitle = list[0].ClassName;
      this.currentClassId = list[0].id;
      this.params.classId = list[0].id;
      this.params.grade = list[0].grade;
      list.map((item, index) => {
        this.classList.push({
          key: index,
          info: item.ClassName,
          classId: item.id,
          children: item.child,
          grade: item.grade
        });
      });
      this.setChildrenList();
    },
    setChildrenList() {
      const children = this.classList.find(
        item => item.classId === this.currentClassId
      ).children[0],
        childrenList = [];
      children.map((item, index) => {
        childrenList.push({
          key: index + 1,
          info: item.name,
          infantId: item.id
        });
      });
      children.length > 0 ?
        childrenList.unshift({
          key: 0,
          info: '请选择幼儿',
          infantId: 0
        }) :
        childrenList.unshift({
          key: 0,
          info: '暂无幼儿',
          infantId: 0
        });
      this.childName = children.length > 0 ? '请选择幼儿' : '暂无幼儿';
      this.childrenList = childrenList;
    },
    selectClass(infos) {
      const {
        info,
        classId,
        grade
      } = infos;
      this.classTitle = info;
      this.currentClassId = classId;

      this.params.classId = classId;
      this.params.grade = grade;
      delete this.params.infantId;

      this.setChildrenList();
    },
    selectChild(infos) {
      const {
        info,
        infantId
      } = infos;
      this.childName = info || '';
      this.params.infantId = infantId;
    },
  },
  created() {
    this.getBase();
  }
}