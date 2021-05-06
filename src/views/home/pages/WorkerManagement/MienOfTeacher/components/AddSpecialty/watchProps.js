// ? request
import {
  getPicById
} from '@/request/Common';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  // ? arr / obj
  deepCopyObj
} from '@/utils';

export default {
  props: {
    id: {
      type: Number,
      default: -1
    },
    name: {
      type: String,
      default: ''
    },
    identify: {
      type: String,
      default: ''
    },
    birthday: {
      type: String,
      default: ''
    },
    motto: {
      type: String || null,
      default: ''
    },
    honor: {
      type: String || null,
      default: ''
    },
    icon: {
      type: [String, Number],
      default: ''
    },
    album: {
      type: String,
      default: ''
    },
    album_url: {
      type: String,
      default: ''
    }
  },
  watch: {
    id(newId) {
      this.params.uid = newId;
      this.params.id = newId;
    },
    // ? watch-icon & imgs
    identify(newVal) {
      this.career = newVal;
    },
    // ? watch-props
    rolename(newVal) {
      this.career = newVal;
    },
    birthday(newVal) {
      this.iBirthday = newVal;
    },
    motto(newVal) {
      this.iMotto = newVal;
      this.params.motto = newVal;
    },
    honor(newVal) {
      this.iHonor = newVal;
      this.params.honor = newVal;
      if (newVal !== '') {
        this.getIcon(newVal);
      } else this.img = {};
    },
    album(newVal) {
      if (newVal.length) {
        const imgList = newVal.split(',');
        this.getImages(imgList);
      } else this.imgs = [];
    }
  },
  methods: {
    async getIcon(icon = '') {
      const result = await getPicById({ icon });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.img = {
          pId: Math.floor(Math.random() * 100),
          src: dataSource
        };
      } else this.img = {};
    },
    getImages(imgList = []) {
      this.imgs = [];
      imgList.forEach(async (icon) => {
        const result = await getPicById({ icon }),
          dataSource = getDataSource(result);
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
      });
    },
  },
  created() { }
};