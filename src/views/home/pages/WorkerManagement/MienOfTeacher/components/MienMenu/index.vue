<template>
  <querymenu>
    <div slot="first" class="select-class">
      <select-menu
        v-if="false"
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
      <group-select :renderList="classGroupList" @getSelect="selectClass" />
    </div>
    <div slot="second" class="inputs">
      <Input
        placeholder="请输入教师姓名"
        suffix="ios-search"
        @on-blur="handleGetName"
      />
    </div>
    <div slot="third" class="query-and-delete">
      <Button
        v-for="(item, key) in operations"
        :key="key"
        :type="item.type"
        @click.native="handleOperations(item.tag)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div slot="fourth" class="other-operations">
      <Button type="info" @click.native="addSpecial">
        <span>添加风采</span>
      </Button>
    </div>
  </querymenu>
</template>

<script>
import './index.less';
// ? common components
import Querymenu from '@common/query-menu';
import { SelectMenu } from '@common/select-menu';
import GroupSelect from '@common/group-select';
// ? utils
import { deepCopyObj } from '@/utils';
// ? mixins
import getClassMixins from '@/mixins/Common/getClassMixins';
// ? bus
import { classGroupEvent } from '../../events';

export default {
  name: 'TeacherQueryMenu',
  components: {
    Querymenu,
    SelectMenu,
    GroupSelect
  },
  mixins: [getClassMixins],
  data: () => ({
    classGroupList: [],
    operations: [
      {
        tag: '查询',
        type: 'primary'
      },
      {
        tag: '全选',
        type: 'success'
      },
      {
        tag: '删除',
        type: 'error'
      }
    ],
    params: {
      pageSize: 10
    }
  }),
  methods: {
    setClassGroupList(classGroup) {
      Object.getOwnPropertyNames(classGroup).forEach(g => {
        this.classGroupList.push({
          label: this.getNameByGrade(g),
          list: classGroup[g].map(c => {
            return {
              info: c.ClassName,
              id: c.id
            };
          })
        });
      });
    },
    getNameByGrade(grade) {
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
    selectClass(classId) {
      this.currentClassId = classId;
    },
    handleGetName(e) {
      const { value } = e.target;
      if (value.length) {
        this.params.name = value;
      } else delete this.params.name;
    },
    handleOperations(btnTag) {
      switch (btnTag) {
        case '查询':
          this.handleSearch();
          break;
        case '全选':
          this.confirmSelectAll();
          break;
        case '取消全选':
          this.cancelSelectAll();
          break;
        case '删除':
          this.$emit('handleDeleteItems');
          break;
      }
    },
    getParamsClass() {
      if (this.currentClassId) {
        this.params.classId = this.currentClassId;
      } else delete this.params.classId;
    },
    handleSearch() {
      this.getParamsClass();
      const params = deepCopyObj(this.params);
      this.$emit('handleSearch', params);
    },
    confirmSelectAll() {
      this.operations[1].tag = '取消全选';
      this.operations[1].type = 'warning';
      this.$emit('confirmSelectAll');
    },
    cancelSelectAll() {
      this.operations[1].tag = '全选';
      this.operations[1].type = 'success';
      this.$emit('cancelSelectAll');
    },
    addSpecial() {
      this.$emit('addSpecial');
    }
  },
  mounted() {
    classGroupEvent.$on('classGroupEvent', classGroup =>
      this.setClassGroupList(classGroup)
    );

    this.$bus.$on('confirmAllTeacherSpecialItem', () =>
      this.confirmSelectAll()
    );
    this.$bus.$on('notAllTeacherSpecialItem', () => {
      this.operations[1].tag = '全选';
      this.operations[1].type = 'success';
    });
  },
  beforeDestroy() {
    classGroupEvent.$off('classGroupEvent');

    this.$bus.$off('confirmAllTeacherSpecialItem');
    this.$bus.$off('notAllTeacherSpecialItem');
  }
};
</script>
