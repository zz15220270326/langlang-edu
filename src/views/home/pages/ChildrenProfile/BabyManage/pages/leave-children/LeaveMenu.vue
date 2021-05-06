<template>
  <querymenu>
    <div slot="first" class="select">
      <select-menu
        v-if="false"
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
      <group-select
        :render-list="classGroupList"
        @getSelect="selectGroupClass"
      />
    </div>
    <div slot="second" class="input">
      <Input
        class="my-input"
        placeholder="请输入幼儿姓名"
        @on-blur="getInfantName"
      />
      <div class="card-number">
        <Input
          class="my-input"
          placeholder="家长考勤卡号"
          @on-blur="getIdCard"
        />
      </div>
    </div>
    <div slot="third" class="table-op">
      <Button
        v-for="(item1, btnIdx) in tableOperations"
        :key="btnIdx"
        :type="item1.type"
        @click.native="handleMenuOps(btnIdx)"
      >
        {{ item1.tag }}
      </Button>
    </div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
import { SelectMenu } from '@common/select-menu';
import GroupSelect from '@common/group-select'

import { deepCopyObj } from '@/utils';
import { bmBus } from '../../my-utils';

// ? mixins
import classMixs from '@/mixins/Common/getClassMixins';

export default {
  name: 'LeaveMenu',
  components: {
    Querymenu,
    SelectMenu,
    GroupSelect
  },
  mixins: [classMixs],
  data: () => ({
    inputCardNumber: '',
    classGroupList: [],
    tableOperations: [
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
    // ? upload
    params: {
      pageSize: 20,
      IsGraduate: 1
    }
  }),
  watch: {
    currentClassId(newVal) {
      this.setParamsClass(newVal);
    }
  },
  methods: {
    getClassGroupList(classGroup) {
      this.classGroupList = [];
      Object.getOwnPropertyNames(classGroup).forEach(grade => {
        this.classGroupList.push({
          label: this.getNameByGrade(grade),
          list: classGroup[grade].map(c => ({
            id: c.id || 0,
            info: c.ClassName || ''
          }))
        });
      });
      // console.log(this.classGroupList);
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
          return 'unknown';
      }
    },
    selectGroupClass(id) {
      this.currentClassId = id;
    },
    setParamsClass(classId) {
      if (classId > 0) {
        this.params.classId = classId;
      } else delete this.params.classId;
    },
    getInfantName(e) {
      const { value } = e.target;
      if (value.length) {
        this.params.infantName = value;
      } else delete this.params.infantName;
    },
    // ? idCard
    getIdCard(e) {
      const { value } = e.target;
      if (value.length) {
        this.params.idCard = value;
      } else delete this.params.idCard;
    },
    handleMenuOps(crtIdx = 0) {
      switch (crtIdx) {
        case 0:
          this.handleSearch();
          break;
        case 1:
          this.handleDelete();
          break;
        case 2:
          this.handleExport();
          break;
        default:
          break;
      }
    },
    handleSearch() {
      const params = deepCopyObj(this.params);
      this.$emit('handleSearch', params);
    },
    handleDelete() {
      this.$emit('handleDelete');
    },
    handleExport() {
      this.$emit('handleExport');
    }
  },
  mounted() {
    bmBus.$on('getClassGroup', classGroup =>
      this.getClassGroupList(classGroup)
    );
  },
  beforeDestroy() {
    bmBus.$off('getClassGroup');
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
  margin: 0.5rem 0;
  padding: 1rem 0;
  .flex-center;
  .select {
    flex: 1;
    .flex-center;
  }
  .input {
    flex: 3;
    .flex-center;
    justify-content: space-evenly;
    .my-input {
      width: 13.2rem;
    }
  }
  .table-op {
    flex: 3;
    .ivu-btn {
      width: 5.4rem;
      margin: 0 0.8rem;
    }
  }
  .other-op {
    flex: 3;
    text-align: right;
    margin-right: 1.2rem;
    .ivu-btn {
      width: 6.6rem;
      margin: 0 0.8rem;
    }
  }
}
</style>
