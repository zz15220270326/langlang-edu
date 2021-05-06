<template>
  <div class="auth-info">
    <!-- :indeterminate="false" -->
    <!-- <div
      class="list-item"
      v-for="(title, titleIndex) in dataList"
      :key="titleIndex"
    >
      <Checkbox
        :value="title.selected"
        @click.native="handleCheckAll(titleIndex)"
      >
        <span>{{ title.title }}</span>
        <CheckboxGroup>
          <Checkbox
            v-for="(child, childIndex) in title.children"
            :key="childIndex"
            :value="child.selected"
            @click.native="handleCheckItem(titleIndex, childIndex)"
          >
            {{ child.title }}
          </Checkbox>
        </CheckboxGroup>
      </Checkbox>
    </div> -->
    <!-- useTree -->
    <Tree
      :data="dataList"
      show-checkbox
      multiple
      @on-check-change="handleCheckChange"
    ></Tree>
    <btns :operations="operations" @handleBottomOperations="handleOp" />
  </div>
</template>

<script>
// ? components
import Btns from '@common/modal-bottom-btns';

// ? request
import { editRoleAuth } from '@/request/staff-management';
// ? utils
import {
  // * array
  uniqueArr,
  // deepCopyObj,
  // * request
  handleOpResult
} from '@/utils';

export default {
  name: 'AuthInfoTree',
  components: {
    Btns
  },
  data: () => ({
    dataList: [],
    params: {
      roleId: '',
      permissionIds: ''
    },
    operations: [
      {
        tag: '确认授权',
        type: 'success'
      },
      {
        tag: '取消操作',
        type: 'error'
      }
    ]
  }),

  props: {
    roleId: {
      type: Number,
      default: 0
    },
    listInfo: [Object, Array]
    // listInfo: Object || Array
  },
  // computed: {
  //   cNewList() {
  //     const newList = Object.keys(this.listInfo).map(k => this.listInfo[k])
  //     return newList
  //   }
  // },
  watch: {
    listInfo() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.getDataList();
        }, 100);
      });
    }
  },
  methods: {
    getDataList() {
      const infoList = Object.keys(this.listInfo).map(k => this.listInfo[k]);
      if (infoList.length > 0) {
        const list = [];
        infoList.map((item, index) => {
          list.push({
            number: index + 1,
            expand: true,
            title: item.type,
            children: this.formatChildren(item.child)
          });
        });
        this.dataList = list;
        this.initParams(list);
      }
    },
    formatChildren(child = []) {
      // ? child -> children
      const children = child.map(item => {
        const myChild = {};
        myChild.id = item.id || 0;
        myChild.chargeId = item.charge_id || 0;
        myChild.checked = item.select;
        myChild.title = item.name;
        if (item.children) {
          myChild.expand = true;
        } else myChild.expand = false;
        return myChild;
      });
      return children;
    },
    initParams(list = []) {
      const pList = [];
      list.map(item1 =>
        item1.children.map(item2 => {
          if (item2.checked) {
            pList.push(item2.id);
          }
        })
      );
      // ? roleId
      this.params.roleId = this.roleId;
      // ? permissionIds
      this.params.permissionIds = this.formartList(pList).toString();
      console.log(this.params, this.formartList(pList).length);
    },
    formartList(list = []) {
      return uniqueArr(list).sort();
    },
    handleCheckChange(items = []) {
      const list = items.filter(item => item.id).filter(item => item.chargeId);
      // ? chargeId -> roleId id -> permissionIds
      this.params.roleId = this.roleId;
      this.params.permissionIds = uniqueArr(
        list.map(item => item.id)
      ).toString();
      // console.log(this.params)
    },
    handleOp(btnTag) {
      switch (btnTag) {
        case '确认授权':
          this.handleAuth();
          break;
        case '取消操作':
          this.closeModals();
          break;
      }
    },
    handleAuth() {
      this.$Modal.confirm({
        title: '授权',
        content: '授权后, 教师重新登录后方可生效。确认操作 ?',
        onOk: () => this.confirmAuth()
      });
    },
    async confirmAuth() {
      const params = Object.assign({}, this.params),
        result = await editRoleAuth(params);
      if (handleOpResult(result)) {
        this.$Message.success('授权操作成功');
        this.$emit('refreshPage');
      } else this.$Message.error(`操作失败, 原因: ${result.msg}`);
      this.$emit('closeModals');
    },
    closeModals() {
      this.$Message.info('您取消了本次操作');
      this.$emit('closeModals');
    }
  }
  // * life
  // updated() {
  //   this.getDataList()
  // }
};
</script>

<style lang="less" scoped>
.auth-info {
  height: 36rem;
  overflow-y: auto;
  color: #666;
  .list-item {
    margin: 0.6rem 0;
  }
  .ivu-tree {
  }
}
</style>
