<template>
  <div class="add-infos" v-if="addList.length > 0">
    <div class="parent-info" v-for="(item, idx) in addList" :key="idx + item">
      <div class="tag">家长{{ idx + 1 }}的信息</div>
      <div class="content">
        <div class="base">
          <div class="select-type">
            <select-menu
              :listTitle="item.pTitle || ''"
              :listItems="item.pList || []"
              @handleSelect="selectParent($event, idx)"
            />
          </div>
          <div class="input">
            <Input
              placeholder="家长姓名"
              v-model="item.pName"
              style="width: 8rem;"
              @on-blur="pNameChange($event, idx)"
              maxlength="12"
            />
            <Input
              placeholder="平台绑定手机"
              v-model="item.pPhone"
              @on-blur="pPhoneChange($event, idx)"
              type="tel"
              style="width: 12rem"
              maxlength="11"
            />
            <Input
              placeholder="考勤卡号"
              v-model="item.pCard"
              @on-blur="pCardChange"
              style="width: 8rem;"
            />
          </div>
          <div class="op">
            <Button
              v-if="item.id"
              type="info"
              @click="openPFace({ id: item.id, type: 'parent' })"
            >
              查看人脸图像
            </Button>
            <Button
              :disabled="idx === 0"
              type="error"
              icon="ios-trash-outline"
              size="large"
              @click.native="deleteParent(idx)"
            />
          </div>
          <Modal
            title="家长人脸图像"
            v-model="isShowFaceModal"
            width="800"
            :footer-hide="true"
          >
            <face-audit v-bind="faceParams" @closeModals="closeModals" />
          </Modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './index.less';
// ? components
import { SelectMenu } from '@common/select-menu';
import FaceAudit from './FaceAudit';

// ? request
import { getAuditFace } from '@/request/children-profile';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  // ? arr / obj
  deepCopyObj,
  // ? regexp
  checkPhoneNumber
} from '@/utils';
import { bmBus } from '../../../../my-utils';
import { defaultParent, pList, genderList } from './data';
import { switchSex } from '../../function';

export default {
  name: 'AddInfos',
  components: {
    SelectMenu,
    FaceAudit
  },
  data: () => ({
    addList: [],
    faceParams: {},
    isShowFaceModal: false
  }),
  props: {
    eParents: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    addList() {
      this.showAddList();
    },
    eParents(list) {
      this.setParentsList(list);
    }
  },
  methods: {
    // ! 获取编辑信息
    setParentsList(list = []) {
      if (list.length > 0) {
        this.addList = [];
        list.map(item => {
          this.addList.push({
            id: item.id,
            pTitle: item.Relationship,
            pList,
            pName: item.realname,
            pPhone: item.mobile,
            pCard: item.card,
            face: item.face || '',
            sex: item.sex,
            genderTitle: switchSex(item.sex),
            genderList
          });
        });
      } else this.addList = [defaultParent];
      this.showAddList();
    },
    // ! 列表操作
    addParent() {
      this.$bus.$on('addInfantParents', () => {
        if (this.addList.length <= 3) {
          const _defaultParent = deepCopyObj(defaultParent);
          this.addList.push(_defaultParent);
          this.$emit('pNameChange', this.addList);
        } else
          this.$Notice.warning({
            title: '最多只能选择4位家长',
            duration: 2
          });
      });
    },
    deleteParent(crtIdx) {
      this.addList.splice(crtIdx, 1);
    },
    // ! 家长信息操作
    selectParent(item, idx) {
      this.addList[idx].pTitle = item.info;
      this.showAddList();
    },
    pNameChange(e) {
      // ? 家长姓名不得为空 e, idx
      const { value } = e.target;
      !value.length && this.$Message.warning('家长姓名输入不得为空');
      this.showAddList();
    },
    pPhoneChange(e, idx = 0) {
      const { value } = e.target;
      if (!checkPhoneNumber(value)) {
        this.$Message.warning('手机号不合法,请重新输入');
        this.addList[idx].pPhone = '';
      } else this.$Message.info('手机号合法');
      this.showAddList();
    },
    pCardChange() {
      this.showAddList();
    },
    showAddList() {
      // console.log(this.addList);
      this.$emit('getParentList', this.addList);
      this.$bus.$emit('showParentList', this.addList);
    },
    // ! 获取家长性别信息
    getPSex() {
      this.$bus.$on('getPSex', addList => {
        this.addList = addList;
        this.$emit('getParentList', this.addList);
      });
    },
    // ! 家长审核
    async openPFace(params = {}) {
      const result = await getAuditFace(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        const { audit_img, audit_img_status, audit_permission, cur_img } = data;
        this.faceParams = {
          ...params,
          img: cur_img || audit_img,
          status: audit_img_status,
          permission: audit_permission
        };
        if (!this.faceParams.img) {
          this.$Modal.warning({
            title: '无法审核',
            content: '原因: 暂无可用的人脸头像'
          });
          return;
        }
        this.isShowFaceModal = true;
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
    },
    closeModals() {
      this.isShowFaceModal = false;
    }
  },
  /**
   * @description
   * * Vue2.x的生命周期
   */
  created() {
    const _defaultParent = deepCopyObj(defaultParent);
    this.addList.push(_defaultParent);
  },
  mounted() {
    this.addParent();
    this.getPSex();
    bmBus.$on('clearInputAndSelect', () =>
      Object.assign(this.$data, this.$options.data())
    );
  },
  beforeDestroy() {
    bmBus.$off('clearInputAndSelect');
  }
};
</script>
