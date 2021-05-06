<template>
  <div class="add-garden-notice">
    <div v-if="isRenderClass" class="class-list">
      <div class="tag">
        <Tag color="blue" size="large">班级:</Tag>
      </div>
      <div class="content">
        <class-menu
          :listTitle="classTitle"
          :listItems="classList"
          @handleSelect="selectClass"
        />
      </div>
    </div>
    <div class="title">
      <div class="tag">
        <Tag color="gold" size="large">标题:</Tag>
      </div>
      <div class="content">
        <Input
          ref="titleRef"
          placeholder="请输入标题"
          @on-blur="getInputTitle"
        />
      </div>
    </div>
    <div class="content">
      <div class="tag">
        <Tag color="lime" size="large">内容:</Tag>
      </div>
      <div class="content">
        <Input
          ref="contentRef"
          type="textarea"
          placeholder="请输入内容(1000字以内)"
          maxlength="1000"
          :rows="8"
          :show-word-limit="true"
          @on-blur="getInputContent"
        />
      </div>
    </div>
    <div class="img">
      <div class="tag">
        <Tag color="purple" size="large">图片</Tag>
      </div>
      <div class="content">
        <Upload
          :action="url"
          :multiple="true"
          ref="sourceList"
          :format="['jpg', 'jpeg', 'png']"
          :max-size="2048"
          :show-upload-list="false"
          :before-upload="getFile"
          :on-progress="handleProgress"
        >
          <Button icon="ios-cloud-upload-outline" size="large">上传图片</Button>
        </Upload>
        <div class="img-content" v-show="imgs.length !== 0">
          <Tooltip
            v-for="(img, idx) of imgs"
            :key="idx + 1 + img.src"
            content="点击即可删除图片"
            @click.native="handleRemoveImg(img)"
          >
            <img :src="img.src" alt="" />
          </Tooltip>
        </div>
      </div>
    </div>
    <btns
      :operations="operations"
      size="large"
      @handleBottomOperations="handleOperations"
    />
  </div>
</template>

<script>
// ? components
import { SelectMenu as ClassMenu } from '@common/select-menu';
import Btns from '@common/modal-bottom-btns';
// ? utils
import { deepCopyObj } from '@/utils';
// ? mixins
import imgsMixins from '@/mixins/Common/imgsMixins';
import getClassMixins from '@/mixins/Common/getClassMixins';

export default {
  name: 'AddNotice',
  components: {
    ClassMenu,
    Btns
  },
  mixins: [imgsMixins, getClassMixins],
  data: () => ({
    params: {},
    sourceList: [],
    operations: [
      {
        tag: '提交',
        type: 'primary'
      },
      {
        tag: '取消',
        type: 'error'
      }
    ]
  }),
  props: {
    isRenderClass: {
      type: Boolean,
      default: false
    },
    addInputTitle: {
      type: String,
      default: ''
    },
    addInputContent: {
      type: String,
      default: ''
    },
    addImgList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    addInputTitle(newValue) {
      if (newValue === '') {
        this.inputTitle = newValue;
      }
    },
    addInputContent(newValue) {
      if (newValue === '') {
        this.inputContent = newValue;
      }
    },
    addImgList(newValue) {
      if (newValue.length === 0) {
        this.imgs = newValue;
      }
    },
    currentClassId(newVal) {
      if (newVal > 0) {
        this.params.classId = newVal;
      } else delete this.params.classId;
    }
  },
  computed: {},
  methods: {
    // ? 上传图片相关方法
    // ? inputTitle inputContent imgList
    getInputTitle(event) {
      const { value } = event.target;
      if (value !== '') {
        this.params.title = value;
      } else delete this.params.title;
    },
    getInputContent(event) {
      const { value } = event.target;
      value !== '' ? (this.params.content = value) : delete this.params.content;
    },
    handleOperations(btnTag) {
      switch (btnTag) {
        case '提交':
          this.handleSubmit();
          break;
        case '取消':
          this.handleCancel();
          break;
      }
    },
    getPicIds() {
      if (this.imgs.length > 0) {
        this.params.picIds = this.imgs.map(item => item.pId).toString();
        this.params.images_url = this.imgs.map(item => item.src).toString();
      } else {
        delete this.params.picIds;
        delete this.params.images_url;
      }
    },
    handleRemoveImg({ pId }) {
      this.imgs = this.imgs.filter(img => img.pId !== pId);
    },
    async handleSubmit() {
      this.getPicIds();
      if (!this.params.title || !this.params.content) {
        this.$Message.warning('输入内容不得为空');
        return;
      }
      const params = deepCopyObj(this.params);
      this.$emit('handleAdd', params);
      this.clearBoth();
    },
    handleCancel() {
      this.$Message.info('您取消了本次添加');
      this.$emit('closeModals');
      this.clearBoth();
    },
    clearBoth() {
      this.imgs = [];
      this.params = {
        title: '',
        content: '',
        picIds: '',
        images_url: ''
      };
      this.clearInput();
    },
    clearInput() {
      this.inputTitle = '';
      this.inputContent = '';
      const { titleRef, contentRef } = this.$refs,
        titleInput = titleRef.$el.querySelector('input'),
        contentInput = contentRef.$el.querySelector('textarea');
      titleInput.value = '';
      contentInput.value = '';
    }
  }
  /**
   * ! life-hooks
   */
};
</script>

<style lang="less" scoped>
.common_dec() {
  margin-top: 1.2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .tag {
    flex: 2;
    text-align: right;
    margin-right: 2.5rem;
  }
  .content {
    flex: 7;
    margin-right: 5rem;
  }
}

.add-garden-notice {
  height: 38rem;
  overflow: auto;
  .class-list {
    .common_dec();
    .select-menu {
      position: relative;
      bottom: 0.75rem;
    }
  }
  .title {
    .common_dec();
  }
  .content {
    .common_dec();
  }
  .img {
    .common_dec();
    .img-content {
      .common_dec();
      height: 8rem;
      overflow-y: auto;
      flex-wrap: wrap;
      img {
        width: 6rem;
        height: 4rem;
        margin: 0 0.3rem;
        position: relative;
        &:hover {
          opacity: 0.8;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
