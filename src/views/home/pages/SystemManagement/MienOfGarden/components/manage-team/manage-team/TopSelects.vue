<template>
  <div slot="title" class="items-title">
    <div class="select">
      <Tag color="pink" size="large">选择教师</Tag>
      <select-menu
        :listTitle="roleTitle"
        :listItems="roleList"
        @handleSelect="selectRole"
      />
      <select-menu
        :listTitle="teacherTitle"
        :listItems="teacherList"
        @handleSelect="selectTeacher"
      />
    </div>
    <div class="import">
      <Button type="success" @click.native="getAllInfoByUid">
        从职工信息中导入
      </Button>
    </div>
  </div>
</template>

<script>
// ? import components
import { SelectMenu } from '@common/select-menu';
// ? request
import { getAddTeamInfo } from '@/request/system-management';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
// ? vuex
import { mapState } from 'vuex';
// ? bus
import mtBus from '../mtBus';

export default {
  name: 'Top',
  components: {
    SelectMenu
  },
  data: () => ({
    roleTitle: '',
    roleList: [],
    teacherTitle: '',
    teacherList: [],
    uid: 0
  }),
  watch: {
    uid(newId) {
      this.changeBaseData(newId);
    }
  },
  computed: {
    ...mapState(['platformUrl'])
  },
  methods: {
    async getContentData() {
      const result = await getAddTeamInfo({}),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        this.roleList = [];
        this.teacherList = [];
        Array.isArray(data.roleList) &&
          data.roleList &&
          this.setRoleList(data.roleList);
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
    },
    setRoleList(roleList = []) {
      roleList.forEach((item, index) => {
        this.roleList.push({
          key: index + 1,
          roleId: item.id,
          info: item.name,
          children: item.child
        });
      });
      this.roleTitle = this.roleList[0].info;
      this.setTeacherList();
    },
    setTeacherList() {
      const list = this.roleList.find(r => r.info === this.roleTitle).children;
      if (!list.length) {
        this.teacherTitle = '暂无内容';
        this.teacherList = list;
        this.uid = 0;
      } else {
        this.teacherList = [];
        list.map((item, index) => {
          this.teacherList.push({
            key: index + 1,
            uid: item.uid,
            info: item.realname,
            icon: item.icon,
            rolename: item.rolename,
            motto: item.motto,
            honor: item.honor,
            birthday: item.birthday,
            iconUrl: this.platformUrl + item.icon_url || this.platformUrl,
            albumId: item.album_id || ''
          });
        });
        this.teacherTitle = this.teacherList[0].info;
        this.uid = this.teacherList[0].uid;
      }
    },
    selectRole(item) {
      this.roleTitle = item.info;
      this.setTeacherList();
    },
    selectTeacher(item) {
      this.teacherTitle = item.info;
      this.uid = item.uid;
    },
    changeBaseData(uid) {
      if (uid > 0) {
        const crtItem = this.teacherList.find(item => item.uid === uid);
        mtBus.$emit('getBaseInfo', crtItem);
      }
      // else this.$Message.info('暂无教师信息');
    },
    getAllInfoByUid() {
      const crtItem = this.teacherList.find(item => item.uid === this.uid);
      // console.log(crtItem);
      mtBus.$emit('getAllInfo', crtItem);
    }
  },

  created() {
    this.getContentData();
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
.items-title {
  padding: 0.6rem 0;
  .full_flex();
  .select {
    flex: 3;
    text-align: center;
  }
  .import {
    flex: 2;
    text-align: left;
    margin-right: 3rem;
  }
}
</style>
