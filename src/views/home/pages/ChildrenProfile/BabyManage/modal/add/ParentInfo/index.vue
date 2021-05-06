<template>
  <Card class="parents-info">
    <div class="container" v-for="(item, key) in addList" :key="key">
      <div class="parent-name">
        <div class="tag">
          家长姓名
        </div>
        <div class="content">
          <Input :readonly="true" style="width: 200px;" :value="item.pName" />
        </div>
      </div>
      <div class="gender">
        <div class="tag">性别</div>
        <div class="content">
          <select-menu
            :listTitle="item.genderTitle"
            :listItems="item.genderList"
            @handleSelect="selectGender($event, key)"
          />
        </div>
      </div>
      <div class="phone">
        <div class="tag">
          联系手机
        </div>
        <div class="content">
          <Input
            placeholder="请输入联系手机"
            style="width: 300px"
            :value="item.pPhone"
            :readonly="!item.pName.length"
          />
        </div>
      </div>
      <!-- <Divider /> -->
    </div>
  </Card>
</template>

<script>
import './index.less';
// ? import components
import { SelectMenu } from '@common/select-menu';

// ? functions
import {
  switchGender
  // ,switchSex
} from '../function';

export default {
  name: 'ParentInfo',

  components: {
    SelectMenu
  },

  data: () => ({
    addList: []
  }),

  props: {
    eParents: {
      type: Array,
      default: () => []
    }
  },

  watch: {
    eParents(list) {
      this.setParentList(list);
    }
  },

  methods: {
    setParentList(list = []) {
      if (list.length > 0) {
        // list.map((item, index) => {
        //   this.addList[index].genderTitle = switchSex(item.sex)
        // })
        const _addList = JSON.parse(JSON.stringify(this.addList));
        this.$bus.$emit('getPSex', _addList);
        // ? 编辑右边没有手机号
        // this.addList.forEach(item => (item.pPhone = ''))
      }
    },
    showAddList() {
      this.$bus.$on('showParentList', list => {
        // if (!this.addList.length) {
        //   this.addList = list
        // } else {
        //   this.addList.map((item, index) => {
        //     if (!item.pPhone || !item.pPhone.length) {
        //       // debugger
        //       item = list[index]
        //     } else {
        //       // ? 不能更改手机号
        //       const { pName } = list[index]
        //       item.pName = pName
        //     }
        //   })
        // }
        this.addList = list;
      });
    },
    selectGender(item, crtIdx) {
      this.addList[crtIdx].genderTitle = item.info;
      this.addList.forEach(item => {
        Object.defineProperty(item, 'sex', {
          value: switchGender(item.genderTitle),
          configurable: true,
          writable: true,
          enumerable: true
        });
      });
      this.$bus.$emit('getPSex', this.addList);
    }
  },
  /**
   * @description
   * * Vue2.x的生命周期
   */
  mounted() {
    this.showAddList();
  }
};
</script>
