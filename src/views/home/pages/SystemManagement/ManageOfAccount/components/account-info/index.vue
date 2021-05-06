<template>
  <div class="account-info">
    <!-- <div class="account-info-menu">
      <Button
        v-for="(item, key) of switchTab"
        :key="key"
        :type="item.type"
        @click.native="selectTabs(key)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div class="account-info-content" v-show="crtIdx === 0">
      <base-info />
    </div>
    <div class="account-info-content" v-show="crtIdx === 1">
      <other-info />
    </div> -->
    <Tabs class="user-tabs" :value="switchTab[0].tag">
      <TabPane
        class="tab-item"
        v-for="(itm, idx) of switchTab"
        :key="idx + itm.tag"
        :label="itm.tag"
        :name="itm.tag"
      >
        <base-info
          v-if="idx === 0"
          :bases="bases"
          ref="baseInfo"
          @emitParams="getParams"
        />
        <other-info
          v-if="idx === 1"
          :others="others"
          ref="otherInfo"
          @emitParams="getParams"
        />
      </TabPane>
    </Tabs>
    <Divider />
    <btns
      :operations="operations"
      size="large"
      @handleBottomOperations="handleSave"
    />
  </div>
</template>

<script>
import './index.less';
// ? import components
import BaseInfo from './base-info';
import OtherInfo from './other-info';

import Btns from '@common/modal-bottom-btns';

// ? request
import { getList, editUser } from '@/request/system-management';
import { getPicById } from '@/request/Common';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleOpResult,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
// ? configs

import { mapState } from 'vuex';

export default {
  name: 'AccountInfo',
  components: {
    BaseInfo,
    OtherInfo,
    Btns
  },
  data: () => ({
    switchTab: [
      {
        tag: '基本信息',
        type: 'primary'
      },
      {
        tag: '其他信息',
        type: 'default'
      }
    ],
    bases: {},
    others: {},
    crtIdx: 0,
    operations: [
      {
        tag: '保存',
        type: 'success'
      }
      // ,{
      //   tag: '取消',
      //   type: 'error'
      // }
    ],
    params: {}
  }),
  computed: {
    ...mapState(['platformUrl'])
  },
  methods: {
    selectTabs(crtIdx) {
      this.crtIdx = crtIdx;
      this.switchTab.forEach((item, index) => {
        index === crtIdx ? (item.type = 'primary') : (item.type = 'default');
      });
    },
    // ? user-info
    async getUserInfo(params = {}) {
      const result = await getList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        // console.log(data);
        this.setBase(data);
        this.setOther(data);
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
    },
    async setBase(data = {}) {
      const { getClass, roleName } = data;
      const {
        realname,
        pic_url,
        mobile,
        sex,
        face,
        icon
        // ? 暂无考勤卡号
      } = data.data;
      this.bases = {
        username: realname,
        mobile,
        sex,
        classes: getClass,
        roleName,
        card: new Date().getTime().toString(),
        avatar: pic_url || this.platformUrl,
        face: face || '',
        img: {
          src: await this.getSrcByIcon(icon),
          pId: icon
        }
      };
    },
    setOther(data = {}) {
      const {
        birthday,
        hiredate,
        motto,
        honor,
        album_id,
        album_url
      } = data.data;
      this.others = {
        birthday,
        hiredate,
        motto,
        honor,
        albumId: album_id && album_id.split(','),
        albumUrl: album_url && album_url.split(',')
      };
    },
    async getSrcByIcon(icon) {
      const result = await getPicById({ icon });
      if (result.data) {
        return result.data;
      } else return this.platformUrl;
    },
    getParams(childParams) {
      const _params = deepCopyObj(this.params);
      this.params = Object.assign(_params, childParams);
    },
    handleSave() {
      this.$Message.info({
        content: '保存个人信息...',
        background: true,
        duration: 2
      });
      const uploadBody = deepCopyObj(this.params);
      console.log(uploadBody);
      this.$Modal.confirm({
        title: '保存用户信息',
        content: '确认操作?',
        onOk: async () => {
          const result = await editUser(uploadBody);
          if (handleOpResult(result)) {
            this.$Message.success({
              content: '保存成功!',
              background: true,
              duration: 2
            });
          } else this.$Message.error(`保存失败, 原因: ${result.msg}`);
          this.getUserInfo();
        }
      });
    }
  },
  /**
   * @description
   * * Vue2.x life-hooks
   */
  created() {
    this.getUserInfo();
  },
  activated() {
    this.crtIdx = 0;
    this.getUserInfo();
  }
};
</script>
