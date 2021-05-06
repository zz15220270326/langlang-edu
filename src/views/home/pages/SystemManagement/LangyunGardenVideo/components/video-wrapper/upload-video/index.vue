<template>
  <div class="upload-video-page">
    <Card>
      <Tabs value="local">
        <TabPane label="本地上传" name="local">
          <local-upload
            @handleAddToVideoList="handleAddToVideoList"
            @handleCancelOperation="closeModals"
          />
        </TabPane>
        <TabPane label="素材库上传" name="lib">
          <base-upload @closeModals="closeModals" />
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
// ? components
import LocalUpload from './local-upload';
import BaseUpload from './base-upload';

export default {
  name: 'UploadVideo',
  components: {
    LocalUpload,
    BaseUpload
  },
  data: () => ({
    selectTypes: [
      {
        tag: '本地上传',
        type: 'primary',
        icon: 'ios-images-outline'
      },
      {
        tag: '素材库',
        type: 'default',
        icon: 'ios-bookmarks-outline'
      }
    ],
    currentIndex: 0
  }),
  methods: {
    handleSelectType(currentIndex) {
      this.currentIndex = currentIndex;
      this.selectTypes.forEach((item, index) =>
        index === currentIndex
          ? (item.type = 'primary')
          : (item.type = 'default')
      );
    },
    handleAddToVideoList(videos) {
      this.$Message.info('上传视频中...');
      this.$emit('handleAddToVideoList', videos);
    },
    closeModals() {
      this.$emit('handleCancelOperation');
    }
  }
};
</script>
