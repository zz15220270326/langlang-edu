// ? request
import { getQnToken } from '@/request/Common';
// ? utils
import {
  getDataSource,
  checkDataSource,
  handleErrorCode
} from '@/utils';
// ? vuex
import { mapState } from 'vuex';
// ? qiniu-js
import * as qiniu from 'qiniu-js';

export default {
  data() {
    return {
      file: [],
      img: {},
      token: '',
      key: '',
      // ? 新增, 显示上传进度条
      singleProgress: 0,
      singleStatus: undefined,
      // ? 上传到七牛云的文件夹 (默认为wrapper)
      action: 'wrapper'
    };
  },
  computed: {
    ...mapState({
      url: 'uploadUrl' // url: 'http://up-z2.qiniup.com',
    })
  },
  methods: {
    getSingleFile(file) {
      this.file.push(file);
      // ? 离线查看
      // this.handleSinglePreview()
      // ? 七牛云存储
      this.handleSingleProgress();
      return false;
    },
    async handleSingleProgress() {
      const number = 1,
        type = 'image',
        action = this.action;
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
        const { token, key } = this;
        if (this.file.length > 0) {
          this.file.map(file => this.handleSingleUpload(key, token, file));
          this.file = [];
        }
      } else {
        this.$Message.error(`请求失败, 原因: ${handleErrorCode(result.code)}`);
      }
    },
    async handleSingleUpload(key, token, file) {
      const self = this;
      const observable = qiniu.upload(file, key, token);
      observable.subscribe({
        next(res) {
          self.singleProgress = parseInt(res.total.percent.toFixed(2));
          this.singleStatus = 'active';
        },
        complete(res) {
          self.handleSingleSuccess(res);
          self.singleStatus = 'success';
          setTimeout(() => {
            self.singleProgress = undefined;
          }, 500);
        },
        error(err) {
          self.handleError(err);
        }
      })
    },
    handleSingleSuccess(res) {
      const dataSource = getDataSource(res);
      if (checkDataSource(dataSource)) {
        this.$Message.success('获取图片成功');
        this.img = {
          src: dataSource.url,
          pId: dataSource.id
        };
        this.$emit('getImg', this.img);
      }
    },
    handleError(err) {
      this.$Message.error(`上传失败, 详情: ${err}`);
    },
    handleSinglePreview() {
      const self = this;
      const reader = new FileReader();
      reader.readAsArrayBuffer(self.file[self.file.length - 1]);
      reader.onload = function () {
        const bf = this.result;
        const blob = new Blob([bf], {
          type: 'text/plain'
        });
        self.img = '';
        const str = URL.createObjectURL(blob);
        self.img = str;
      }
    }
  },
  created() {
  }
}