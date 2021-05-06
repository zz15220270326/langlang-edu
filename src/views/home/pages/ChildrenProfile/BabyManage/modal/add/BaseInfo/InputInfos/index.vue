<template>
  <div class="input">
    <div class="wrapper">
      <div class="tag">姓名</div>
      <div class="content">
        <Input
          placeholder="请输入幼儿姓名"
          v-model="username"
          @on-blur="getUsername"
          maxlength="12"
          :show-word-limit="true"
        />
      </div>
    </div>
    <div class="wrapper">
      <div class="tag">性别</div>
      <div class="content">
        <RadioGroup v-model="gender" @on-change="getGender">
          <Radio label="男" />
          <Radio label="女" />
        </RadioGroup>
      </div>
    </div>
    <div class="wrapper">
      <div class="tag">民族</div>
      <div class="content">
        <select-menu
          :listTitle="nation"
          :listItems="nationList"
          @handleSelect="selectNation"
        />
      </div>
    </div>
    <div class="wrapper">
      <div class="tag">出生日期</div>
      <div class="content">
        <DatePicker
          class="select-date"
          :placeholder="birthday"
          type="date"
          :transfer="true"
          @on-change="getBirthday"
        />
      </div>
    </div>
    <div class="wrapper">
      <div class="tag">入园日期</div>
      <div class="content">
        <DatePicker
          class="select-date"
          :placeholder="inGardenDate"
          type="date"
          :transfer="true"
          @on-change="getGardenDate"
        />
      </div>
    </div>
    <div class="wrapper">
      <div class="tag">所在班级</div>
      <div class="content">
        <select-menu
          :listTitle="classTitle"
          :listItems="classList"
          @handleSelect="selectClass"
        />
      </div>
    </div>
    <div class="wrapper">
      <div class="tag">人脸图像</div>
      <div class="content">
        <Button type="success" @click.native="handleInfantFace">
          查看人脸图像
        </Button>
      </div>
    </div>
    <!-- modal-content -->
    <Modal
      v-model="isShowInfant"
      title="幼儿人脸图像"
      width="800"
      :footer-hide="true"
    >
      <face-avatar
        :curImg="curImg"
        :permision="permision"
        :status="status"
        :checkParams="checkParams"
        @closeCheck="closeCheck"
      />
    </Modal>
  </div>
</template>

<script>
import './index.less';
// ? components
import { SelectMenu } from '@common/select-menu';
import FaceAvatar from './FaceAvatar';
// ? request
import { getAuditFace } from '@/request/children-profile';
// ? utils
import {
  // ? arr / obj
  deepCopyObj,
  // ? request
  getDataSource,
  checkDataSource
} from '@/utils';
import { bmBus } from '../../../../my-utils';
import { handleStatus } from '../../function';
// ? mixins
import getClassMix from '@/mixins/Common/getClassMixins';
import nationMix from '@/mixins/Common/nationMixin';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'InputInfos',

  components: {
    SelectMenu,
    FaceAvatar
  },

  mixins: [getClassMix, nationMix],

  data() {
    return {
      // ? show-data
      username: '',
      gender: '',
      birthday: '',
      inGardenDate: '',
      curImg: '',
      isShowInfant: false,
      status: '',
      permision: 0,
      checkParams: {},
      // ? upload-data
      params: {}
    };
  },

  props: {
    eInput: {
      type: Object,
      default: () => ({})
    }
  },

  watch: {
    nation(newVal) {
      this.setNation(newVal);
    },
    currentClassId(newVal) {
      this.getClassId(newVal);
    },
    eInput(inputs) {
      if (Object.getOwnPropertyNames(inputs) && inputs.id) {
        console.log(inputs);
        this.initEdits(inputs);
        this.setEditParams(inputs);
      }
    }
  },

  computed: {
    ...mapState(['platformUrl'])
  },

  methods: {
    getUsername(e) {
      const { value } = e.target;
      value.length
        ? (this.params.username = value)
        : delete this.params.username;
      this.getInputParams();
    },
    getGender(sex) {
      switch (sex) {
        case '男':
          this.params.sex = 1;
          break;
        case '女':
          this.params.sex = 2;
          break;
        default:
          break;
      }
      this.getInputParams();
    },
    setNation(nation) {
      nation !== '请选择民族'
        ? (this.params.nation = nation)
        : delete this.params.nation;
      this.getInputParams();
    },
    getBirthday(date) {
      date.length ? (this.params.birthday = date) : delete this.params.birthday;
      this.getInputParams();
    },
    getGardenDate(date) {
      date.length
        ? (this.params.gardenDate = date)
        : delete this.params.gardenDate;
      this.getInputParams();
    },
    getClassId(classId) {
      classId > 0
        ? (this.params.classId = classId)
        : delete this.params.classId;
      this.getInputParams();
    },
    getInputParams() {
      const params = deepCopyObj(this.params);
      this.$emit('getInputParams', params);
    },
    // ? edits
    initEdits({ NickName, sex, nation, birthday, InGardenDate, ClassId }) {
      this.username = NickName;
      this.gender = sex === 1 ? '男' : sex === 2 ? '女' : '';
      this.nation = nation || '';
      this.birthday = birthday || '';
      this.inGardenDate = InGardenDate || '';
      this.currentClassId = ClassId || '';
      this.classTitle = this.classList.length
        ? this.classList.find(item => item.classId === ClassId).info
        : '请选择班级';
    },
    setEditParams({
      NickName,
      sex,
      nation,
      birthday,
      InGardenDate,
      ClassId,
      id
    }) {
      this.params = {
        username: NickName,
        sex,
        nation,
        birthday,
        gardenDate: InGardenDate,
        classId: ClassId,
        id: id || -1
      };
    },
    // ? get-face
    handleInfantFace() {
      if (!this.params.id) {
        this.$Message.warning({
          content: '暂无人脸图像',
          background: true
        });
      } else {
        const params = {
          id: this.params.id,
          type: 'infant'
        };
        this.getFace(params);
      }
    },
    async getFace(params) {
      const result = await getAuditFace(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource),
          { audit_img, cur_img, audit_permission, audit_img_status } = data;
        // console.log(data);
        if (!audit_img) {
          this.$Modal.info({
            title: '提示:',
            content: '人脸图像为空!'
          });
        } else {
          this.curImg = audit_img || cur_img || '';
          this.permision = audit_permission;
          this.status = handleStatus(audit_img_status);
          this.checkParams = {
            ...params,
            audit: audit_permission
          };
          this.isShowInfant = true;
        }
      } else this.$Message.error(`获取人脸失败, 原因: ${result.msg}`);
    },
    closeCheck() {
      this.isShowInfant = false;
    }
  },
  mounted() {
    bmBus.$on('clearInputAndSelect', () => {
      const { nationList, classList } = this;
      // Object.assign(this.$data, this.$options.data());
      this.username = '';
      this.gender = '';
      this.nation = '请选择民族';
      this.birthday = '';
      this.inGardenDate = '';
      this.curImg = '';
      this.classTitle = '请选择班级';
      this.currentClassId = 0;
      this.nationList = nationList;
      this.classList = classList;
    });
  },
  beforeDestroy() {
    bmBus.$off('clearInputAndSelect');
  }
};
</script>
