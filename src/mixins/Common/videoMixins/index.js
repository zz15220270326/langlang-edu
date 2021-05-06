// ? request
import { getQnToken, getPicById } from '@/request/Common';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleErrorCode,
  // ? times
  transformTimeStamp
} from '@/utils';
// ? qiniu-js
import * as qiniu from 'qiniu-js';
// ? vuex
import { mapState } from 'vuex';

export default {
  data() {
    return {
      // ? 临时文件
      file: [],
      // ? 视频内容
      videos: [],
      // ? 临时的token和和key
      token: '',
      key: '',
      // ? 上传时的显示
      ableUpload: true,
      percent: 0,
      status: undefined  //undefined 'active'
    }
  },
  computed: {
    ...mapState({
      url: 'uploadUrl',
      platformUrl: 'platformUrl'
    })
  },
  methods: {
    getFile(file) {
      this.ableUpload = false;
      this.file.push(file);
      // this.handlePreview()
      this.handleProgress();
      return false;
    },
    async handleProgress() {
      const number = this.file.length,
        type = 'video',
        action = 'videos';
      const params = {
        number,
        type,
        action
      };
      const result = await getQnToken(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const info = JSON.parse(JSON.stringify(dataSource));
        this.token = info[0].token || '';
        this.key = info[0].key || '';
        const {
          token,
          key
        } = this;
        const config = {
          region: qiniu.region.z2,
          uptoken: token,
          domain: this.uploadUrl,
          unique_names: true
        }
        if (this.file.length > 0) {
          this.file.map(file => this.handleUpload(key, token, file, config));
          this.file = [];
        }
      } else {
        this.$Message.error(`请求失败, 原因: ${handleErrorCode(result.code)}`);
      }
    },
    async handleUpload(key, token, file, config) {
      const self = this;
      const observable = qiniu.upload(file, key, token, config);
      observable.subscribe({
        next(res) {
          self.percent = parseInt(res.total.percent.toFixed(2));
          self.status = 'active';
        },
        complete(res) {
          self.handleSuccess(res, file);
        },
        error(err) {
          self.handleError(err);
        }
      });
    },
    async handleSuccess(res, file) {
      const dataSource = getDataSource(res);
      // console.log(dataSource);
      if (checkDataSource(dataSource)) {
        this.$Message.success('获取视频成功');
        this.videos.push({
          name: file.name,
          time: transformTimeStamp(new Date(file.lastModifiedDate).getTime()),
          size: `${(file.size / 1024 / 1024).toFixed(2)}M`,
          src: await this.getImgByIcon(dataSource.url),
          url: dataSource.url,
          vId: dataSource.id
        });
        this.ableUpload = true;
        this.$emit('getVideo', this.videos);
        setTimeout(() => {
          this.percent = 0;
          this.status = undefined;
        }, 600);
      }
    },
    async getImgByIcon(icon) {
      const result = await getPicById({ icon });
      if (result.data) {
        return result.data;
      } else return this.platformUrl;
    },
    handleError(err) {
      this.$Message.error(`上传失败, 原因: 您的访问被拒绝了!`);
      console.error(err);
      this.ableUpload = true;
      this.percent = 0;
      this.status = undefined;
    },
    handlePreview() {
      const self = this;
      const reader = new FileReader;
      reader.readAsArrayBuffer(self.file[self.file.length - 1]);
      reader.onload = function () {
        const bf = this.result;
        const blob = new Blob([bf], {
          type: 'text/xml'
        });
        const url = URL.createObjectURL[blob];
        self.videos.push({
          url,
          isChecked: false
        });
      }
    }
  }
}