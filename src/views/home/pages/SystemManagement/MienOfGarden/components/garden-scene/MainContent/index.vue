<template>
  <div class="g-s-content" v-show="gsImgList.length > 0">
    <Card class="content-item" v-for="(item, key) in gsImgList" :key="key">
      <Checkbox
        class="box"
        v-model="item.isChecked"
        @on-change="handleBoxChange"
      >
        <img :src="item.src && item.src !== '' ? item.src : ''" alt="" />
        <Button type="primary" @click.native="editItem(key)">
          编辑
        </Button>
        <Button type="error" @click.native="deleteItem(key)">
          删除
        </Button>
        <Tag color="cyan" size="large">{{ item.name }}</Tag>
      </Checkbox>
    </Card>
    <div-page
      class="div-page"
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getContentByPage"
    />
  </div>
</template>

<script>
// ? components
import DivPage from '@common/bottom-account';

// ? request
import {
  getAppearanceList,
  editAppearance,
  deleteAppearance
} from '@/request/system-management';
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
// ? bus
import menuBus from '../menuBus';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'GSContent',
  components: {
    DivPage
  },
  data: () => ({
    // ? contents
    gsImgList: [],
    page: 0,
    pageSize: 8,
    total: 0,
    totalPage: 0,
    // ? modals
    editModalTitle: '',
    isShowEditModal: false,
    editName: ''
  }),
  props: {},
  computed: {
    ...mapState(['platformUrl']),
    selectItems() {
      return this.gsImgList.filter(item => item.isChecked);
    }
  },
  methods: {
    deleteItems() {
      if (!this.selectItems.length) {
        this.$Message.warning('请选择要删除的内容');
        return;
      } else {
        this.$Modal.confirm({
          title: '批量删除',
          content: '确认删除内容? 删除后数据无法恢复, 请谨慎操作',
          onOk: () => {
            const ids = this.selectItems.map(item => item.id).toString();
            this.confirmDelete(ids);
          }
        });
      }
    },
    async confirmDelete(ids) {
      const result = await deleteAppearance({ ids });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getContentData();
      } else this.$Message.error(`删除失败, 原因: ${result.msg}`);
    },
    // ? content
    async getContentData(params = { pageSize: this.pageSize }) {
      const result = await getAppearanceList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { data } = deepCopyObj(dataSource);
        this.page = data.page || 0;
        this.total = data.count || 0;
        this.totalPage = data.pageCount || 0;
        data.list && this.setContentData(data.list);
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
    },
    setContentData(list = []) {
      this.gsImgList = [];
      list.map(async (item, index) => {
        this.gsImgList.push({
          number: index + 1,
          id: item.id,
          name: item.title,
          pic: item.pic,
          src: await this.getSrcById(item.pic),
          isChecked: false
        });
      });
    },
    async getSrcById(icon) {
      const result = await getPicById({ icon });
      if (result.data) {
        return result.data;
      } else {
        return this.platformUrl;
      }
    },
    getContentByPage(params) {
      this.getContentData(params);
    },
    handleBoxChange() {
      let notSelectAll = this.gsImgList.some(item => !item.isChecked);
      if (notSelectAll) {
        this.$emit('itemSelectChange', false);
      } else {
        this.$emit('itemSelectChange', true);
      }
    },
    editItem(itemIdx) {
      const { name, id } = this.gsImgList[itemIdx];
      this.$Modal.confirm({
        render: h => {
          return h('Input', {
            props: {
              placeholder: '请输入编辑名称',
              value: name
            },
            on: {
              input: input => {
                this.editName = input;
              }
            }
          });
        },
        onOk: async () => {
          if (!this.editName.length) {
            this.$Message.warning('请修改编辑名称, 且编辑名称不能为空');
            return;
          }
          const params = {
            title: this.editName,
            id
          };
          const result = await editAppearance(params);
          if (handleOpResult(result)) {
            this.$Message.success('编辑成功');
            this.getContentData();
          } else this.$Message.error(`编辑失败, 原因: ${result.msg}`);
          this.editName = '';
        }
      });
    },
    deleteItem(itemIdx) {
      this.$Modal.confirm({
        title: '删除内容',
        content: '确认删除? 删除后数据无法恢复, 请谨慎操作!',
        onOk: () => {
          const { id } = this.gsImgList[itemIdx];
          this.confirmDelete(id);
        }
      });
    }
  },
  created() {
    this.getContentData();
  },
  mounted() {
    menuBus.$on('deleteItems', () => this.deleteItems());
    menuBus.$on('refreshPage', () => this.getContentData());
  },
  beforeDestroy() {
    menuBus.$off('deleteItems');
    menuBus.$off('refreshPage');
  }
};
</script>

<style lang="less" scoped>
.g-s-content {
  width: 100%;
  margin: 0.8rem 0;
  .content-item {
    margin-top: 0.5rem;
    margin-left: 1rem;
    float: left;
    width: 23%;
    height: 17.6rem;
    img {
      width: 20.8rem;
      height: 12rem;
    }
    .box {
      // :first-child {
      //   background-color: red;
      // }
      :last-child {
        float: right;
      }
      .ivu-btn {
        margin: 0.26rem 0.5rem;
      }
    }
  }
  .div-page {
    position: relative;
    top: 0.8rem;
  }
}
</style>
