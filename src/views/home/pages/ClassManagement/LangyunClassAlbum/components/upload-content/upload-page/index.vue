<template>
  <!-- v-show="propList.length > 0 -->
  <div class="upload-page">
    <div class="list-item" v-for="(item, key) in propList" :key="key">
      <div class="img">
        <img :src="item.src" alt="" />
      </div>
      <div class="input">
        <Input
          :value="item.content"
          type="textarea"
          placeholder="请输入编辑的内容"
          :rows="5"
          @on-blur="inputChange($event, key)"
        />
      </div>
      <!-- title="提示"
      trigger="hover"
          :content="
            btnIndex === 0
              ? `删除第${key + 1}条内容`
              : `将第${key + 1}张照片设置为封面`
          " -->
      <div class="operations">
        <Poptip
          v-for="(btn, btnIndex) in item.operations"
          :key="btnIndex"
          title="提示"
          trigger="hover"
          :content="
            btnIndex === 0
              ? `删除第${key + 1}条内容`
              : `将第${key + 1}张照片设置为封面`
          "
        >
          <Button
            shape="circle"
            :type="btn.type"
            @click.native="handleItemOperations(key, btnIndex)"
          >
            <Icon :type="btn.icon" />
          </Button>
        </Poptip>
      </div>
    </div>
    <div class="to-content" v-if="albumList.length">
      <Select class="select-menu" v-model="albumId" transfer>
        <Option v-for="itm of albumList" :key="itm.id" :value="itm.id">
          {{ itm.title }}
        </Option>
      </Select>
      <Button type="info" @click.native="handleAddAlbums">
        新建相册
      </Button>
      <Modal
        title="新建相册"
        v-model="isShowAddModal"
        width="850"
        :footer-hide="true"
      >
        <add-albums @closeModals="closeModals" />
      </Modal>
    </div>
  </div>
</template>

<script>
import './index.less';
// ? componenets
import AddAlbums from '../../add-content';
// ? eventBus
import caBus from '../../../caBus';

export default {
  name: 'UploadPage',
  components: { AddAlbums },
  data: () => ({
    ablumTypesTitle: '',
    albumList: [],
    albumId: 0,
    // ? modals
    isShowAddModal: false
  }),
  props: {
    propList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    albumId(newVal) {
      this.$emit('getAlbumId', newVal);
    }
  },
  computed: {},
  methods: {
    inputChange(event, itemIndex) {
      const { value } = event.target;
      this.$emit('inputChange', value, itemIndex);
    },
    handleItemOperations(itemIdx, btnIndex) {
      this.$emit('handleItemOperations', itemIdx, btnIndex);
    },
    handleAddAlbums() {
      this.isShowAddModal = true;
    },
    closeModals() {
      this.isShowAddModal = false;
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  mounted() {
    caBus.$on('getAlbumListInfo', list => (this.albumList = list));
    caBus.$on('getUploadItemInfo', albumId => {
      // console.log(albumId);
      this.albumId = albumId || 0;
    });
  },
  beforeDestroy() {
    caBus.$off('getAlbumListInfo');
    caBus.$off('getUploadItemInfo');
  }
};
</script>
