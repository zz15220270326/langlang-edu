<template>
  <div class="left-content">
    <row-item>
      <div slot="tag">姓名</div>
      <div slot="content">
        <Input
          placeholder="请输入姓名"
          v-model="lefts.username"
          maxlength="12"
          :readonly="readonly"
        />
      </div>
    </row-item>
    <row-item>
      <div slot="tag">手机号</div>
      <div slot="content">
        <Input
          placeholder="请输入手机号"
          v-model="lefts.phone"
          maxlength="11"
          :readonly="readonly"
        />
      </div>
    </row-item>
    <row-item>
      <div slot="tag">性别</div>
      <div slot="content">
        <RadioGroup v-model="lefts.sex">
          <Radio :label="1" :disabled="readonly">男</Radio>
          <Radio :label="2" :disabled="readonly">女</Radio>
        </RadioGroup>
      </div>
    </row-item>
    <row-item>
      <div slot="tag">负责班级</div>
      <div slot="content">
        <Checkbox v-model="selectAll" @on-change="handleSelectAll">
          全部选择
        </Checkbox>
        <CheckboxGroup
          v-model="lefts.selectClasses"
          :class="{ 'select-check': classList.length > 1 }"
          @on-change="checkSelectClass"
        >
          <Checkbox
            v-for="itm of classList"
            :key="itm.classId"
            :label="itm.classId"
            :disabled="readonly"
          >
            {{ itm.info }}
          </Checkbox>
        </CheckboxGroup>
      </div>
    </row-item>
    <row-item>
      <div slot="tag">当前职位</div>
      <div slot="content">
        <Select style="width: 200px" v-model="lefts.role">
          <Option
            v-for="item in roleList"
            :value="item.id"
            :key="item.key"
            :disabled="readonly"
          >
            {{ item.info }}
          </Option>
        </Select>
      </div>
    </row-item>
    <row-item>
      <div slot="tag">考勤卡号</div>
      <div slot="content">
        <Input
          v-model="lefts.card"
          placeholder="请输入考勤卡号"
          :readonly="readonly"
        />
      </div>
    </row-item>
  </div>
</template>

<script>
// ? components
import RowItem from '@common/modal-row-item';
// ? reuqest
// ? utils
import { localSet, deepCopyObj } from '@/utils';
// ? configs
import { garden } from '@/config';
// ? mixins
import getClassMixins from '@/mixins/Common/getClassMixins';
// ? bus
import { roleListBus, classListBus } from '../../eventBus';
import eventBus from '../../eventBus';

export default {
  name: 'LeftContent',
  components: { RowItem },
  mixins: [getClassMixins],
  data: () => ({
    lefts: {
      username: '',
      phone: '',
      sex: 1,
      selectClasses: [],
      role: '',
      card: ''
    },
    selectAll: false
  }),
  props: {
    propItems: {
      type: Object,
      default: () => ({})
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    lefts(newParams) {
      this.emitLefts(newParams);
    },
    propItems(items) {
      Object.getOwnPropertyNames(items) && this.getPropItems(items);
    }
  },
  methods: {
    // ? views
    handleSelectAll() {
      switch (this.selectAll) {
        case true:
          this.lefts.selectClasses = this.classList.map(c => c.classId);
          break;
        case false:
          this.lefts.selectClasses = [];
          break;
        default:
          break;
      }
    },
    checkSelectClass() {
      this.selectAll =
        this.lefts.selectClasses.length === this.classList.length;
    },
    // ? content
    handleGetRoleFromStorage() {
      const list = localSet(garden.ROLE_AUTH_LIST) || [];
      list.length ? (this.roleList = list) : (this.roleList = []);
    },
    emitLefts() {
      this.lefts.class = this.lefts.selectClasses.toString();
      const params = deepCopyObj(this.lefts);
      delete params.selectClasses;
      this.$emit('getLefts', params);
    },
    // ? 获取信息
    getPropItems({ username, mobile, sex, manageClass, roleName, card }) {
      this.lefts = {
        username,
        phone: mobile,
        sex,
        card,
        selectClasses: this.getIdListByNameList(manageClass.split('，')) || [],
        role: this.getRoleByName(roleName)
      };
    },
    getRoleByName(roleName) {
      return this.roleList.find(item => item.info === roleName)
        ? this.roleList.find(item => item.info === roleName).id
        : 0;
    },
    getIdListByNameList(nameList = []) {
      let list = [];
      this.classList.forEach(c => {
        nameList.forEach(n => {
          if (c.info === n) {
            list.push(c.classId);
          } else list.push(-1);
        });
      });
      list = list.filter(item => item > 0);
      return list;
    }
  },
  created() {
    this.emitLefts();
    this.handleGetRoleFromStorage();
  },
  mounted() {
    roleListBus.$on('getRolelist', list => {
      if (this.roleList.length < 0) {
        this.roleList = list;
      }
    });
    classListBus.$on('getClassList', list => (this.classList = list));
    eventBus.$on('clearContent', () => {
      this.lefts = {
        username: '',
        phone: '',
        sex: 1,
        selectClasses: [],
        role: '',
        card: ''
      };
    });
    // this.confirmAdd()
    // this.getInfos()
    // this.getEdits()
  },
  beforeDestroy() {
    roleListBus.$off('getRolelist');
    classListBus.$off('getClassList');
    classListBus.$off('clearContent');
  },
  updated() {
    this.emitLefts();
  }
};
</script>

<style lang="less" scoped>
.select-check {
  position: relative;
  left: 3.2rem;
}
</style>
