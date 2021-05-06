<template>
  <div class="detail-info">
    <row-item>
      <div slot="tag">出生日期</div>
      <div slot="content">
        <DatePicker
          size="large"
          :placeholder="showBirthday"
          :readonly="readonly"
          @on-change="getBirthday"
        />
        <!-- propItems.birthday ? propItems.birthday : '请选择出生日期' -->
      </div>
    </row-item>
    <row-item>
      <div slot="tag">入职日期</div>
      <div slot="content">
        <DatePicker
          size="large"
          :placeholder="showHiredate"
          :readonly="readonly"
          @on-change="getHiredate"
        />
        <!-- propItems.hiredate ? propItems.hiredate : '请选择出生日期' -->
      </div>
    </row-item>
    <row-item>
      <div slot="tag">教育格言</div>
      <div slot="content">
        <Input
          placeholder="请输入教育格言"
          v-model="infos.motto"
          size="large"
          :readonly="readonly"
        />
      </div>
    </row-item>
    <row-item>
      <div slot="tag">教师简介</div>
      <div slot="content">
        <Input
          v-model="infos.honor"
          size="large"
          class="intro"
          type="textarea"
          :rows="8"
          :readonly="readonly"
        />
      </div>
    </row-item>
    <row-item>
      <div slot="tag">个人照片</div>
      <div slot="content">
        <Upload
          v-show="!readonly"
          :before-upload="getFile"
          action="http://localhost:80"
        >
          <Button type="primary" icon="ios-cloud-upload-outline" size="large">
            上传个人照片
          </Button>
        </Upload>
        <div class="imgs-wrapper" v-show="imgs.length > 0">
          <div
            class="img"
            v-for="(itm, idx) of imgs"
            :key="idx + itm"
            :src="itm.src"
          >
            <Poptip
              confirm
              title="您确认要删除这张照片吗?"
              @on-ok="cancelImg(idx)"
            >
              <img :src="itm.src" alt="" />
            </Poptip>
          </div>
        </div>
      </div>
    </row-item>
  </div>
</template>

<script>
// ? components
import RowItem from '@common/modal-row-item';

// ? request
import { getPicById } from '@/request/Common';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  // handleErrorCode,
  // ? changeTime
  dateToMs,
  transformToYMD,
  // ? arr / obj
  deepCopyObj
} from '@/utils';

// ? mixins
import imgsMixins from '@/mixins/Common/imgsMixins';

// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'InfoContent',
  components: {
    RowItem
  },
  mixins: [imgsMixins],
  data: () => ({
    infos: {
      birthday: '',
      hiredate: '',
      motto: '',
      honor: '',
      album: '',
      albumUrl: ''
    },
    showBirthday: '请选择出生日期',
    showHiredate: '请选择入职日期'
  }),
  props: {
    propItems: {
      type: Object,
      default: () => ({})
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    propItems(items) {
      this.getDetailItems(items);
    },
    imgs(newVal) {
      newVal.length && this.setInfosAlbum(newVal);
    }
  },
  computed: {
    ...mapState(['platformUrl'])
  },
  methods: {
    getBirthday(date) {
      this.infos.birthday = date;
      this.formatInfos();
    },
    getHiredate(date) {
      this.infos.hiredate = date;
      this.formatInfos();
    },
    cancelImg(sltIdx) {
      this.imgs.splice(sltIdx, 1);
      this.$Message.success('删除成功');
      this.$emit('getImgs', this.imgs);
    },
    forMateChineseDate(cDate) {
      return transformToYMD(dateToMs(cDate));
    },
    formatInfos() {
      const params = deepCopyObj(this.infos);
      // const { birthday, hiredate } = params;
      // birthday.length > 0
      //   ? (params.birthday = this.forMateChineseDate(birthday))
      //   : delete params.birthday;
      // hiredate.length > 0
      //   ? (params.hiredate = this.forMateChineseDate(hiredate))
      //   : delete params.hiredate;
      this.emitInfos(params);
    },
    emitInfos(params) {
      this.$emit('getInfos', params);
    },
    setInfosAlbum(imgs) {
      this.infos.album = imgs.map(img => img.pId).toString();
      this.infos.albumUrl = imgs.map(img => img.src).toString();
    },
    async getImage(icon) {
      if (icon > 0) {
        const result = await getPicById({ icon });
        const dataSource = getDataSource(result);
        if (checkDataSource(dataSource)) {
          const data = deepCopyObj(dataSource);
          this.imgs.push({
            pId: icon,
            src: data
          });
        } else
          this.imgs.push({
            pId: icon,
            src: this.platformUrl
          });
      }
      // else {
      //   console.log('暂未设置相册')
      //   this.imgs.push({
      //     pId: icon,
      //     src: this.platformUrl
      //   })
      // }
    },
    getDetailItems({ birthday, hiredate, motto, honor }) {
      if (birthday && hiredate) {
        this.infos = {
          birthday,
          hiredate,
          motto,
          honor
        };
        this.showBirthday = birthday;
        this.showHiredate = hiredate;
        this.emitInfos('getInfos', { birthday, hiredate, motto, honor });
      }
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  created() {
    this.formatInfos();
  },
  updated() {
    this.formatInfos();
  }
};
</script>

<style lang="less" scoped>
.detail-info {
  .ivu-date-picker {
    width: 16rem;
  }
  .ivu-input-wrapper {
    width: 25rem;
  }
  .ivu-btn {
    position: relative;
    top: 0.6rem;
  }
  .imgs-wrapper {
    margin: 1rem 0;
    width: 100%;
    height: 7.5rem;
    overflow-y: auto;
    .img {
      width: 20%;
      float: left;
      margin: 0 0.8rem;
      img {
        width: 3.2rem;
        height: 3.2rem;
        border: 0.03rem solid #dedede;
        &:hover {
          opacity: 0.8;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
