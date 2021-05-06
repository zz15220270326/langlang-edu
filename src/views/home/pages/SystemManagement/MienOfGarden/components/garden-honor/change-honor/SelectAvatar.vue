<template>
  <div class="right">
    <div class="img">
      <img :src="img.src ? img.src : platformUrl" alt="" />
    </div>
    <div class="op">
      <Upload :action="url" :before-upload="getSingleFile">
        <Button type="info" size="large">
          <span>点击上传头像</span>
          <Icon type="ios-cloud-upload-outline" />
        </Button>
      </Upload>
    </div>
  </div>
</template>

<script>
import imgMixin from '@/mixins/Common/imgMixin';

import { mapState } from 'vuex';

import ghBus from '../ghBus';

export default {
  name: 'SelectAvatar',
  components: {},
  mixins: [imgMixin],
  data: () => ({}),
  props: {},
  computed: {
    ...mapState(['platformUrl'])
  },
  methods: {
    initEdit({ pic, src }) {
      this.img = {
        src,
        pId: pic.toString()
      };
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  mounted() {
    ghBus.$on('initEdit', (infos) => this.initEdit(infos));
  },
  beforeDestroy() {
    ghBus.$off('initEdit');
  }
};

(() => {})(document);
</script>

<style lang="less" scoped>
.full_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.right {
  flex: 3;
  .full_flex();
  flex-direction: column;
  .op {
    flex: 2;
    padding: 0.5rem 0;
  }
  .img {
    flex: 1;
    padding: 1rem 0;
    img {
      width: 7.2rem;
      height: 7.2rem;
    }
  }
}
</style>
