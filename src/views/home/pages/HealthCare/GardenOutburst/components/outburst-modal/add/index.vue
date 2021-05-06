<template>
  <div class="add-outBurstContent">
    <modal-row-item>
      <List slot="tag"> 所在班级 </List>
      <select-menu
        slot="content"
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
    </modal-row-item>
    <modal-row-item>
      <List slot="tag"> 幼儿姓名: </List>
      <Select v-model="params.infant" slot="content" class="select-menu">
        <Option
          v-for="infant of infantList"
          :key="infant.id"
          :value="infant.id"
        >
          {{ infant.name }}
        </Option>
      </Select>
    </modal-row-item>
    <modal-row-item>
      <List slot="tag"> 状况名称: </List>
      <Input
        slot="content"
        placeholder="请填写状况名称"
        v-model="params.outBurstName"
      />
    </modal-row-item>
    <modal-row-item>
      <List slot="tag"> 发生场景: </List>
      <Input
        slot="content"
        v-model="params.outBurstScene"
        placeholder="请填写发生场景(300字以内)"
        type="textarea"
        :rows="6"
        maxlength="300"
      />
    </modal-row-item>
    <modal-row-item>
      <List slot="tag"> 处理情况: </List>
      <Input
        slot="content"
        v-model="params.outBurstContent"
        placeholder="请填写处理情况(300字以内)"
        type="textarea"
        :rows="6"
        maxlength="300"
      />
    </modal-row-item>
    <modal-row-item>
      <List slot="tag"> 当前教师: </List>
      <Select v-model="params.teacher" slot="content" class="select-menu">
        <Option
          v-for="teacher of teacherList"
          :key="teacher.id"
          :value="teacher.id"
        >
          {{ teacher.name }}
        </Option>
      </Select>
    </modal-row-item>
    <div class="imgs">
      <div class="tag">
        <List> 状况图片: </List>
      </div>
      <div slot="content" class="content">
        <Upload
          multiple
          :action="url"
          :before-upload="getFile"
          :show-upload-list="false"
          :format="['jpg', 'jpeg', 'png']"
          :max-size="2048"
        >
          <div style="width: 58px; height: 58px; line-height: 58px">
            <Button size="large">
              点击上传图片
              <Icon type="ios-camera" size="20"></Icon>
            </Button>
          </div>
        </Upload>
        <div class="img-wrapper" v-if="imgs.length > 0">
          <Tooltip
            v-for="(itm, idx) in imgs"
            :key="idx"
            content="点击删除图片"
            @click.native="removeImg(idx)"
          >
            <img :src="itm.src" alt="" />
          </Tooltip>
        </div>
      </div>
    </div>
    <btns :operations="operations" @handleBottomOperations="handleOperations" />
  </div>
</template>

