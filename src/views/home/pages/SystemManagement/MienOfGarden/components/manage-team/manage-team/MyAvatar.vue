<template>
  <div class="right">
    <div class="upload">
      <div class="img">
        <Avatar
          :src="img.src && img.src.length ? img.src : platformUrl"
          style="height: 7rem; width: 7rem"
        />
      </div>
      <div class="op">
        <Upload
          :action="url"
          :before-upload="getSingleFile"
          :show-upload-list="false"
          :format="['jpg', 'jpeg', 'png']"
          :max-size="2048"
        >
          <Button size="large" type="info">
            <Icon type="md-add" />
          </Button>
        </Upload>
        <Button size="large" type="error" @click.native="cancelImg">
          <Icon type="ios-trash-outline" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
// ? request
import { getPicById } from '@/request/Common';
// ? import mixins
import imgMixin from '@/mixins/Common/imgMixin';
// ? vuex
import { mapState } from 'vuex';
// ? bus
import mtBus from '../mtBus';

export default {
  name: 'MiddleRight',

  components: {},

  mixins: [imgMixin],

  data: () => ({}),

  props: {},

  watch: {},

  computed: {
    ...mapState(['platformUrl'])
  },

  methods: {
    cancelImg() {
      if (this.img === '') {
        this.$Message.warning('还没有选择图片哦');
        return;
      }
      this.$Modal.confirm({
        title: '删除头像',
        content: '是否删除? 删除后需要重新选择',
        onOk: () => {
          this.img = {};
          this.$Message.error('删除头像成功');
        },
        onCancel: () => {
          this.$Message.success('您取消了本次删除操作');
        }
      });
    },
    async setAvatar({ icon }) {
      const result = await getPicById({ icon });
      if (result.data) {
        this.img = {
          src: result.data,
          pId: icon
        };
      } else {
        this.$nextTick(() => {
          this.$Message.error('查找头像失败');
          this.img = {
            src: '',
            pId: icon
          };
        });
      }
    }
  },
  /**
   * * Vue2.x 生命周期
   */
  mounted() {
    mtBus.$on('getAllInfo', (infos) => this.setAvatar(infos));
    mtBus.$on('dispatchEdits', (infos) => this.setAvatar(infos));
  },
  beforeDestroy() {
    mtBus.$off('getAllInfo');
    mtBus.$off('dispatchEdits');
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
.right {
  flex: 2;
  height: 100%;
  position: relative;
  bottom: 9.2rem;
  .full_flex();
  flex-direction: column;
  .img {
    flex: 2;
    .full_flex();
  }
  .op {
    flex: 3;
    margin-top: 2rem;
    .full_flex();
    .ivu-btn {
      margin: 0 0.6rem;
    }
  }
}
</style>
