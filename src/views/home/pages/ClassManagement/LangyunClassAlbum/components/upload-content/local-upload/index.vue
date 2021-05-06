<template>
  <div class="local-upload">
    <div v-if="imgs.length" class="img-list">
      <div class="select-item" v-for="(item, key) in imgs" :key="key">
        <img :src="item.src" alt="" />
        <Checkbox v-model="item.isChecked"> 删除 </Checkbox>
      </div>
    </div>
    <div v-else class="empty-wrapper">
      <Divider>
        <h1>图片 - 本地上传</h1>
      </Divider>
      <Divider>
        <h2>暂无内容</h2>
      </Divider>
      <Divider>
        <h3>
          ----------------------------------------------------请先上传图片(一次至多为6张)----------------------------------------------------
        </h3>
      </Divider>
    </div>
    <div class="handle-operations">
      <Button
        size="large"
        type="info"
        icon="md-checkmark"
        :disabled="!imgs.length"
        @click.native="handleSubmit"
      >
        确认选择
      </Button>
      <Button
        size="large"
        type="error"
        icon="ios-trash-outline"
        @click.native="handleRemove"
        :disabled="!ableDelete"
      >
        选择删除
      </Button>
      <Upload
        :multiple="false"
        :action="url"
        :before-upload="getFile"
        :format="['jpg', 'png', 'jpeg', 'gif']"
        accept=".jpg, .png, .jpeg, .gif"
        :show-upload-list="false"
      >
        <Button
          size="large"
          type="success"
          icon="ios-cloud-upload-outline"
          :disabled="!ableUpload"
        >
          点击上传
        </Button>
      </Upload>
    </div>
  </div>
</template>

<script>
import './index.less';
// ? import mixins
import imgsMixins from '@/mixins/Common/imgsMixins';

export default {
  name: 'LocalUpload',
  components: {},
  mixins: [imgsMixins],
  data: () => ({}),
  props: {},
  computed: {
    ableDelete() {
      return this.imgs.some((img) => img.isChecked);
    },
    ableUpload() {
      return this.imgs.length < 6;
    }
  },
  watch: {
    // img(newValue) {
    //   this.$emit('handleLocalImg', newValue)
    // }
  },
  methods: {
    handleSubmit() {
      if (!this.imgs.length) {
        this.$Message.warning('请先选择图片');
      } else {
        this.$Modal.confirm({
          title: '选择到上传页面',
          content: '确认将以上图片添加到上传页面中?',
          onOk: () => this.confirmAddToUpload()
        });
      }
    },
    confirmAddToUpload() {
      console.log(this.imgs);
      this.$emit('handleLocalImg', this.imgs);
      this.$Message.success('上传成功');
      this.imgs = [];
    },
    handleRemove() {
      if (!this.imgs.length) {
        this.$Message.warning('请先选择图片');
      } else {
        this.$Modal.confirm({
          title: '取消选中的图片',
          content: '是否取消? 取消后需要重新选择选中的这些图片。',
          onOk: () => this.confirmRemove()
        });
      }
    },
    confirmRemove() {
      const imgs = this.imgs.filter((item) => !item.isChecked);
      this.imgs = imgs;
      this.$Message.error('删除成功');
    }
  }
};
</script>
