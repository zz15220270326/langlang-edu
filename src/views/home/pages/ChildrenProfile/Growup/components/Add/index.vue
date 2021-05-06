<template>
  <div class="edit-content">
    <div class="wrapper">
      <div class="tag">
        <Tag size="large">所在班级:</Tag>
      </div>
      <div class="content">
        <select-menu
          :listTitle="classTitle"
          :listItems="classList"
          @handleSelect="selectClass"
        />
      </div>
    </div>
    <div class="wrapper">
      <div class="tag">
        <Tag size="large">幼儿姓名:</Tag>
      </div>
      <div class="content">
        <select-menu
          :listTitle="childName"
          :listItems="childrenList"
          @handleSelect="selectChild"
        />
      </div>
    </div>
    <div class="wrapper">
      <div class="tag">
        <Tag size="large">选择月份:</Tag>
      </div>
      <div class="content">
        <DatePicker
          ref="pickYm"
          type="month"
          :placeholder="date.length ? date : placeHolder"
          @on-change="getDate"
          placement="right-start"
        ></DatePicker>
      </div>
    </div>
    <div class="wrapper">
      <div class="tag">
        <Tag size="large">获得荣誉:</Tag>
      </div>
      <div class="content">
        <Rate v-model="honor" @on-change="getHonor" />
      </div>
    </div>
    <div class="wrapper">
      <div class="tag">
        <Tag size="large">教师评语:</Tag>
      </div>
      <div class="content">
        <Input
          v-model="comment"
          type="textarea"
          :rows="6"
          maxlength="1000"
          :show-word-limit="true"
          @on-blur="getComment"
        />
      </div>
    </div>
    <div class="wrapper">
      <div class="tag">
        <Tag size="large">生活剪影:</Tag>
      </div>
      <div class="content">
        <Upload
          class="life-upload"
          :action="url"
          :before-upload="getFile"
          ref="upload"
          :show-upload-list="true"
          :format="['jpg', 'jpeg', 'png']"
          :max-size="2048"
          multiple
          type="drag"
        >
          <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-add" size="20"></Icon>
          </div>
        </Upload>
        <div class="imgs-wrapper">
          <Tooltip
            content="点击删除"
            v-show="imgs.length"
            v-for="(item, imgIdx) in imgs"
            :key="imgIdx"
          >
            <img :src="item.src" alt="" @click="removeImg(imgIdx)" />
          </Tooltip>
        </div>
      </div>
    </div>
    <btns :operations="operations" @handleBottomOperations="handleOps" />
  </div>
</template>

<script>
import './index.less';
// ? import components
import { SelectMenu } from '@common/select-menu';
import Btns from '@common/modal-bottom-btns';

// ? request
import { addGrowup, editGrowup } from '@/request/children-profile';
// ? utils
import { deepCopyObj, handleOpResult } from '@/utils';
// ? mixins
import selectMix from './childMix';
import editMix from './editMix';
import imgsMixs from '@/mixins/Common/imgsMixins';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'Add__Edit',
  components: { SelectMenu, Btns },
  mixins: [selectMix, editMix, imgsMixs],
  data: () => ({
    date: '',
    honor: 0,
    comment: '',
    operations: [
      {
        tag: '发布',
        type: 'success'
      },
      {
        tag: '取消',
        type: 'error'
      }
    ],
    // ? upload
    params: {}
  }),
  watch: {
    imgs(newVal) {
      // picIds
      this.setParamsImg(newVal);
    }
  },
  computed: {
    ...mapState(['defaultYear', 'defaultMonth']),
    placeHolder() {
      return `请选择月份:(当前:${this.defaultYear}-${this.defaultMonth})`;
    }
  },
  methods: {
    getDate(ym) {
      ym.length ? (this.params.date = ym) : this.initDate();
    },
    initDate() {
      const ym = `${this.defaultYear}-${this.defaultMonth}`;
      this.params.date = ym;
    },
    getHonor(honor) {
      this.params.honor = honor;
    },
    getComment(e) {
      const { value } = e.target;
      value.length ? (this.params.comment = value) : delete this.params.comment;
    },
    setParamsImg(imgs = []) {
      if (imgs.length) {
        this.params.picIds = imgs.map(item => item.pId).toString();
        this.params.urlSet = imgs.map(item => item.src).toString();
      }
    },
    removeImg(idx) {
      this.imgs.splice(idx, 1);
      this.$Message.info({ content: '删除成功', background: true });
    },
    handleOps(btnTag) {
      switch (btnTag) {
        case '发布':
          this.handleSubmit();
          break;
        case '取消':
          this.handleClose();
          break;
      }
    },
    checkParams() {
      if (!this.params.classId || !this.params.grade) {
        this.$Message.warning('请先选择班级');
        return false;
      }
      if (!this.params.infantId) {
        this.$Message.warning('请选择班级中的幼儿');
        return false;
      }
      if (!this.params.date) {
        this.$Message.warning('请选择月份');
        return false;
      }
      if (!this.params.honor) {
        this.$Message.warning('请评荣誉');
        return false;
      }
      if (!this.params.comment) {
        this.$Message.warning('请填写教师评语');
        return false;
      }
      if (!this.params.picIds || !this.params.picIds.length) {
        this.$Message.warning('请选择图片作为孩子的剪影');
        return false;
      }
      return true;
    },
    handleSubmit() {
      if (this.checkParams()) {
        if (this.edits.id) {
          this.params.id = this.edits.id.toString();
        }
        this.params.name = this.childName;
        console.log(this.params);
        const title = this.edits.id ? '编辑' : '新增';
        this.$Modal.confirm({
          title,
          content: '确认操作 ? ',
          onOk: () => {
            if (this.edits.id) {
              this.handleEdit();
            } else this.handleAdd();
          }
        });
      }
    },
    async handleAdd() {
      const params = deepCopyObj(this.params);
      params.name = this.childrenList.find(
        item => (params.infantId = item.infantId)
      ).info;
      const result = await addGrowup(params);
      this.checkOp(result);
    },
    async handleEdit() {
      const params = deepCopyObj(this.params);
      // params.classId = this.params.classId.toString();
      // params.grade = this.params.grade.toString();
      // params.infantId = this.params.infantId.toString();
      params.name = this.childrenList.find(
        item => (params.infantId = item.infantId)
      ).info;
      console.log(params);
      const result = await editGrowup(params);
      this.checkOp(result);
    },
    checkOp(result) {
      if (handleOpResult(result)) {
        this.$Message.success({ content: '操作成功', background: true });
        this.$emit('refreshPage');
        this.clearBoth();
      } else
        this.$Message.error({
          content: `操作失败, 原因: ${result.msg}`,
          background: true
        });
      this.$emit('closeModals');
    },
    handleClose() {
      this.$Message.info({ content: '您取消了本次操作', background: true });
      this.$emit('closeModals');
      this.clearBoth();
    },
    clearBoth() {
      this.currentClassId = this.classList[0].id;
      this.data = '';
      this.comment = '';
      this.params = {};
      // Object.assign(this.$data, this.$options.data());
    }
  },
  /**
   * @description
   * * Vuex2.x 生命周期
   */
  created() {
    this.initDate();
  }
};
</script>
