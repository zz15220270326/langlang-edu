<template>
  <div class="other-info">
    <div class="birth-date">
      <div class="tag">
        <Tag color="green" size="large">出生日期</Tag>
      </div>
      <div class="content">
        <DatePicker
          v-model="otherParams.birthday"
          class="date-picker"
          type="date"
          placeholder="请选择出生日期"
          @on-change="changeBirthday"
        ></DatePicker>
      </div>
    </div>
    <div class="entry-date">
      <div class="tag">
        <Tag color="gold" size="large">入职日期</Tag>
      </div>
      <div class="content">
        <DatePicker
          v-model="otherParams.hiredate"
          class="date-picker"
          type="date"
          placeholder="请选择入职日期"
          @on-change="changeHiredate"
        ></DatePicker>
      </div>
    </div>
    <div class="teach-moto">
      <div class="tag">
        <Tag color="cyan" size="large"> 教育格言 </Tag>
      </div>
      <div class="content">
        <Input v-model="otherParams.motto" placeholder="请输入教育格言" />
      </div>
    </div>
    <div class="teacher-introduce">
      <div class="tag">
        <Tag color="blue" size="large"> 教师简介 </Tag>
      </div>
      <div class="content">
        <Input
          v-model="otherParams.honor"
          type="textarea"
          :rows="5"
          placeholder="请输入教师简介"
        />
      </div>
    </div>
    <div class="self-imgs">
      <div class="tag">
        <Tag color="red" size="large">个人照片</Tag>
      </div>
      <div class="content">
        <div class="imgs" v-if="imgs.length > 0">
          <Tooltip
            v-for="(item, idx) in imgs"
            :key="idx"
            content="点击删除图片"
            @click.native="removeImg(idx)"
          >
            <img :src="item.src" alt="" />
          </Tooltip>
        </div>
        <div class="upload-img">
          <Upload :action="url" :before-upload="getFile">
            <Button type="info" icon="ios-cloud-upload-outline">
              点击上传图片
            </Button>
          </Upload>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './index.less';

// ? utils
import {
  // ? arr / obj
  deepCopyObj,
  // ? time
  dateToMs,
  transformToYMD
} from '@/utils';

// ? import vuex
import { mapState } from 'vuex';

// ? import mixins
import imgsMixins from '@/mixins/Common/imgsMixins';

export default {
  name: 'OtherInfo',

  components: {},

  mixins: [imgsMixins],

  data: () => ({
    otherParams: {
      birthday: '',
      hiredate: '',
      motto: '',
      honor: '',
      albumIds: [],
      albumUrls: []
    }
  }),

  props: {
    others: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    ...mapState(['platformUrl'])
  },

  watch: {
    others(infos) {
      if (Object.keys(infos).length > 0) {
        this.setOtherInfos(infos);
      }
    },
    // otherParams() {
    //   this.emitParams();
    // },
    imgs(newVal) {
      this.otherParams.albumIds = newVal.map((img) => img.pId) || [];
      this.otherParams.albumUrls = newVal.map((img) => img.src) || [];
      this.emitParams();
    }
  },

  methods: {
    setOtherInfos(infos = {}) {
      this.clearOtherParams();
      this.otherParams = {
        birthday: infos.birthday || '',
        hiredate: infos.hiredate || '',
        motto: infos.motto || '',
        honor: infos.honor || '',
        albumIds: infos.albumId || [],
        albumUrls: infos.albumUrl || []
      };
      this.setImgs(infos.albumId, infos.albumUrl);
      this.emitParams();
    },
    setImgs(idList = [], urlList = []) {
      if (!idList.length || !urlList.length) {
        return;
      } // else set imgs
      idList.forEach((id, index) => {
        this.imgs.push({
          src: urlList[index],
          pId: id
        });
      });
    },
    removeImg(idx) {
      this.imgs.splice(idx, 1);
      this.$Message.info(`您删除了第${idx + 1}张图片`);
    },
    changeBirthday() {
      // this.otherParams.birthday = date.toString();
      // this.otherParams.birthday.length && this.emitParams();
      this.emitParams();
    },
    changeHiredate() {
      // date
      // this.otherParams.hiredate = date.toString();
      this.emitParams();
    },
    getBirthday() {
      if (this.otherParams.birthday.length === 10) {
        return this.otherParams.birthday || '';
      }
      if (this.otherParams.birthday.toString().length > 10) {
        return transformToYMD(dateToMs(this.otherParams.birthday)) || '';
      }
      return '';
    },
    getHiredate() {
      if (this.otherParams.hiredate.length === 10) {
        return this.otherParams.hiredate || '';
      }
      if (this.otherParams.hiredate.toString().length > 10) {
        return transformToYMD(dateToMs(this.otherParams.hiredate)) || '';
      }
      return '';
    },
    emitParams() {
      if (Object.keys(this.otherParams).length) {
        const params = deepCopyObj(this.otherParams);
        params.birthday = this.getBirthday();
        params.hiredate = this.getHiredate();
        params.albumIds = this.otherParams.albumIds
          ? this.otherParams.albumIds.toString()
          : '';
        params.albumIdsUrl = this.otherParams.albumUrls
          ? this.otherParams.albumUrls.toString()
          : '';
        delete params.albumUrls;
        this.$emit('emitParams', params);
      }
    },
    clearOtherParams() {
      this.otherParams = {
        birthday: '',
        hiredate: '',
        motto: '',
        honor: '',
        albumIds: [],
        albumUrls: []
      };
    }
  },
  created() {}
};
</script>
