<template>
  <div class="left">
    <div class="career">
      <div class="tag">
        <Tag size="large" color="lime">当前职位</Tag>
      </div>
      <div class="content">
        <Input v-model="inputs.rolename" :readonly="true" />
      </div>
    </div>
    <div class="birth-day">
      <div class="tag">
        <Tag size="large" color="green">出生日期</Tag>
      </div>
      <div class="content">
        <Input :readonly="true" :value="inputs.birthday" />
      </div>
    </div>
    <div class="teach-moto">
      <div class="tag">
        <Tag size="large" color="gold">教育格言</Tag>
      </div>
      <div class="content">
        <Input v-model="inputs.motto" placeholder="请输入教育格言" />
      </div>
    </div>
    <div class="teacher-introduce">
      <div class="tag">
        <Tag size="large" color="blue">教师简介</Tag>
      </div>
      <div class="content">
        <Input
          v-model="inputs.honor"
          placeholder="请输入教师简介"
          type="textarea"
          :rows="3"
        />
      </div>
    </div>
    <div class="teacher-albums">
      <div class="tag">
        <Tag size="large" color="red">教师图片</Tag>
      </div>
      <div class="content">
        <div class="op">
          <Upload
            :action="url"
            :before-upload="getFile"
            :show-upload-list="false"
            :format="['jpg', 'jpeg', 'png']"
            :max-size="2048"
          >
            <Button type="info">
              <span>上传照片</span>
              <Icon type="md-add" />
            </Button>
          </Upload>
          <Button type="error" @click.native="initImgs">
            <span>取消选择</span>
            <Icon type="ios-trash-outline" />
          </Button>
        </div>
        <div class="imgs" v-show="imgs.length > 0" @click="removeImg">
          <img
            v-for="(item, idx) in imgs"
            :key="idx"
            :data-index="idx"
            :src="item.src"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// ? requst
import { getPicById } from '@/request/Common';
// ? mixins
import imgsMixins from '@/mixins/Common/imgsMixins';
// ? bus
import mtBus from '../mtBus';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'InputContent',
  components: {},
  mixins: [imgsMixins],
  data: () => ({
    inputs: {
      rolename: '',
      birthday: '未知',
      motto: '',
      honor: ''
    }
  }),
  props: {},
  computed: {
    ...mapState(['platformUrl'])
  },
  methods: {
    changeBaseParams({ rolename, birthday }) {
      this.inputs.rolename = rolename;
      this.inputs.birthday = birthday;
    },
    getAllParams({ rolename, birthday, motto, honor, albumId }) {
      this.inputs = {
        rolename,
        birthday,
        motto,
        honor
      };
      const idList = albumId.split(',') || [];
      this.setImgs(idList);
    },
    initEdits({ userRole, userBirthday, motto, honor, pictures }) {
      this.inputs = {
        rolename: userRole || '',
        birthday: userBirthday || '',
        motto,
        honor
      };
      const idList = Object.keys(pictures).map((pIdx) => pictures[pIdx]);
      this.setImgs(idList);
    },
    setImgs(idList) {
      this.imgs = [];
      if (Array.isArray(idList)) {
        idList.map(async (icon) => {
          this.imgs.push({
            pId: icon,
            src: (await getPicById({ icon }).data) || this.platformUrl
          });
        });
      }
    },
    removeImg(e) {
      const { dataset } = e.target,
        crtIdx = parseInt(dataset.index);
      this.imgs.splice(crtIdx, 1);
      this.$Message.success('删除成功');
    },
    initImgs() {
      this.imgs = [];
      this.$Message.info('清空照片');
    }
  },
  /**
   * * @Vue2.x 生命周期
   */
  mounted() {
    mtBus.$on('getBaseInfo', (infos) => this.changeBaseParams(infos));
    mtBus.$on('getAllInfo', (infos) => this.getAllParams(infos));
    mtBus.$on('dispatchEdits', (infos) => this.initEdits(infos));
  },
  beforeDestroy() {
    mtBus.$off('getBaseInfo');
    mtBus.$off('getAllInfo');
    mtBus.$off('dispatchEdits');
  }
};
</script>

<style lang="less" scoped></style>
