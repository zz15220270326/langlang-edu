<template>
  <querymenu>
    <div slot="first" class="select">
      <group-menu :renderList="classInfos" @getSelect="getClassId" />
      <select-menu
        :listTitle="ablumTypeTitle"
        :listItems="ablumTypeList"
        @handleSelect="selectAblumType"
      />
    </div>
    <div slot="second" class="operations">
      <Button
        v-for="(item, key) in operations"
        :key="key"
        :type="item.type"
        @click.native="handleOperations(key, item.tag)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div slot="third" class="img-operations">
      <Button
        v-for="(item, key) in abOperations"
        :key="key"
        :type="item.type"
        @click.native="handleAbOperations(key)"
      >
        <span>{{ item.tag }}</span>
        <Icon :type="item.icon" />
      </Button>
    </div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
import GroupMenu from '@common/group-select';
import { SelectMenu } from '@common/select-menu';

import { currentClassBus } from '../../function';

// ? import mixins
import ablumTypeMixin from '@/mixins/Common/ablumTypeMixin';

export default {
  name: 'ClassAblumMenu',

  components: {
    Querymenu,
    GroupMenu,
    SelectMenu
  },

  mixins: [ablumTypeMixin],

  data: () => ({
    operations: [
      {
        tag: '查询',
        type: 'primary'
      },
      {
        tag: '全选',
        type: 'info'
      },
      {
        tag: '删除',
        type: 'error'
      }
    ],
    abOperations: [
      {
        tag: '新建相册',
        type: 'success',
        icon: 'md-add'
      },
      {
        tag: '上传图片',
        type: 'info',
        icon: 'ios-cloud-upload'
      }
    ],
    classInfos: [],
    currentClassId: 0
  }),
  props: {
    isSelectAll: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isSelectAll(newValue) {
      if (newValue === true) {
        this.operations[1].tag = '取消全选';
      } else {
        this.operations[1].tag = '全选';
      }
    }
  },
  computed: {},
  methods: {
    getCrtClassInfo() {
      const crtComponent = this;
      currentClassBus.$on('getClassGroup', (classGroup = {}) => {
        crtComponent.classInfos = [];
        Object.keys(classGroup).map(k => {
          crtComponent.classInfos.push({
            label: crtComponent.switchGrade(k),
            list: classGroup[k].map((item, index) => ({
              key: index + 1,
              info: item.ClassName,
              id: item.id
            }))
          });
        });
      });
    },
    getClassId(classId) {
      this.currentClassId = classId;
    },
    switchGrade(classGrade = '') {
      switch (classGrade) {
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
    removeCrtClassInfo() {},
    handleOperations(key, tag) {
      // this.$emit('handleOperations', key, tag)
      switch (key) {
        case 0:
          this.handleSearch();
          break;
        case 1:
          this.handleSelect(tag);
          break;
        case 2:
          this.handleDelete();
          break;
      }
    },
    handleSearch() {
      const params = {};
      if (this.currentClassId > 0) {
        params.classId = this.currentClassId;
      }
      if (this.ablumType.length) {
        params.type = this.ablumType;
      }
      params.pageSize = 12;
      this.$emit('handleSearch', params);
    },
    handleSelect(tag = '') {
      switch (tag) {
        case '全选':
          this.$emit('confirmSelectAll');
          break;
        case '取消全选':
          this.$emit('cancelSelectAll');
          break;
      }
    },
    handleDelete() {
      this.$emit('handleDelete');
    },
    handleAbOperations(crtIdx) {
      this.$emit('handleAbOperations', crtIdx);
      switch (crtIdx) {
        case 0:
          this.$emit('openAddModal');
          break;
        case 1:
          this.$emit('openUploadModal');
          break;
      }
    }
  },
  mounted() {
    this.getCrtClassInfo();
  },
  beforeDestroy() {
    this.removeCrtClassInfo();
  }
};
</script>

<style lang="less" scoped>
.full_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.query-menu {
  padding: 1rem 0;
  .full_flex();
  .select {
    flex: 2;
    .full_flex();
  }
  .operations {
    flex: 2;
    .ivu-btn {
      margin: 0 0.8rem;
      width: 6rem;
    }
  }
  .img-operations {
    flex: 3;
    text-align: right;
    margin-right: 3rem;
    .ivu-btn {
      margin: 0 1rem;
    }
  }
}
</style>
