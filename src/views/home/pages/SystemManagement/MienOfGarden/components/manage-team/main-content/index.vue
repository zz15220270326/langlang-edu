<template>
  <div class="m-t-content">
    <Card class="content-item" v-for="(item, idx) in manageTeamInfo" :key="idx">
      <Checkbox
        class="box"
        v-model="item.isChecked"
        @on-change="handleBoxChange"
      >
        <div class="top">
          <img :src="item.avatar ? item.avatar : ''" alt="" />
        </div>
        <div class="bottom">
          <div class="left">
            <Tag color="blue" size="large">{{ item.name }}</Tag>
            <Tag color="gold" size="large">{{ item.age }}</Tag>
          </div>
          <div class="middle">
            <Button type="primary" @click.native="editItem(idx)">
              编辑
            </Button>
            <Button type="error" @click.native="deleteItem(idx)">
              删除
            </Button>
          </div>
          <div class="right">
            <Tag color="pink" size="large">
              教师
            </Tag>
          </div>
        </div>
      </Checkbox>
    </Card>
    <div-page
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getContentByPage"
    />
    <!-- modal -->
    <Modal
      title="编辑"
      v-model="isShowEditModal"
      width="920"
      :footer-hide="true"
    >
      <edit-content
        :id="edits.id"
        :propInfos="edits"
        @closeModals="closeModals"
      />
    </Modal>
  </div>
</template>

<script>
import './index.less';
// ? components
import DivPage from '@common/bottom-account';
import EditContent from '../manage-team';
// ? request
import {
  getTeamList,
  getEditTeamInfo,
  deleteTeamInfo
} from '@/request/system-management';
import { getPicById } from '@/request/Common';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleOpResult,
  // ? arr / obj
  deepCopyObj,
  // ? time
  getAgeByBirthday
} from '@/utils';
// ? vuex
import { mapState } from 'vuex';
// ? bus
import mtBus from '../mtBus';

export default {
  name: 'MTContent',

  components: { DivPage, EditContent },

  data: () => ({
    manageTeamInfo: [],
    page: 0,
    pageSize: 8,
    total: 0,
    totalPage: 0,
    // ? modal
    isShowEditModal: false,
    edits: {}
  }),

  props: {},

  computed: {
    ...mapState(['platformUrl'])
  },

  methods: {
    async getContentData(params = { pageSize: this.pageSize }) {
      const result = await getTeamList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { data } = deepCopyObj(dataSource);
        this.page = data.page || 0;
        this.total = data.count || 0;
        this.totalPage = data.pageCount || 0;
        data.list && this.setContentData(data.list);
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
    },
    setContentData(listInfo = []) {
      this.manageTeamInfo = [];
      listInfo.map((item, index) => {
        this.manageTeamInfo.push({
          number: index + 1,
          id: item.id,
          uid: item.uid,
          icon: item.icon,
          avatar: this.getImgById(item.icon),
          name: item.user_info.realname || '暂无姓名',
          birthday: item.user_info.birthday || '',
          age: item.user_info.birthday
            ? getAgeByBirthday(item.user_info.birthday)
            : '暂无年龄信息',
          isChecked: false
        });
      });
    },
    getImgById(icon) {
      const result = getPicById({ icon });
      if (result.data) {
        return result.data;
      } else return this.platformUrl;
    },
    handleBoxChange() {
      let notSelectAll = this.manageTeamInfo.some(item => !item.isChecked);
      if (notSelectAll) {
        this.$emit('itemSelectChange', false);
      } else {
        this.$emit('itemSelectChange', true);
      }
    },
    handleDeleteItems() {
      if (this.manageTeamInfo.every(item => !item.isChecked)) {
        this.$Message.warning('请选择要删除的内容');
        return;
      } else {
        this.$Modal.confirm({
          title: '批量删除',
          content: '确认操作? 删除后数据无法恢复, 请谨慎操作!',
          onOk: () => {
            const ids = this.manageTeamInfo
              .filter(item => item.isChecked)
              .map(item => item.id)
              .toString();
            this.confirmDelete(ids);
          }
        });
      }
    },
    async confirmDelete(ids) {
      const result = await deleteTeamInfo({ ids });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getContentData();
      } else this.$Message.error(`删除失败, 原因: ${result.msg}`);
    },
    async editItem(itemIdx) {
      const { id, name } = this.manageTeamInfo[itemIdx],
        result = await getEditTeamInfo({ id }),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource),
          { hasMienOfTeacher, pictures, userBirthday, userRole } = data;
        // console.log(data);
        const param1 = {
            id,
            hasMienOfTeacher,
            pictures,
            userBirthday,
            userRole,
            username: name
          },
          param2 = data.data || {};
        this.edits = Object.assign({}, param2, param1);
        console.log(this.edits);
        this.isShowEditModal = true;
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
    },
    deleteItem(itemIdx) {
      this.$Modal.confirm({
        title: '删除当前内容',
        content: '确认删除?删除后数据无法恢复,请谨慎操作! ',
        onOk: () => {
          const { id } = this.manageTeamInfo[itemIdx];
          this.confirmDelete(id);
        }
      });
    },
    getContentByPage(params) {
      this.getContentData(params);
    },
    // ? modals
    closeModals() {
      this.isShowEditModal = false;
    }
  },
  created() {
    this.getContentData();
  },
  mounted() {
    mtBus.$on('handleDeleteItems', () => this.handleDeleteItems());
    mtBus.$on('refreshPage', () => this.getContentData());
  },
  beforeDestroy() {
    mtBus.$off('handleDeleteItems');
    mtBus.$off('refreshPage');
  }
};
</script>
