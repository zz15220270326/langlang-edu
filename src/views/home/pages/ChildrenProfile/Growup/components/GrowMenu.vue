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
        :renderList="classGroupList"
        @getSelect="selectGroupClass"
      />
    </div>
    <div slot="second" class="input">
      <Input
        class="select-item"
        placeholder="请输入幼儿姓名"
        @on-blur="getInfantName"
      />
      <div class="card-number">
        <DatePicker
          class="select-item"
          type="month"
          :placeholder="`请选择月份(当前:${defaultYear}年${defaultMonth}月)`"
          @on-change="handleSelectMonth"
        />
      </div>
    </div>
    <div slot="third" class="operations">
      <Button
        v-for="(item, key) in operations"
        :key="key"
        :type="item.type"
        :class="{ 'is-add': key === operations.length - 1 }"
        @click.native="handleOps(key)"
      >
        {{ item.tag }}
      </Button>
    </div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
import { SelectMenu } from '@common/select-menu';
import GroupSelect from '@common/group-select';
// ? utils
import { deepCopyObj } from '@/utils';
import guBus from '../guBus';
// ? import mixins
import getClassMixs from '@/mixins/Common/getClassMixins';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'GrowMenu',
  components: {
    Querymenu,
    SelectMenu,
    GroupSelect
  },
  mixins: [getClassMixs],
  data: () => ({
    classGroupList: [],
    operations: [
      {
        tag: '查询',
        type: 'primary'
      },
      {
        tag: '删除',
        type: 'error'
      },
      {
        tag: '添加成长档案',
        type: 'success'
      }
    ],
    params: {
      pageSize: 20
    }
  }),
  props: {},
  watch: {
    currentClassId(cId) {
      this.setClassId(cId);
    }
  },
  computed: {
    ...mapState(['defaultYear', 'defaultMonth'])
  },
  methods: {
    setClassGroupList(classGroup) {
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
    setClassId(cId) {
      cId > 0 ? (this.params.classId = cId) : delete this.params.classId;
    },
    getInfantName(e) {
      const { value } = e.target;
      value.length ? (this.params.name = value) : delete this.params.name;
    },
    handleSelectMonth(ym) {
      if (ym && ym.length) {
        this.params.date = ym;
      } else this.initPDate();
    },
    initPDate() {
      const ym = `${this.defaultYear}-${this.defaultMonth}`;
      this.params.date = ym;
    },
    handleOps(btnIdx) {
      switch (btnIdx) {
        case 0:
          this.handleSearch();
          break;
        case 1:
          this.handleDelete();
          break;
        case 2:
          this.handleOpen();
          break;
        default:
          break;
      }
    },
    handleSearch() {
      const params = deepCopyObj(this.params);
      console.log(params);
      this.$emit('handleSearch', params);
    },
    handleDelete() {
      this.$emit('handleDelete');
    },
    handleOpen() {
      this.$Message.info({
        content: '添加幼儿成长档案',
        background: true
      });
      this.$emit('handleOpen');
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  created() {
    this.initPDate();
  },
  mounted() {
    guBus.$on('getClassGroup', classGroup =>
      this.setClassGroupList(classGroup)
    );
  },
  beforeDestroy() {
    guBus.$off('getClassGroup');
  }
};
</script>

<style lang="less" scoped>
#flex-center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.query-menu {
  margin: 0.5rem 0;
  padding: 1rem 0;
  #flex-center;
  .select {
    flex: 1;
    #flex-center;
  }
  .input {
    flex: 3;
    #flex-center;
    justify-content: space-evenly;
    .select-item {
      width: 15rem;
    }
  }
  .operations {
    flex: 3;
    .ivu-btn {
      width: 5.4rem;
      margin: 0 0.8rem;
    }
    .is-add {
      width: 7.2rem;
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
