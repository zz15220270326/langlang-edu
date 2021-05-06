// ? request
import {
  getQnToken,
} from '@/request/Common';
// ? utils
import {
  getDataSource,
  checkDataSource,
  handleErrorCode
} from '@/utils';
// ? qiniu-js
import * as qiniu from 'qiniu-js';
// ? vuex
import { mapState } from 'vuex';

export default {
  data() {
    return {
      file: [],
      imgs: [],
      token: '',
      key: '',
      // ? 新增, 显示上传的进度条
      totalProgress: 0,
      totalStatus: undefined
    };
  },
  computed: {
    ...mapState({
      url: 'uploadUrl' // url: 'http://up-z2.qiniup.com',
    })
  },
  methods: {
    getFile(file) {
      this.file.push(file);
      // ? 离线查看
      // this.handlePreview()
      // return false
      // ? 上传文件
      this.handleProgress();
      return false;
    },
    async handleProgress() {
      const number = this.file.length,
        type = 'image',
        action = 'album';
      const params = {
        number,
        type,
        action
      };
      const result = await getQnToken(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const info = JSON.parse(JSON.stringify(dataSource));
        this.token = info[0].token || '';
        this.key = info[0].key || '';
        const {
          token,
          key
        } = this;
        if (this.file.length > 0) {
          this.file.map(file => this.handleUpload(key, token, file));
          this.file = [];
        }
      } else {
        this.$Message.error(`请求失败, 原因: ${result.msg || handleErrorCode(result.code)}`);
      }
    },
    async handleUpload(key, token, file) {
      const self = this;
      const observable = qiniu.upload(file, key, token);
      observable.subscribe({
        next(res) {
          this.totalProgress = parseInt(res.total.percent.toFixed(2));
          this.totalStatus = 'active';
        },
        complete(res) {
          self.handleSuccess(res);
        },
        error(err) {
          self.handleError(err);
        }
      });
    },
    handleSuccess(res) {
      const dataSource = getDataSource(res);
      if (checkDataSource(dataSource)) {
        this.$Message.success('获取图片成功');
        this.imgs.push({
          src: dataSource.url,
          pId: dataSource.id
        });
        this.$emit('getImgs', this.imgs);
      }
    },
    handleError(err) {
      this.$Message.error(`上传失败, 详情: ${err}`);
    },
    // ? 离线查看
    handlePreview() {
      const self = this;
      const reader = new FileReader();
      reader.readAsArrayBuffer(self.file[self.file.length - 1]);
      reader.onload = function () {
        const bf = this.result;
        const blob = new Blob([bf], {
          type: 'text/plain'
        });
        const str = URL.createObjectURL(blob);
        self.imgs.push({
          src: str,
          // key: self.imgs.length
          isChecked: false
        });
        if (self.pictures) {
          self.pictures.push(parseInt(Math.random() * 1000));
        }
      };
    },

    // ? 删除指定照片
    cancelSelectImg(crtIdx) {
      this.imgs.splice(crtIdx, 1);
      this.$Message.success('删除成功');
    }
  },
  created() {}
};