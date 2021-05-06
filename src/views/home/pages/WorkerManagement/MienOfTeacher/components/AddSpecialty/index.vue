<template>
  <div class="add-specialty">
    <div v-if="id <= 0" class="header">
      <div class="left">选择教师:</div>
      <div class="right">
        <select-menu
          :listTitle="classTitle"
          :listItems="classList"
          @handleSelect="selectClass"
        />
        <select-menu
          :listTitle="teacherTitle"
          :listItems="teacherList"
          @handleSelect="selectTeacher"
        />
        <Button class="import-btn" type="info"> 从职工信息中导入 </Button>
      </div>
    </div>
    <div v-else class="header">
      <div class="left">
        <h3>当前教师:</h3>
        <h2>{{ name }}</h2>
      </div>
      <div class="right">
        <Button class="import-btn" type="info"> 从职工信息中导入 </Button>
      </div>
    </div>
    <div class="body">
      <div class="left">
        <row-item>
          <span slot="tag">当前职位</span>
          <Input
            slot="content"
            v-model="career"
            :readonly="true"
            placeholder="请输入当前职位"
          />
        </row-item>
        <row-item>
          <span slot="tag">出生日期</span>
          <Input
            slot="content"
            v-model="iBirthday"
            :readonly="true"
            placeholder="请输入出生日期"
          />
        </row-item>
        <row-item>
          <span slot="tag">教育格言</span>
          <Input
            slot="content"
            v-model="iMotto"
            placeholder="请输入教育格言"
            @on-blur="getMotto"
          />
        </row-item>
        <row-item>
          <span slot="tag">教师简介</span>
          <Input
            slot="content"
            v-model="iHonor"
            placeholder="请输入教师简介"
            type="textarea"
            :rows="5"
            @on-blur="getHonor"
          />
        </row-item>
        <row-item>
          <span slot="tag">教师图片</span>
          <Upload
            slot="content"
            ref="upload1"
            class="upload-content"
            :action="url"
            :multiple="true"
            type="drag"
            :before-upload="getFile"
          >
            <Icon type="ios-camera" size="40"></Icon>
          </Upload>
        </row-item>
        <Tooltip
          v-for="(item, idx) of imgs"
          :key="idx + item"
          :content="`删除第${idx + 1}张图片`"
          placement="bottom"
          @click.native="removeImg(idx)"
        >
          <img :src="item.src" alt="" />
        </Tooltip>
      </div>
      <div class="right">
        <Upload
          ref="upload2"
          :multiple="false"
          type="drag"
          :action="url"
          :before-upload="getSingleFile"
        >
          <Avatar
            shape="circle"
            :src="img.src ? img.src : baseAvatar"
            size="80"
          />
          <p>
            <tag color="gold" size="large" v-show="!img.src">
              点击选择或拖拽添加头像
            </tag>
          </p>
        </Upload>
        <Progress
          v-show="singleProgress"
          :percent="singleProgress"
          :status="singleStatus"
          class="avatar-progress"
        />
      </div>
    </div>
    <btns :operations="operations" @handleBottomOperations="handleOp" />
  </div>
</template>

<script>
import './index.less';

// ? components
import RowItem from './RowItem';
import { SelectMenu } from '@common/select-menu';
import Btns from '@common/modal-bottom-btns';

// ? request
import { addTeacherMian, editTeacherMien } from '@/request/staff-management';
import { getPicById } from '@/request/Common';
// ? utils
import { handleOpResult, deepCopyObj } from '@/utils';
import { checkParams, clearBoth } from './util';

// ? mixins
import classTeacherMix from './classTeacherMix';
import watchProps from './watchProps';
import imgMixin from '@/mixins/Common/imgMixin';
import imgsMixins from '@/mixins/Common/imgsMixins';

import { mapState } from 'vuex';

export default {
  name: 'AddSpecialty',
  components: {
    RowItem,
    SelectMenu,
    Btns
  },
  mixins: [classTeacherMix, watchProps, imgMixin, imgsMixins],
  data: () => ({
    baseAvatar: require('@/assets/images/preview.png'),
    img: {},
    career: '',
    iBirthday: '',
    iMotto: '',
    iHonor: '',
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
    params: {}
  }),
  watch: {
    img(newVal) {
      this.params.icon = newVal.pId;
      this.params.icon_url = newVal.src;
    },
    imgs(newVal) {
      this.params.images = newVal.map(img => img.pId).toString();
      this.params.images_url = newVal.map(img => img.src).toString();
    },
    async icon(newVal) {
      this.img = {
        pId: newVal,
        src: await this.getIconById(newVal)
      };
    }
  },
  computed: {
    ...mapState(['platformUrl'])
  },
  methods: {
    getMotto(e) {
      const { value } = e.target;
      if (value.length) {
        this.params.motto = value;
      } else delete this.params.motto;
    },
    getHonor(e) {
      const { value } = e.target;
      if (value.length) {
        this.params.honor = value;
      } else delete this.params.honor;
    },
    removeImg(idx = 0) {
      this.imgs.splice(idx, 1);
      this.$Message.info({ content: '删除成功', background: true });
    },
    handleOp(btnTag) {
      switch (btnTag) {
        case '确认':
          this.handleSubmit();
          break;
        case '取消':
          this.closeModals();
          break;
      }
    },
    handleSubmit() {
      const params = deepCopyObj(this.params);
      if (checkParams(params)) {
        const title = this.id <= 0 ? '添加教师风采' : '编辑教师风采',
          content = '确认操作?';
        this.$Modal.confirm({
          title,
          content,
          onOk: () =>
            this.id <= 0 ? this.confirmAdd(params) : this.handleEdit(params)
        });
      }
    },
    async confirmAdd(params) {
      this.$Message.info('新增');
      const result = await addTeacherMian(params);
      this.checkResult(result);
    },
    async handleEdit({ id, icon, icon_url, images, images_url, honor, motto }) {
      this.$Message.info('编辑');
      const result = await editTeacherMien({
        id: id.toString(),
        icon,
        icon_url,
        images,
        images_url,
        honor,
        motto
      });
      this.checkResult(result);
    },
    checkResult(result) {
      if (handleOpResult(result)) {
        this.$Message.success({ content: '操作成功', background: false });
        this.$emit('refreshPage');
      } else this.$Message.error(`操作失败, 原因: ${result.msg}`);
      this.$emit('closeModals');
    },
    closeModals() {
      this.$Message.info('您取消了本次操作');
      this.$emit('closeModals');
      clearBoth(this);
    },
    async getIconById(icon) {
      const result = await getPicById({ icon });
      if (result.data) {
        return result.data;
      } else return this.baseAvatar;
    }
  }
};
</script>
