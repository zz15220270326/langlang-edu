<template>
  <querymenu>
    <div slot="first" class="input">
      <group-select :renderList="classGroupList" @getSelect="selectClass" />
      <div class="serach-input">
        <Input placeholder="请输入名称" v-model="infantName" />
      </div>
    </div>
    <div slot="second" class="operations">
      <Button
        v-for="(item, key) in operations"
        :key="key"
        :type="item.type"
        @click.native="handleOperations(key)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div slot="third" class="add">
      <Button type="success" @click="handleAdd"> 新建突发状况 </Button>
    </div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
import GroupSelect from '@common/group-select';

export default {
  name: 'AccidentsMenu',
  components: {
    Querymenu,
    GroupSelect
  },
  data: () => ({
    operations: [
      {
        tag: '查询',
        type: 'primary'
      },
      {
        tag: '删除',
        type: 'error'
      }
    ],
    infantName: '',
    classGroupList: [],
    currentClassId: 0
  }),
  methods: {
    getClassGroup() {
      const classGroup =
        JSON.parse(localStorage.getItem('classDetailInfo')) || {};
      if (Object.getOwnPropertyNames(classGroup).length) {
        const classGroupList = Object.getOwnPropertyNames(classGroup).map(g => {
          return {
            label: this.getTagByGrade(g),
            list: classGroup[g].map(c => ({
              info: c.ClassName,
              id: c.id
            }))
          };
        });
        this.classGroupList = classGroupList;
      }
    },
    getTagByGrade(grade) {
      switch (grade) {
        case 'grade1':
          return '小班';
        case 'grade2':
          return '中班';
        case 'grade3':
          return '大班';
        default:
          return '';
      }
    },
    selectClass(id) {
      this.currentClassId = id;
    },
    handleOperations(btnIdx) {
      switch (btnIdx) {
        case 0:
          this.handleSearch();
          break;
        case 1:
          this.handleDelete();
          break;
      }
    },
    handleSearch() {
      const params = {};
      params.page_size = 20;
      // this.currentClassId.indexOf(',') === -1
      if (this.currentClassId > 0) {
        params.classId = this.currentClassId;
      }
      if (this.infantName !== '') {
        params.infantName = this.infantName;
      }
      this.$emit('handleSearch', params);
    },
    handleDelete() {
      this.$emit('handleDelete');
    },
    handleAdd() {
      this.$emit('handleAdd');
    }
  },
  created() {
    this.getClassGroup();
  }
};
</script>

<style lang="less" scoped>
.flex-center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.query-menu {
  .flex-center;
  padding: 1.2rem 0;
  .input {
    flex: 1.5;
    .flex-center;
    .select-menu {
      width: 12rem;
      margin: 0 0.8rem;
    }
    .search-input {
      flex: 1;
      input {
        margin: 0 0.6rem;
      }
    }
  }
  .operations {
    flex: 1;
    .flex-center;
    .ivu-btn {
      width: 5rem;
      margin: 0 0.5rem;
    }
  }
  .add {
    flex: 3;
    text-align: right;
    margin-right: 2rem;
  }
}
</style>
