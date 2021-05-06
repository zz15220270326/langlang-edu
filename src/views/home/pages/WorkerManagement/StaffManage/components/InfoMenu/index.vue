<template>
  <querymenu>
    <div slot="first" class="select-class">
      <select-menu
        v-if="false"
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
      <group-select
        :renderList="classGroupList"
        @getSelect="handleSelectClassGroup"
      />
    </div>
    <div slot="second" class="inputs">
      <Input placeholder="请输入职工姓名" @on-blur="getStaffName" />
      <Input placeholder="考勤卡号" @on-blur="getCard" />
    </div>
    <div slot="third" class="query-and-delete">
      <Button
        v-for="(item, key) in lOperations"
        :key="key"
        :type="item.type"
        @click.native="handleLOp(key)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div slot="fourth" class="other-operations">
      <Button
        v-for="(item, key) in rOperations"
        :key="key"
        :type="item.type"
        @click.native="handleROp(key)"
      >
        <div v-if="key !== 1">
          <span>{{ item.tag }}</span>
          <Icon :type="item.icon" />
        </div>
        <div v-else>
          <Dropdown>
            <span href="javascript:void(0)">
              模板导入
              <Icon type="ios-arrow-down"></Icon>
            </span>
            <DropdownMenu slot="list">
              <DropdownItem>
                <span class="module-link" @click="downloadModule">
                  下载教师导入模板
                </span>
              </DropdownItem>
              <DropdownItem>教师模板导入</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
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

// ? mixins
import getClassMixins from '@/mixins/Common/getClassMixins';
// ? bus
import { classListBus } from '../../eventBus';

export default {
  name: 'InfoQueryMenu',
  components: {
    Querymenu,
    SelectMenu,
    GroupSelect
  },
  mixins: [getClassMixins],
  data: () => ({
    classGroupList: [],
    lOperations: [
      {
        tag: '查询',
        type: 'primary'
      },
      {
        tag: '删除',
        type: 'error'
      },
      {
        tag: '导出',
        type: 'success'
      }
    ],
    rOperations: [
      {
        tag: '添加职工',
        type: 'success',
        icon: 'md-add'
      },
      {
        tag: '模板导入',
        type: 'info',
        icon: 'ios-arrow-down'
      },
      {
        tag: '批量导出',
        type: 'warning',
        icon: 'md-cloud-upload'
      }
    ],
    params: {}
  }),
  methods: {
    setClassGroupList(classGroup = {}) {
      this.classGroupList = [];
      Object.getOwnPropertyNames(classGroup).forEach((c) => {
        this.classGroupList.push({
          label: this.getTagByGrade(c),
          list: classGroup[c].map((cc) => {
            return {
              id: cc.id || 0,
              info: cc.ClassName || ''
            };
          })
        });
      });
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
    handleSelectClassGroup(id) {
      this.currentClassId = id || 0;
      this.params.classId = this.currentClassId;
    },
    getStaffName(e) {
      const { value } = e.target;
      if (value !== '') {
        this.params.realName = value;
      } else delete this.params.realName;
    },
    getCard(e) {
      const { value } = e.target;
      if (value !== '') {
        this.params.card = value;
      } else delete this.params.card;
    },
    handleLOp(crtIdx) {
      switch (crtIdx) {
        case 0:
          this.handleSearch();
          break;
        case 1:
          this.handleDelete();
          break;
        case 2:
          this.handleExports();
          break;
        default:
          break;
      }
    },
    handleSearch() {
      const params = JSON.parse(JSON.stringify(this.params));
      this.$emit('handleSearch', params);
    },
    handleDelete() {
      this.$emit('handleDelete');
    },
    handleROp(crtIdx) {
      switch (crtIdx) {
        case 0:
          this.handleAddStaff();
          break;
        case 1:
          // ? 1 下载建议模板
          // ? 2 教师模板导入
          break;
        case 2:
          this.handleExports();
          break;
      }
    },
    handleAddStaff() {
      this.$Message.info('添加职工');
      this.$emit('openAddModal');
    },
    downloadModule() {
      window.location.href =
        'http://t2.aservice.langlangyun.com:5480/langyun/public/index.php/workplace/staff_manage/addteachers/type/teacherTemplate.html';
    },
    handleExports() {
      this.$emit('handleExports');
    }
  },
  /**
   * @description
   * * Vue2.x life-hooks
   */
  mounted() {
    classListBus.$on('getClassGroup', (classGroup) =>
      this.setClassGroupList(classGroup)
    );
  },
  beforeDestroy() {
    classListBus.$off('getClassGroup');
  }
};
</script>
