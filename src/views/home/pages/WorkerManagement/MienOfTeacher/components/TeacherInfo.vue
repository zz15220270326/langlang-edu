<template>
  <div class="teacher-info" v-if="checkedTeacher !== {}">
    <div class="base-info">
      <div class="avatar">
        <img :src="icon" alt="" />
      </div>
      <div class="base">
        <div>姓名: {{ checkedTeacher.name }}</div>
        <div>职位: {{ checkedTeacher.identify }}</div>
        <div>年龄: {{ checkedTeacher.age }}</div>
        <div>教育格言: {{ checkedTeacher.motto }}</div>
      </div>
    </div>
    <div class="introduce">
      <div class="title">个人简介</div>
      <div class="content">{{ checkedTeacher.honor }}</div>
    </div>
    <div class="images">
      <div class="title">个人照片:</div>
      <div class="content" v-if="images.length > 0">
        <img v-for="item of images" :key="item.pId" :src="item.src" alt="" />
      </div>
      <div class="content" v-else>
        暂无照片
      </div>
    </div>
  </div>
</template>

<script>
import {
  // ? time
  getAgeByBirthday,
  // ? request
  getDataSource,
  checkDataSource,
  // ? obj
  deepCopyObj
} from '@/utils';
import { getPicById } from '@/request/Common';

import { mapState } from 'vuex';

export default {
  name: 'TeacherInfo',
  props: {
    checkedTeacher: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    icon: '',
    images: []
  }),
  watch: {
    checkedTeacher(newVal) {
      if (newVal.icon && newVal.icon.length) {
        this.getIcon();
      }
      if (newVal.images.split(',').filter(item => item.length).length > 0) {
        this.getImages();
      } else this.images = [];
    }
  },
  computed: {
    ...mapState(['platformUrl']),
    crtAge() {
      return getAgeByBirthday(this.checkedTeacher.birthday);
    }
  },
  methods: {
    async getIcon() {
      const { icon } = this.checkedTeacher,
        result = await getPicById({ icon }),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        this.icon = data || this.platformUrl;
      } else this.icon = null;
    },
    getImages() {
      this.images = [];
      const { images } = this.checkedTeacher;
      const imgList = images.split(',').filter(item => item.length);
      imgList.map(async (icon, index) => {
        const result = await getPicById({ icon });
        const dataSource = getDataSource(result);
        if (checkDataSource(dataSource)) {
          const data = deepCopyObj(dataSource);
          this.images.push({
            pId: index,
            src: data
          });
        } else {
          this.images.push({
            pId: index,
            src: this.platformUrl
          });
        }
      });
    }
  },

  created() {}
};
</script>

<style lang="less" scoped>
.flex() {
  display: flex;
  justify-content: center;
  align-items: center;
}
.teacher-info {
  height: 42rem;
  overflow-y: auto;
  width: 100%;
  color: #666;
  .base-info {
    width: 50%;
    height: 10rem;
    .flex();
    .avatar {
      flex: 1;
      .flex();
      img {
        height: 6rem;
        width: 6rem;
      }
    }
    .base {
      flex: 2;
      font-size: 1rem;
      padding-left: 1.2rem;
    }
  }
  .introduce {
    margin-top: 0.8rem;
    .title {
      font-size: 1.2rem;
    }
    .content {
      color: cyan;
    }
  }
  .images {
    margin-top: 0.8rem;
    .title {
      font-size: 1.2rem;
    }
    .content {
      color: gold;
      font-size: 1.2rem;
      padding: 1rem 0;
      img {
        width: 20%;
        margin: 1rem;
      }
    }
  }
}
</style>
