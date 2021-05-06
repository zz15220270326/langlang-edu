<template>
  <div class="garden-honor-content">
    <Card class="content-item" v-for="(item, idx) in gardenHonors" :key="idx">
      <Checkbox
        class="box"
        v-model="item.isChecked"
        @on-change="handleBoxChange"
      >
        <img :src="item.src ? item.src : ''" alt="" />
        <div class="desc">
          <div class="tag">
            <Tag color="green" size="large">{{ item.title }}</Tag>
          </div>
          <div class="operations">
            <Button type="primary" @click.native="editItem(idx)">
              编辑
            </Button>
            <Button type="error" @click.native="deleteItem(idx)">
              删除
            </Button>
          </div>
        </div>
      </Checkbox>
    </Card>
    <div-page
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
    />
    <Modal
      title="编辑"
      v-model="isShowEditModal"
      width="920"
      :footer-hide="true"
    >
      <edit-honor
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
import EditHonor from '../change-honor';
// ? /request
import { getHonorList, deleteHonorInfo } from '@/request/system-management';
import { getPicById } from '@/request/Common';
// ? utils
import {
  // ? /request
  getDataSource,
  checkDataSource,
  handleOpResult,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
// ? vuex
import { mapState } from 'vuex';
// ? bus
import ghBus from '../ghBus';

export default {
  name: 'GHContent',
  components: { DivPage, EditHonor },
  data: () => ({
    gardenHonors: [],
    page: 0,
    pageSize: 8,
    total: 0,
    totalPage: 0,

    isShowEditModal: false,
    edits: {}
  }),
  computed: {
    ...mapState(['platformUrl'])
  },
  methods: {
    async getContentData(params = { pageSize: this.pageSize }) {
      this.$Spin.show();
      const result = await getHonorList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { data } = deepCopyObj(dataSource);
        this.page = data.page || 0;
        this.total = data.count || 0;
        this.totalPage = data.pageCount || 0;
        this.gardenHonors = [];
        data.list && this.setContentData(data.list);
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
      this.$Spin.hide();
    },
    setContentData(list = []) {
      list &&
        list.length &&
        list.map(async (item, index) => {
          this.gardenHonors.push({
            number: index + 1,
            id: item.id,
            pic: item.pic,
            relatedTime: item.relatedTime,
            src: await this.getSrcById(item.pic),
            title: item.title,
            remark: item.remark,
            isChecked: false
          });
        });
    },
    async getSrcById(icon) {
      const result = await getPicById({ icon });
      return result.data ? result.data : this.platformUrl;
    },
    // ? parrent
    handleBoxChange() {
      let notSelectAll = this.gardenHonors.some(item => !item.isChecked);
      if (notSelectAll) {
        this.$emit('itemSelectChange', false);
      } else {
        this.$emit('itemSelectChange', true);
      }
    },
    // ? menu
    deleteItems() {
      if (this.gardenHonors.some(item => item.isChecked)) {
        this.$Modal.confirm({
          title: '批量删除',
          content: '是否删除? 删除后数据无法恢复, 请谨慎操作!',
          onOk: () => {
            const ids = this.gardenHonors
              .filter(item => item.isChecked)
              .map(item => item.id)
              .toString();
            this.confirmDelete(ids);
          }
        });
      } else {
        this.$Message.warning('请选择要删除的内容');
      }
    },
    async confirmDelete(ids) {
      const result = await deleteHonorInfo({ ids });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getContentData();
      } else this.$Message.error(`删除失败, 原因: ${result.msg}`);
    },
    editItem(itemIdx) {
      this.$Message.info(`编辑第${itemIdx + 1}条数据`);
      const { id, title, relatedTime, remark, pic, src } = this.gardenHonors[
        itemIdx
      ];
      this.edits = {
        id,
        title,
        relatedTime,
        remark,
        pic,
        src
      };
      this.isShowEditModal = true;
    },
    deleteItem(itemIdx) {
      this.$Modal.confirm({
        title: `删除第${itemIdx + 1}条数据`,
        content: '是否删除? 删除后数据无法恢复',
        onOk: () => this.confirmDelete(this.gardenHonors[itemIdx].id)
      });
    },
    // ? modals
    closeModals() {
      this.isShowEditModal = false;
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  created() {
    this.getContentData();
  },
  mounted() {
    ghBus.$on('deleteItems', () => this.deleteItems());
    ghBus.$on('refreshPage', () => this.getContentData());
  },
  beforeDestroy() {
    ghBus.$off('deleteItems');
    ghBus.$off('refreshPage');
  }
};
</script>
