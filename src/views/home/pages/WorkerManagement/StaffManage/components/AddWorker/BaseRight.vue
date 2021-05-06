<template>
  <div class="right-content">
    <Upload
      :multiple="false"
      :action="url"
      :disabled="readonly"
      :before-upload="getSingleFile"
      type="drag"
    >
      <div class="upload-content" style="padding: 25px 10px">
        <Avatar :src="img.src ? img.src : defaultAvatar" size="150" />
        <div class="notice">
          {{ readonly ? '' : '上传头像' }}
        </div>
      </div>
    </Upload>
  </div>
</template>

<script>
// ? request
import { getPicById } from '@/request/Common';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  // ? arr / obj
  deepCopyObj
} from '@/utils';

// ? import mixins
import imgMixin from '@/mixins/Common/imgMixin';
// ? bus
import eventBus from '../../eventBus';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'RightContent',
  mixins: [imgMixin],
  props: {
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(['platformUrl']),
    defaultAvatar() {
      return require('@/assets/images/garden/luoli.png');
    }
  },
  methods: {
    checkIcon(icon = '0') {
      if (parseInt(icon) > 0) {
        this.getInfos(icon);
      } else
        this.img = {
          pId: new Date().getTime(),
          src: this.platformUrl
        };
    },
    async getInfos(icon = 0) {
      this.$Spin.show();
      const result = await getPicById({ icon });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        this.img = {
          pId: icon,
          src: data
        };
      }
      this.$Spin.hide();
    }
  },
  mounted() {
    eventBus.$on('clearContent', () => {
      this.img = {
        src: '',
        pId: 0
      };
    });
    // this.$bus.$on('getStaffInfoDetail', ({ icon }) => this.checkIcon(icon))
    // this.$bus.$on('getStaffEditDetail', ({ icon }) => this.checkIcon(icon))
  },
  beforeDestroy() {
    eventBus.$off('clearContent');
  }
};
</script>

<style lang="less" scoped>
.right-content {
  .upload-content {
    width: 20rem;
    height: 20rem;
  }
  .notice {
    position: relative;
    top: 5rem;
    &:hover {
      color: #0094ff;
    }
  }
}
</style>
