<template>
  <div class="add-content">
    <div class="title">
      <div class="tag">
        <Tag color="lime" size="large">标题</Tag>
      </div>
      <div class="content">
        <Input
          v-model="inputTitle"
          maxlength="30"
          placeholder="输入长度不得超过30"
        />
      </div>
    </div>
    <div class="introduce">
      <div class="tag">
        <Tag color="lime" size="large">简介</Tag>
      </div>
      <div class="content">
        <Input
          v-model="inputIntroduce"
          type="textarea"
          :rows="3"
          maxlength="100"
          placeholder="简介(不超过100字符)"
        />
      </div>
    </div>
    <div class="is-set-top">
      <div class="tag">
        <Tag color="pink" size="large">是否置顶</Tag>
      </div>
      <div class="content">
        <RadioGroup v-model="isSetTop">
          <Radio label="是" />
          <Radio label="否" />
        </RadioGroup>
      </div>
    </div>
    <div class="upload-image">
      <div class="tag">
        <Tag color="purple" size="large">上传图片</Tag>
      </div>
      <div class="content">
        <Upload
          class="upload-image"
          :action="url"
          :before-upload="getSingleFile"
          :multiple="false"
          :format="['jpg', 'png', 'jpeg', 'gif']"
          accept=".jpg, .png, .jpeg, .gif"
          :show-upload-list="false"
        >
          <Button type="info" icon="ios-cloud-upload-outline" size="large">
            点击上传图片
          </Button>
        </Upload>
        <div class="upload-img">
          <img v-if="img.src" :src="img.src" />
          <Progress
            v-show="singleProgress > 0"
            :progress="singleProgress"
            :status="singleStatus"
            class="avatar-progress"
          />
        </div>
      </div>
    </div>
    <my-editor
      :propContent="editInputContent"
      @inputContentChange="getContent"
    />
    <my-btns :operations="operations" @handleBottomOperations="handleOp" />
  </div>
</template>

<script>
import './AddContent.less';
// ? components
import MyEditor from '@common/content-editor';
import MyBtns from '@common/modal-bottom-btns';
// ? request
import { addGA, editGA } from '@/request/notice-active';
// ? utils
import { handleOpResult, handleErrorCode } from '@/utils';
import { handleIsTopCode } from '../../common';
// ? mixins
import imgMixin from '@/mixins/Common/imgMixin';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'AddContent',
  components: {
    MyEditor,
    MyBtns
  },
  mixins: [imgMixin],
  data() {
    return {
      inputTitle: '',
      inputIntroduce: '',
      isSetTop: '否',
      file: [],
      img: '',
      inputContent: '',
      operations: [
        {
          tag: '发布',
          type: 'success'
        },
        {
          tag: '取消',
          type: 'error'
        }
      ]
    };
  },
  props: {
    id: {
      type: Number,
      default: -1
    },
    editTitle: {
      type: String,
      default: ''
    },
    editIntroduce: {
      type: String,
      default: ''
    },
    editIsSetTop: {
      type: String,
      default: ''
    },
    editImg: {
      type: Object,
      default: () => ({})
    },
    editInputContent: {
      type: String,
      default: ''
    },
    recipientIds: {
      type: String,
      default: ''
    }
  },
  watch: {
    editTitle(newValue) {
      this.inputTitle = newValue;
    },
    editIntroduce(newValue) {
      this.inputIntroduce = newValue;
    },
    editIsSetTop(newValue) {
      this.isSetTop = newValue;
    },
    editImg(newValue) {
      this.img = newValue;
    },
    editInputContent(newValue) {
      this.inputContent = newValue;
    }
  },
  computed: {
    ...mapState(['platformUrl'])
  },
  methods: {
    getContent(content) {
      this.inputContent = content;
    },
    handleOp(btnTag) {
      switch (btnTag) {
        case '发布':
          this.handleRelease();
          break;
        case '取消':
          this.handleCloseModal();
          break;
      }
    },
    handleRelease() {
      this.id < 0 ? this.handleAdd() : this.handleEdit();
    },
    async handleAdd() {
      if (this.checkInput()) {
        const params = {
          title: this.inputTitle,
          summary: this.inputIntroduce,
          isTop: handleIsTopCode(this.isSetTop),
          picIds: this.img.pId,
          pic_url: this.img.src,
          content: this.inputContent
        };
        const result = await addGA(params);
        if (handleOpResult(result)) {
          this.$Message.success('新增成功');
          this.$emit('refreshPage');
        } else
          this.$Message.error(
            `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
          );
        this.$emit('closeModals');
      }
    },
    async handleEdit() {
      this.$Message.info('编辑');
      const params = {
        id: this.id,
        title: this.inputTitle,
        summary: this.inputIntroduce,
        isTop: handleIsTopCode(this.isSetTop),
        content: this.inputContent,
        recipientIds: this.recipientIds,
        picIds: this.img.pId,
        pic_url: this.img.src
      };
      if (this.img.pId !== '') {
        params.picIds = this.img.pId;
      } else delete params.picIds;
      console.log(params);
      const result = await editGA(params);
      if (handleOpResult(result)) {
        this.$Message.success('编辑成功');
        this.$emit('refreshPage');
      } else
        this.$Message.error(
          `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
      this.$emit('closeModals');
    },
    checkInput() {
      if (this.inputTitle === '') {
        this.$Message.warning('输入的标题不能为空');
        return false;
      }
      if (this.inputContent === '') {
        this.$Message.warning('输入的内容不能为空');
        return false;
      }
      return true;
    },
    handleCloseModal() {
      this.$Message.info('您取消了本次对话');
      this.$emit('closeModals');
    }
  }
};
</script>
