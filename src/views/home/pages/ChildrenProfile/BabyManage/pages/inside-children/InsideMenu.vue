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
        class="input-infant-name"
        placeholder="幼儿姓名"
        suffix="ios-search"
        @on-blur="getInfantName"
      />
      <div class="card-number">
        <Input placeholder="家长考勤卡号" @on-blur="getInputCardNumber" />
      </div>
    </div>
    <div slot="third" class="table-op">
      <Button
        v-for="(item1, key1) in tableOperations"
        :key="key1"
        :type="item1.type"
        @click.native="handleCommon(key1)"
      >
        {{ item1.tag }}
      </Button>
    </div>
    <div slot="third" class="other-op">
      <Dropdown v-for="(item2, key2) in otherOperations" :key="key2">
        <Button :type="item2.type" @click.native="handleSpecial(key2)">
          <Icon :type="item2.icon" />
          <span>{{ item2.tag }}</span>
        </Button>
        <DropdownMenu v-show="key2 === 1" trigger="click" slot="list">
          <DropdownItem
            v-for="(item3, key3) in moduleImport"
            :key="key3"
            style="text-align: center;"
            @click.native="handleImportModule(key3)"
          >
            <span v-if="key3 === 0">
              {{ item3.info }}
            </span>
            <Upload action="#" v-if="key3 === 1">
              <span> {{ item3.info }} </span>
            </Upload>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
import { SelectMenu } from '@common/select-menu';
import GroupSelect from '@common/group-select';
// ? utils
import { bmBus } from '../../my-utils';
// ? mixins
import getClassMixins from '@/mixins/Common/getClassMixins';

export default {
  name: 'InsideMenu',
  components: {
    Querymenu,
    SelectMenu,
    GroupSelect
  },

  mixins: [getClassMixins],

  data: () => ({
    classGroupList: [],
    params: {},
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
    otherOperations: [
      {
        tag: '添加幼儿',
        icon: 'md-add',
        type: 'success'
      },
      {
        tag: '模板导入',
        icon: 'ios-arrow-down',
        type: 'warning'
      },
      {
        tag: '批量导出',
        icon: 'md-cloud-upload',
        type: 'info'
      }
    ],
    moduleImport: [
      {
        info: '下载简易导入模板',
        key: 0
      },
      {
        info: '简易模板导入',
        key: 1
      }
    ]
  }),
  watch: {
    currentClassId(newValue) {
      if (newValue) {
        this.params.classId = newValue;
      } else delete this.params.classId;
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
    setPageSize(pageSize) {
      this.params.pageSize = pageSize;
    },
    getInfantName(event) {
      const { value } = event.target;
      if (value !== '') {
        this.params.infantName = value;
      } else delete this.params.infantName;
    },
    getInputCardNumber(event) {
      const { value } = event.target;
      if (value !== '') {
        this.params.idCard = value;
      } else delete this.params.idCard;
    },
    handleCommon(crtIdx) {
      switch (crtIdx) {
        case 0:
          this.handleSearch();
          break;
        case 1:
          this.handleDeleteItems();
          break;
        case 2:
          this.handleExport();
          break;
      }
    },
    handleSearch() {
      this.setPageSize(20);
      const params = JSON.parse(JSON.stringify(this.params));
      this.$emit('handleSearch', params);
    },
    handleDeleteItems() {
      this.$emit('handleDeleteItems');
    },
    handleExport() {
      this.$emit('handleExport');
    },

    handleSpecial(crtIdx) {
      switch (crtIdx) {
        case 0:
          this.handleAddInfant();
          break;
        // ? 1 : 点击下拉菜单的事件
        case 2:
          this.handleExports();
          break;
      }
    },
    handleAddInfant() {
      this.$Message.info('添加幼儿');
      this.$emit('handleAddInfant');
    },
    handleImportModule(crtIdx) {
      switch (crtIdx) {
        case 0:
          this.handleDownload();
          break;
        case 1:
          this.handleImport();
          break;
      }
    },
    handleDownload() {
      this.$Message.info('下载简易导入模板');
    },
    handleImport() {
      this.$Message.info('简易模板导入');
    },
    handleExports() {
      this.$Message.info('批量导出');
      this.$emit('handleExports');
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
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
    flex: 1.5;
    // .flex-center;
    .select-menu {
      margin: 0 0.8rem;
    }
  }
  .input {
    flex: 3;
    .flex-center;
    justify-content: space-evenly;
    .input-infant-name {
      width: 10.8rem;
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