<script>
import './index.less';
// ? common components
import ModalRowItem from '@common/modal-row-item';
import { SelectMenu } from '@common/select-menu';
import Btns from '@common/modal-bottom-btns';
// ? mixins
import getClassMixins from '@/mixins/Common/getClassMixins';
import imgsMixins from '@/mixins/Common/imgsMixins';
// ? request
import {
  getTcrAndIftByClass,
  addOutBurst,
  editOutBurst
} from '@/request/health-care';
// ? utils
import {
  getDataSource,
  checkDataSource,
  handleOpResult,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
import { handleCheck } from '../../../myUtils';

export default {
  name: 'ChangeOutBurst',
  components: {
    ModalRowItem,
    SelectMenu,
    Btns
  },
  mixins: [getClassMixins, imgsMixins],
  data: () => ({
    operations: [
      {
        tag: '确认',
        type: 'success'
      },
      {
        tag: '取消',
        type: 'error'
      }
    ],
    infantList: [],
    teacherList: [],
    params: {
      classId: 0,
      infant: 0,
      outBurstName: '',
      outBurstScene: '',
      outBurstContent: '',
      teacher: 0,
      pictures: '',
      pictures_urls: ''
    }
  }),
  props: {
    id: {
      type: Number,
      default: -1
    },
    propItem: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    currentClassId(newVal) {
      if (newVal > 0) {
        this.getTSInfo(newVal);
        this.params.classId = newVal;
      }
    },
    imgs(newVal) {
      if (newVal.length) {
        this.params.pictures = newVal.map(img => img.pId).toString();
        this.params.pictures_urls = newVal.map(img => img.src).toString();
      } else {
        this.params.pictures = '';
        this.params.pictures_urls = '';
      }
    },
    propItem(newVal) {
      Object.getOwnPropertyNames(newVal).length && this.initEdit(newVal);
    }
  },
  methods: {
    async getTSInfo(classId) {
      const result = await getTcrAndIftByClass({ classId }),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.infantList = [];
        this.teacherList = [];
        dataSource.children_name &&
          this.setInfantList(dataSource.children_name);
        dataSource.teacher_name &&
          this.setTeachertList(dataSource.teacher_name);
      }
    },
    setInfantList(children = []) {
      if (children.length) {
        children.forEach(c => {
          this.infantList.push({
            id: c.id,
            name: c.name
          });
        });
        this.params.infant = children[0].id;
      } else {
        this.infantList = [
          {
            id: 0,
            name: '暂无幼儿信息'
          }
        ];
        this.params.infant = 0;
      }
    },
    setTeachertList(teachers) {
      if (teachers.length > 0) {
        teachers.forEach(t => {
          this.teacherList.push({
            id: t.id,
            name: t.name
          });
        });
        this.params.teacher = teachers[0].id;
      } else {
        this.teacherList = [
          {
            id: 0,
            name: '暂无教师信息'
          }
        ];
        this.params.teacher = 0;
      }
    },
    removeImg(crtIdx) {
      this.imgs.splice(crtIdx, 1);
    },
    initEdit(propItem) {
      this.classTitle = propItem.className;
      this.currentClassId = propItem.ClassId;
      this.params = {
        classId: propItem.ClassId,
        infant: parseInt(propItem.Infant),
        outBurstName: propItem.OutBurstName,
        outBurstScene: propItem.OutBurstScene,
        outBurstContent: propItem.OutBurstContent,
        teacher: parseInt(propItem.Teacher),
        pictures: propItem.pictures.toString() || ''
      };
    },
    handleOperations(btnTag) {
      switch (btnTag) {
        case '确认':
          this.handleAddAccident();
          break;
        case '取消':
          this.handleCancel();
          break;
        default:
          break;
      }
    },
    handleAddAccident() {
      if (handleCheck(this.params)) {
        const title = this.id > 0 ? '编辑突发状况' : '添加突发状况';
        this.$Modal.confirm({
          title,
          content: '确认操作?',
          onOk: () =>
            this.id > 0
              ? this.confirmEditAccident(this.params)
              : this.confirmAddAccident(this.params)
        });
      }
    },
    async confirmAddAccident(data) {
      const params = deepCopyObj(data),
        result = await addOutBurst(params);
      this.checkResult(result);
    },
    async confirmEditAccident(editItem) {
      const params = deepCopyObj({ ...editItem, id: this.id }),
        result = await editOutBurst(params);
      this.checkResult(result);
    },
    checkResult(result) {
      if (handleOpResult(result)) {
        const msg = this.id > 0 ? '编辑成功' : '添加成功';
        this.$Message.success(msg);
        this.$emit('refreshPage');
      } else this.$Message.error(`操作失败, 原因: ${result.msg}`);
      this.$emit('closeModals');
      this.clearBoth();
    },
    handleCancel() {
      this.$Message.info('您取消了本次操作');
      this.$emit('closeModals');
      this.clearBoth();
    },
    clearBoth() {
      const { classList } = this; // infantList, teacherList
      Object.assign(this.$data, this.$options.data());
      this.classList = classList;
      this.classTitle = classList[0].info;
      this.currentClassId = classList[0].classId;
    }
  }
};
</script>
