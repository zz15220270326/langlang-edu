<template>
  <div class="edit-info">
    <div class="top">
      <div class="img">
        <img :src="params.src" alt="" />
      </div>
      <div class="input">
        <Input
          v-model="params.info"
          type="textarea"
          :rows="4"
          placeholder="图片说明(不超过100个字)"
        />
      </div>
      <div class="set-wrap">
        <!-- <Button type="primary" :disabled="params.isCover > 0">
          设置为封面
        </Button> -->
        <Checkbox v-model="params.isCover">
          设置为封面
        </Checkbox>
      </div>
    </div>
    <div class="select-album">
      <div class="tag">
        <Tag color="skyblue" size="large">选择所在相册:</Tag>
      </div>
      <div class="content">
        <Select v-model="params.albumId">
          <Option
            v-for="album of params.albumList"
            :key="album.id"
            :value="album.id"
          >
            {{ album.title }}
          </Option>
        </Select>
      </div>
    </div>
    <btns :operations="operations" @handleBottomOperations="handleOps" />
  </div>
</template>

<script>
// ? import components
import Btns from '@common/modal-bottom-btns';
// ? request
import { editPic } from '@/request/class-management';
// ? utils
import { handleOpResult } from '@/utils';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'EditInfo',
  components: { Btns },
  data: () => ({
    operations: [
      {
        tag: '保存',
        type: 'success'
      },
      {
        tag: '取消',
        type: 'error'
      }
    ],
    params: {
      id: 0,
      oldAlbumId: '',
      oldIsCover: 0, // ? 0 / 1
      albumId: '',
      isCover: false,
      info: ''
    }
  }),
  props: {
    propItem: {
      type: Object,
      default: () => ({})
    },
    cover: {
      type: [String, Number],
      default: 0
    }
  },
  watch: {
    propItem(newVal) {
      Object.assign(this.$data, this.$options.data());
      Object.getOwnPropertyNames(newVal).length && this.initEdit(newVal);
    }
  },
  computed: {
    ...mapState(['platformUrl'])
  },
  methods: {
    initEdit(crtItem) {
      this.params = {
        id: crtItem.pId || 0,
        oldAlbumId: crtItem.albumId || 0,
        oldIsCover: crtItem.isChecked ? 0 : 1,
        albumId: crtItem.albumId || 0,
        src: crtItem.src || this.cover || '',
        isCover: this.cover ? true : false,
        info: crtItem.info || '',
        albumList: crtItem.albumList
      };
    },
    handleOps(btnTag) {
      switch (btnTag) {
        case '保存':
          this.handleSave();
          break;
        case '取消':
          this.handleClose();
          break;
        default:
          break;
      }
    },
    handleSave() {
      const params = {
        id: this.params.id,
        oldAlbumId: this.params.oldAlbumId,
        oldIsCover: this.cover && this.cover.length ? 1 : 0,
        albumId: this.params.albumId,
        isCover: this.params.isCover ? 1 : 0,
        info: this.params.info || ''
      };
      this.$Modal.confirm({
        title: '编辑相片',
        content: '确认编辑到当前相册中 ?',
        onOk: () => this.confirmSave(params)
      });
    },
    async confirmSave(params) {
      const result = await editPic(params);
      if (handleOpResult(result)) {
        this.$Message.success('编辑照片成功');
        this.$emit('closeAndRefreshContent');
      } else this.$Message.error(`编辑失败, 原因: ${result.msg}`);
      this.$emit('closeModals');
    },
    handleClose() {
      this.$Message.info('您关闭了本次回话');
      this.$emit('closeModals');
      Object.assign(this.$data, this.$options.data());
    }
  }
};
</script>

<style lang="less" scoped>
.full_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.edit-info {
  height: 25rem;
  .top {
    padding: 1.2rem 0;
    .full_flex();
    .img {
      flex: 1;
      text-align: center;
      img {
        width: 6rem;
        height: 6rem;
      }
    }
    .input {
      flex: 3;
    }
    .set-wrap {
      flex: 1;
      text-align: center;
    }
  }
  .select-album {
    padding: 1rem 0;
    .full_flex();
    .tag {
      flex: 2;
      text-align: right;
      margin-right: 3rem;
    }
    .content {
      flex: 3;
      margin-right: 5rem;
    }
  }
}
</style>
